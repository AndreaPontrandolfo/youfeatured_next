const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { errors } = require("celebrate");

const pe = require("./devUtils/errorFormattingConfig");
const logger = require("./devUtils/logger");
const apiRoutes = require("./router/routes");

const app = express();

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/// Forse cors non è necessario. Bisogna verificare alla fine.
app.use(cors());

/// Pretty printing of errors in the console during development
/* if (app.get("env") === "development") {
  app.locals.pretty = true;
} */

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(pe.render(err));
  next();
});

app.use(
  morgan(morganFormat, {
    skip: function(req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr
  })
);

app.use(
  morgan(morganFormat, {
    skip: function(req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout
  })
);

//// Cancellare
// - app.use(express.static(__dirname + '/AdvancedReduxCode/auth/server/authentication'));
// - app.use(express.static(path.join(__dirname + "/authentication")));

/// use routes
// - app.use("/api", apiRoutes);
app.use("/", apiRoutes);

/// Celebrate validation middleware
app.use(errors());

/* if (["production"].includes(process.env.NODE_ENV)) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
} */
const port = 5000;
// - const host = "localhost";

app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});
