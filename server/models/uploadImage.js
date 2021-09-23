const db = require("../db/connection");
const logger = require("../devUtils/logger");

//// Al momento non sto usando la sintassi di pg-promise. Potrei rifattorizzare in seguito usandola.

const uploadQuery = (src, width, height, title, category, user_id) => {
  const query = `
  INSERT INTO images
  (src, width, height, title, category, user_id)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;
  logger.info("Saving image to the database...");
  return db.one(query, [src, width, height, title, category, user_id]);
};

module.exports = { uploadQuery };
