const bcrypt = require("bcryptjs");
const { createUser } = require("../models/signUp");
const logger = require("../devUtils/logger");

//// Queste due funzioni possono essere eliminate/rifattorizzate con "upash" package. E magari argon2 al posto di bcrypt.

function comparePass(userPassword, databasePassword) {
  logger.info("Comparing passwords...");
  return bcrypt.compare(userPassword, databasePassword);
}

function hashPass(
  username,
  email,
  password,
  givingTokenToUser,
  userNotSaved,
  catchingError
) {
  logger.info("Hashing passwords...");
  bcrypt
    .hash(password, 10)
    .then(hash => {
      logger.debug(`password: ${password}, hash: ${hash}`);
      return createUser(username, email, hash)
        .then(givingTokenToUser)
        .catch(userNotSaved);
    })
    .catch(catchingError);
}

module.exports = {
  comparePass,
  hashPass
};
