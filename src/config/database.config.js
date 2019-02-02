'use strict';
/*eslint no-console: "off"*/

const mongoose = require('mongoose');

const {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER
} = require('./config.constants');

/**
 * Setup the database connection
 * @param {object} dbCfg
 * @param {object} dbCfg.env - process.env
 * @param {express} dbCfg.app - app
 */
exports.setupDatabase = () => {
  // DATABASE STUFF
    
  const dbURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

  return mongoose.connect(dbURI, { useNewUrlParser: true })
    .then(() => {
      console.log('=== DB_CONNECTION_STATUS: Connected');
      return Promise.resolve();
    })
    .catch((err) => {
      console.error('=== DB_CONNECTION_STATUS: Error');
      console.error('=== DB_ERROR: ', err);
      return Promise.reject(err);
    });
};
