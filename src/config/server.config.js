'use strict';
const bodyParser = require('body-parser');
const dotEnv = require('dotenv');
const express = require('express');        // call express


const api = require('../api');
const dbConfig = require('./database.config');
const authConfig = require('./auth.config');

/**
 * Will contain server related vars
 */
const SERVER = {};

exports.bootApp = ({envOptions} = {}) => {
    dotEnv.config(envOptions);

    // Alias for the express app
    const app = SERVER.app = express();
    SERVER.env = process.env;

    authConfig.setupAuth(SERVER);
    dbConfig.setupDatabase(SERVER);

    // Server logs requests to console in dev
    if (process.env.APP_ENV === 'dev') {
        app.use(require('morgan')('dev'));
    }

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Loads api routes
    app.use('/api', api);

    // stores the server port
    SERVER.port = process.env.PORT || 8080; // set a default port

    app.listen(SERVER.port);

    return app;
};