const db = require("../db/connection");

const maxUploadsAllowed = uid => {
  const query = `
  SELECT COUNT(*) AS max_uploads_allowed
  FROM images
  WHERE images.user_id = $1
  `;
  return db.one(query, [uid]);
};

const checkStarsQuery = uid => {
  const query = `
  SELECT COUNT(*) AS total_likes_given_currently
  FROM likes
  WHERE likes.user_id = $1
  `;
  return db.one(query, [uid]);
};

module.exports = { maxUploadsAllowed, checkStarsQuery };
