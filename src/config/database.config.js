'use strict';

const mongoose = require('mongoose');

const {
    DB_HOST,
    DB_NAME,
    DB_PASSWD,
    DB_USER
} = require('./config.constants');

/**
 * Setup the database connection
 * @param {object} dbCfg
 * @param {object} dbCfg.env - process.env
 * @param {express} dbCfg.app - app  
 */
exports.setupDatabase = ({env} = {}) => {
    // DATABASE STUFF
    
    const dbURI = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}`;

    return mongoose.connect(dbURI)
        .then(() => {
            console.log('DB_CONNECTION_STATUS: Connected');
            return Promise.resolve();
        })
        .catch((err) => {
            console.error('DB_CONNECTION_STATUS: Error');
            console.error('DB_ERROR: ', err);
            return Promise.reject(err);
        });
};
