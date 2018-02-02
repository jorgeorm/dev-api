'use strict';

const mongoose = require('mongoose');


/**
 * Setup the database connection
 * @param {object} dbCfg
 * @param {object} dbCfg.env - process.env
 * @param {express} dbCfg.app - app  
 */
exports.setupDatabase = ({env} = {}) => {
    // DATABASE STUFF
    const dbHost = env.DB_HOST || 'localhost';
    const dbName = env.DB_NAME || 'dev-api';
    const dbPasswd = env.DB_PASSWD || 'dev';
    const dbUser = env.DB_USER || 'dev';

    const dbURI = `mongodb://${dbUser}:${dbPasswd}@${dbHost}/${dbName}`;

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
