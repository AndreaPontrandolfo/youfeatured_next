const express = require("express");
const passport = require("passport");
const { celebrate, Joi } = require("celebrate");

const logger = require("../devUtils/logger");

/// in passportService sono contenute le nostre strategie di autenticazione
const passportService = require("../services/passport");
/// Importiamo le funzioni signin e signup
const Authentication = require("../controllers/authentication");
const { ladderQuery } = require("../models/ladder");
const {
  galleryQuery,
  galleryQuery_totalComments
} = require("../models/gallery");
const { findUserById, verifyUser } = require("../models/signIn");
const { uploadQuery } = require("../models/uploadImage");
const {
  singleImageQuery,
  singleImageQueryCommentList
} = require("../models/singleImage");
const { postComment, editCommentQuery } = require("../models/comment");
const { starPhoto } = require("../models/starPhoto");
const { retrieveImageIdQuery } = require("../models/retrieveImageId");
const {
  maxUploadsAllowed,
  checkStarsQuery
} = require("../models/maxUploadsAllowed");

/// We are setting session to false because JWTs don’t require sessions on the server.
/// The requireAuth middleware we built attaches the user object to req.user.
const requireAuth = passport.authenticate("jwt", { session: false });

/// we are setting session to false because JWTs don’t require sessions on the server.
//// RequireSignin si può rifare su react invece che sul server
//// Il token/user session dovrà poi essere essere rifattorizzato per essere storato in un redis db.
const requireSignin = passport.authenticate("local", { session: false });

const router = express.Router();

/// Routes da qui in giù. OGNUNA DI QUESTE ROUTES è PREFISSATA IN AUTOMATICO DA "/api" !!!!

/// We call the signup function when the user submits a request to the /signup post route
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      username: Joi.string()
        .min(2)
        .max(25)
        .token()
        .trim()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(30)
        .regex(/\d/, "numbers")
        .trim()
        .required()
    })
  }),
  Authentication.signup
);

/// We are first going to route the user through Passport, and if they pass, they will move on to the signin function, which will pass them a token
router.post("/signin", requireSignin, Authentication.signin);

// - router.get("/:userId", requireAuth, UserController.viewProfile);

router.post(
  "/forgotpassword",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
    })
  }),
  (req, res) => {
    verifyUser(req.body.email)
      .then(validEmail => {
        if (validEmail) {
          return res.send(true);
        } else {
          return res.send(false);
        }
      })
      .catch(err => {
        logger.error(`Could not find out if the email is valid ${err}`);
      });
  }
);

router.get("/ladder", (req, res) => {
  ladderQuery()
    .then(result => {
      logger.info(`Sending the data to the ladder... ${result}`);
      return res.send(result);
    })
    .catch(err => {
      logger.error(err);
    });
});

router.get("/gallery", (req, res) => {
  galleryQuery()
    .then(total_images => {
      logger.info(`Sending the data to the gallery... ${total_images}`);
      galleryQuery_totalComments()
        .then(total_comments_result => {
          return res.send({ total_images, total_comments_result });
        })
        .catch(err => {
          logger.error(err);
        });
    })
    .catch(err => {
      logger.error(err);
    });
});

router.post(
  "/gallery/view/:imageid",
  celebrate({
    body: Joi.object().keys({
      imageid: Joi.number()
        .integer()
        .required()
    })
  }),
  (req, res) => {
    singleImageQuery(req.body.imageid)
      .then(imageDatas => {
        const imageSingle = imageDatas;
        singleImageQueryCommentList(req.body.imageid)
          .then(imageCommentsData => {
            const imageComments = imageCommentsData;
            const result = { imageSingle, imageComments };
            return res.send(result);
          })
          .catch(err =>
            logger.error(`Could not fetch the comment List ${err}`)
          );
      })
      .catch(err => {
        logger.error(`Could not fetch the image Single ${err}`);
      });
  }
);

router.post(
  "/profile",
  celebrate({
    body: Joi.object().keys({
      uid: Joi.number()
        .integer()
        .required()
    })
  }),
  (req, res) => {
    const { uid } = req.body;
    findUserById(uid)
      .then(foundUser => {
        return res.send(foundUser.username);
      })
      .catch(err => res.status(403).json({ error: err.toString() }));
  }
);

router.post(
  "/upload/image/validupload",
  celebrate({
    body: Joi.object().keys({
      user_id: Joi.number()
        .integer()
        .required()
    })
  }),
  (req, res) => {
    const userId = req.body.user_id;
    maxUploadsAllowed(userId)
      .then(validUpload => {
        if (Number(validUpload.max_uploads_allowed) === 0) {
          return res.send(true);
        } else {
          if (Number(validUpload.max_uploads_allowed) < 3) {
            checkStarsQuery(userId)
              .then(starsAreMoreThan1 => {
                if (Number(starsAreMoreThan1.total_likes_given_currently) > 1) {
                  return res.send(true);
                } else {
                  return res.send(false);
                }
              })
              .catch(err => {
                res.send(
                  `Error while trying to validate the upload attempt ${err}`
                );
              });
          } else {
            return res.send(false);
          }
        }
      })
      .catch(err => {
        res.send(`Error while trying to validate the upload attempt ${err}`);
      });
  }
);

