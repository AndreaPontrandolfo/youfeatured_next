const db = require("../db/connection");
const logger = require("../devUtils/logger");

const starPhoto = (user_id, image_id) => {
  const query = `
    INSERT INTO likes
    (user_id, image_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  logger.info("Incrementing likes by one...");
  return db.one(query, [user_id, image_id]);
};

module.exports = { starPhoto };
