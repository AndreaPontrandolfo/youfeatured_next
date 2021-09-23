const db = require("../db/connection");

const singleImageQuery = imageid => {
  const query = `
  SELECT src, title, category, users.username, width, height
  FROM images
  JOIN users ON users.id = images.user_id
  WHERE images.id=$1
  `;
  return db.oneOrNone(query, [imageid]);
};

const singleImageQueryCommentList = imageid => {
  const query = `
  SELECT comments.comment_text, users.username, comments.id, comments.user_reply, to_char(comments.created_at, 'DD MM YYYY  HH24:MI') AS comment_timestamp, users.id AS commenter_id
  FROM comments
  JOIN images ON images.id = comments.image_id
  JOIN users ON comments.user_id = users.id
  WHERE images.id=$1
  ORDER BY comments.id DESC
  `;
  return db.any(query, [imageid]);
};

module.exports = { singleImageQuery, singleImageQueryCommentList };
