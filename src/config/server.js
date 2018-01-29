'use strict';
const dotEnv = require('dotenv');
const express    = require('express');        // call express
const bodyParser = require('body-parser');

const api = require('../api');

const SERVER = {};

exports.boot = ({envOptions} = {}) => {
    dotEnv.config(envOptions);

    SERVER.app = express();

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    SERVER.app.use(bodyParser.urlencoded({ extended: true }));
    SERVER.app.use(bodyParser.json());

    // Loads api routes
    SERVER.app.use('/api', api);

    // stores the server port
    SERVER.port = process.env.PORT || 8080; // set a default port

    SERVER.app.listen(SERVER.port);

    return SERVER.app;
};