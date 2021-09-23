const db = require("../db/connection");

const retrieveImageIdQuery = imageName => {
  const query = `
    SELECT images.id
    FROM images
    WHERE images.title=$1
    `;
  return db.oneOrNone(query, [imageName]);
};

module.exports = { retrieveImageIdQuery };
