const PrettyError = require("pretty-error");

/// we instantiate Prettyerror
const pe = new PrettyError();

pe.start();

/// Avaible colors for styling: black, red, green, yellow, blue, magenta, cyan, white, grey, bright-red, bright-green, bright-yellow, bright-blue, bright-magenta, bright-cyan, and bright-white
pe.appendStyle({
  "pretty-error > header > title > kind": {
    background: "none",
    color: "grey"
  },

  "pretty-error > header > colon": {
    display: "none"
  },

  "pretty-error > header > message": {
    color: "yellow",
    marginLeft: "2",
    background: "cyan"
  }
});
/// If problems show up, uncomment this. Errors will be rendered without coloring.
// - pe.withoutColors();

/// We configure prettyError to simplify the stack trace
pe.skipNodeFiles();
pe.skipPackage("express");

module.exports = pe;
