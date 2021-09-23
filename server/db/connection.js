const logger = require("../devUtils/logger");

/// Loading and initializing the library:
const postgres = require("pg-promise")({
  /// Initialization Options here...
});

/// Preparing the connection details:
/// const connection = "postgres://username:password@host:port/database";
// -const connection = `postgres://localhost:5432/${databaseName}`;
const connection = `postgres://${process.env.PGUSER}:${
  process.env.PGPASSWORD
}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;

/// Creating a new database instance from the connection details:
const db = postgres(connection);

module.exports = db;
