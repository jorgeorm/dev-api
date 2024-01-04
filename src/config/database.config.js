"use strict";
/*eslint no-console: "off"*/

const mongoose = require("mongoose");

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
} = require("./config.constants");

/**
 * @constant {Object} MONGOOSE_CONFIG identifies values used by mongoose to create-run queries and objects.
 * The following values are reported to fix warning about {@link https://github.com/Automattic/mongoose/issues/6890|deprecation}
 */
const MONGOOSE_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

/**
 * Setup the database connection
 * @return {Promise<Mongoose|void>}
 */
exports.setupDatabase = () => {
  // DATABASE STUFF

  const dbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  return mongoose
    .connect(dbURI, MONGOOSE_CONFIG)
    .then((mongoose) => {
      console.log("=== DB_CONNECTION_STATUS: Connected");
      return Promise.resolve(mongoose);
    })
    .catch((err) => {
      console.error("=== DB_CONNECTION_STATUS: Error");
      console.error("=== DB_ERROR: ", err);
      return Promise.reject(err);
    });
};
