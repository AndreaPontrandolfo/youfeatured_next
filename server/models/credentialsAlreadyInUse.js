const db = require("../db/connection");

const usernameAlreadyInUse = username => {
  const query = `
    SELECT username
    FROM users
    WHERE username = $1
    `;
  return db.oneOrNone(query, [username]);
};

const emailAlreadyInUse = email => {
  const query = `
    SELECT email
    FROM users
    WHERE email = $1
    `;
  return db.oneOrNone(query, [email]);
};

module.exports = { usernameAlreadyInUse, emailAlreadyInUse };
