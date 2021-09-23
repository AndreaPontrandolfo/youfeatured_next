module.exports = {
  "parserOptions": {
    "ecmaVersion": "2018",
    "sourceType": "module"
  },
  "env": {
    "node": true,
    "es6": true,
    "browser": false,
    "jquery": false,
  },
  "extends": ["eslint:recommended", "strongloop", "plugin:node/recommended", "plugin:security/recommended", "prettier"],
  "plugins": ["prettier", "security"],
  "rules": {
    "prettier/prettier": ["error"],
    "no-var": "error",
    "prefer-const": "error",
    "spaced-comment": "off",
    "no-unused-vars": "off"
  },
};

