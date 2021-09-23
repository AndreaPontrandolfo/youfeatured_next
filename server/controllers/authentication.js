/// jwt-simple è il token creation package
const jwt = require("jwt-simple");

const { hashPass } = require("./_helpers");
const {
  usernameAlreadyInUse,
  emailAlreadyInUse
} = require("../models/credentialsAlreadyInUse");

/// The tokenForUser function takes in a user object, and returns an encoded token that is created with a subject (conventionally called sub) set to the user’s id and a timestamp (also conventionally called iat), along with the imported secret
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.JWT_SECRET);
};

/// We are giving a token to the user that passed Auth: Il token viene mandato al frontend
const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

const signup = (req, res, next) => {
  const { username, email, password } = req.body;

  usernameAlreadyInUse(username)
    .then(resultUsername => {
      if (resultUsername) {
        res.json({
          error: "Username already exists. Please choose another one."
        });
      } else {
        emailAlreadyInUse(email)
          .then(resultEmail => {
            if (resultEmail) {
              res.json({ error: "Email already in use." });
            } else {
              const givingTokenToUser = newUser => {
                res.json({ token: tokenForUser(newUser) });
              };

              const userNotSaved = err => {
                res.json({
                  error: "Error saving user to database. Please try again"
                });
                console.log(`Registering failed ${err}`);
                throw new Error(err);
              };

              const catchingError = err => {
                return next(err);
              };

              /// This takes the user password and the salt and returns a promise that resolves to a string that we can pass into our createUser function in place of the plain text password. Then, createUser either resolves to a shiny newUser object to pass into our tokenForUser function to generate and send a token, or the database doesn’t send anything back, and
              hashPass(
                username,
                email,
                password,
                givingTokenToUser,
                userNotSaved,
                catchingError
              );
            }
          })
          .catch(err => {
            console.log(`Could not check if the email already exist ${err}`);
          });
      }
    })
    .catch(err => {
      console.log(`Could not check if the username already exist ${err}`);
    });
};

module.exports = { signup, signin };