router.post(
  "/upload/image",
  celebrate({
    body: Joi.object().keys({
      artworkTitle: Joi.string()
        .max(30)
        .trim()
        .required(),
      fileURL: Joi.string()
        .uri()
        .required(),
      imageWidth: Joi.number().required(),
      imageHeight: Joi.number().required(),
      userId: Joi.number()
        .integer()
        .required(),
      category: Joi.string()
        .trim()
        .valid([
          "3D Art",
          "2D Art",
          "Cosplay",
          "Sculpture",
          "Photography",
          "Tatoos",
          "Landscapery",
          "Fashion",
          "VideoGame Screenarchery",
          "Other"
        ])
        .required()
    })
  }),
  (req, res) => {
    const { fileURL, userId, category } = req.body;
    const width = req.body.imageWidth;
    const height = req.body.imageHeight;
    const title = req.body.artworkTitle;
    /// La query maxUploadsAllowed() potrebbe essere un'esagerazione considerando tutta la validazione frontendside per assicurarsi che l'utente non posti più di 3 immagini.
    maxUploadsAllowed(userId)
      .then(validUpload => {
        logger.info("TCL: validUpload", validUpload);
        if (Number(validUpload.max_uploads_allowed) < 3) {
          if (Number(validUpload.max_uploads_allowed) > 0) {
            checkStarsQuery(userId)
              .then(starsAreMoreThan1 => {
                logger.info("TCL: starsAreMoreThan1", starsAreMoreThan1);
                if (Number(starsAreMoreThan1.total_likes_given_currently) < 2) {
                  return res.send(
                    "You must assign atleast 1 star to another artwork before uploading more images!"
                  );
                } else {
                  uploadQuery(fileURL, width, height, title, category, userId)
                    .then(imageUploaded => {
                      logger.info("TCL: imageUploaded", imageUploaded);
                      retrieveImageIdQuery(title)
                        .then(imageId => {
                          return res.send(imageId);
                        })
                        .catch(err => {
                          res.send(
                            `Oh no! Something went wrong. Could not save image to the database. Error: ${err}`
                          );
                        });
                    })
                    .catch(err =>
                      res.send(
                        `Oh no! Something went wrong. Could not save image to the database. Error: ${err}`
                      )
                    );
                }
              })
              .catch(err => {
                res.send(
                  `Oh no! Something went wrong. Could not save image to the database. Error: ${err}`
                );
              });
          } else {
            uploadQuery(fileURL, width, height, title, category, userId)
              .then(imageUploaded => {
                logger.info("TCL: imageUploaded", imageUploaded);
                retrieveImageIdQuery(title)
                  .then(imageId => {
                    return res.send(imageId);
                  })
                  .catch(err =>
                    res.send(
                      `Oh no! Something went wrong. Could not save image to the database. Error: ${err}`
                    )
                  );
              })
              .catch(err =>
                res.send(
                  `Oh no! Something went wrong. Could not save image to the database. Error: ${err}`
                )
              );
          }
        } else {
          res.send(
            "You already uploaded 3 images this month. Wait the next session of the competition to upload more."
          );
        }
      })
      .catch(err => {
        res.send(
          `Oh no! Something went wrong. Could not could not check if this upload is valid. Error: ${err}`
        );
      });
  }
);

router.post(
  "/gallery/view/:imageid/comment/:id",
  celebrate({
    body: Joi.object().keys({
      comment_text: Joi.string()
        .max(3000)
        .trim()
        .required(),
      author: Joi.number()
        .integer()
        .required(),
      image_id: Joi.number()
        .integer()
        .required(),
      replyKey: Joi.number()
        .integer()
        .allow(null)
        .required()
    })
  }),
  (req, res) => {
    const commentText = req.body.comment_text;
    const author = req.body.author;
    const image_id = req.body.image_id;
    const user_reply = req.body.replyKey;
    postComment(commentText, author, image_id, user_reply)
      .then(addedComment => {
        return res.send("comment added!");
      })
      .catch(err =>
        res.send(
          `Oh no! Something went wrong. Could not save the comment to the database. Error: ${err}`
        )
      );
  }
);

router.put(
  "/gallery/view/:imageid/comment/:id",
  celebrate({
    body: Joi.object().keys({
      comment_text_edited: Joi.string()
        .max(3000)
        .trim()
        .required(),
      comment_id: Joi.number()
        .integer()
        .required()
    })
  }),
  (req, res) => {
    const commentText = req.body.comment_text_edited;
    const commentId = req.body.comment_id;
    editCommentQuery(commentText, commentId)
      .then(editedComment => {
        return res.send("comment edited!");
      })
      .catch(err =>
        res.send(
          `Oh no! Something went wrong. Could not save the new comment to the database. Error: ${err}`
        )
      );
  }
);

router.post(
  "/gallery/view/:imageid/star",
  celebrate({
    body: Joi.object().keys({
      user_id: Joi.number()
        .integer()
        .required(),
      image_id: Joi.number()
        .integer()
        .required()
    })
  }),
  (req, res) => {
    const user_id = req.body.user_id;
    const image_id = req.body.image_id;
    starPhoto(user_id, image_id)
      .then(starredPhoto => {
        return res.send("star added!");
      })
      .catch(err =>
        res.send(
          `Oh no! Something went wrong. Could not add the new star to the database. Error: ${err}`
        )
      );
  }
);

/// For now we will be handling the access restrinctions only on the frontend.
/* router.get("/upload", requireAuth, (req, res) => {
  res.send({ content: "The protected test route is functional! " });
}); */

module.exports = router;
