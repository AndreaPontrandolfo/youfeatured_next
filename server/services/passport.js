const passport = require("passport");
//// usare dotenv
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const { findUserById, verifyUser } = require("../models/signIn");
const { comparePass } = require("../controllers/_helpers");
const logger = require("../devUtils/logger");

/// Create local strategy
const localOptions = { usernameField: "email" };

/// LocalLogin is an instance of Passport’s LocalStrategy class
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  return verifyUser(email)
    .then(validUser => {
      logger.debug("TCL: validUser", validUser);
      if (validUser) {
        comparePass(password, validUser.password)
          .then(validPassword => {
            if (validPassword) {
              logger.info("Valid password. User successfully authenticated!");
              return done(null, validUser);
            } else {
              logger.info("Invalid password. Rejecting the login attempt.");
              return done(null, false);
            }
          })
          .catch(err => {
            logger.error(`Something went wrong: ${err}`);
            throw new Error("operation failed");
          })
          .catch(err => logger.error(err));
      } else {
        logger.error("Invalid username");
        return done(null, false);
      }
    })
    .catch(err => {
      logger.error(`Something went wrong: ${err}`);
      return done(err, false);
    });
});

/// Setup options for JWT Passport Strategy
const jwtOptions = {
  /// jwtFromRequest uses the ExtractJwt method from the jwt-simple package to tell the server where to look for the JWT. This function essentially decodes the encrypted JWT and allows us to pull out whatever user id we set, in order to compare it to a real user in the database
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.JWT_SECRET
};

/// Create JWT strategy. jwtOptions sono delle istruzioni che passiamo alla JwtStrategy per fargli decodificare il token. Payload is the unencrypted token data. So payload.sub is equivalent to the user.id
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  /// See if the user ID in the payload exists in our database. If it does, call 'done' with that other. Otherwise, call done without a user object
  return findUserById(payload.sub)
    .then(foundUser => {
      if (foundUser) {
        return done(null, foundUser);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
});

/// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
