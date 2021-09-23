const db = require("../db/connection");
const logger = require("../devUtils/logger");

//// Al momento non sto usando la sintassi di pg-promise. Potrei rifattorizzare in seguito usandola.

logger.info("Initializing gallery...");

const galleryQuery = () => {
  const queryingGallery = db.query(
    "SELECT src, width, height, title, category, images.id, users.username, COUNT(*) AS likes_total FROM images JOIN likes ON images.id = likes.image_id JOIN users ON images.user_id = users.id GROUP BY images.title, users.username, images.category, images.src, images.width, images.height, images.id ORDER BY likes_total DESC"
  );
  return queryingGallery;
};

const galleryQuery_totalComments = () => {
  const queryingGallery_totalComments = db.query(
    "SELECT COUNT(image_id) AS total_comments, images.id FROM images JOIN comments ON images.id = comments.image_id GROUP BY comments.image_id, images.id"
  );
  return queryingGallery_totalComments;
};

module.exports = { galleryQuery, galleryQuery_totalComments };
