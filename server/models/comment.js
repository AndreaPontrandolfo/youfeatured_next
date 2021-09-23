const db = require("../db/connection");
const logger = require("../devUtils/logger");

const postComment = (comment_text, user_id, image_id, user_reply) => {
  const query = `
    INSERT INTO comments
    (comment_text, user_id, image_id, user_reply)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
  logger.info("Saving comment to database...");
  return db.one(query, [comment_text, user_id, image_id, user_reply]);
};

const editCommentQuery = (commentText, commentId) => {
  const query = `
    UPDATE comments
    SET comment_text = $1
    WHERE
    comments.id = $2;
  `;
  logger.info("Saving the new comment to database...");
  return db.any(query, [commentText, commentId]);
};

module.exports = { postComment, editCommentQuery };
