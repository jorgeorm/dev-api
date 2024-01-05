"use strict";
const bodyParser = require("body-parser");
const express = require("express"); // call express
const morgan = require("morgan");

const api = require("../api");
const authConfig = require("./auth.config");
const dbConfig = require("./database.config");
const configConstants = require("./config.constants");
const { INTERNAL_SERVER_ERROR } = require("http-status-codes");
const UNKOWN_ERROR = "Unknown error";

/**
 * Will contain server related vars
 */
const SERVER = {};

exports.bootApp = () => {
  // Alias for the express app
  const app = (SERVER.app = express());
  SERVER.env = configConstants;

  authConfig.setupAuth(SERVER);
  dbConfig.setupDatabase(SERVER);

  // Server logs requests to console in dev
  if (process.env.APP_ENV === "dev") {
    const swaggerUi = require("swagger-ui-express");
    const swaggerJsdoc = require("swagger-jsdoc");

    app.use(morgan("dev"));

    const swaggerConfig = swaggerJsdoc(configConstants.SWAGGER_OPTIONS);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }

  // configure app to use bodyParser()
  // this will let us get the data from a POST
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Loads api routes
  app.use("/api", api, (err, req, res, next) => {
    if (req.is("application/json")) {
      res.status(INTERNAL_SERVER_ERROR).send({ messge: UNKOWN_ERROR });
      return;
    }

    next(err);
  });

  // stores the server port
  SERVER.port = process.env.PORT || 8080; // set a default port

  app.listen(SERVER.port);

  return app;
};
