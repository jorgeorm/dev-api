require("dotenv").config();

const env = process.env;

// AUTH'N CRYPTO VARS
const JWT_SECRET = env.JWT_SECRET || "superSecret123";
const BCRYPT_SALT = Number(env.BCRYPT_SALT) || 10;
const JWT_EXPIRATION = env.JWT_EXPIRATION || "7 days";

// DB VARS
const DB_HOST = env.DB_HOST || "localhost";
const DB_PORT = env.DB_PORT || "27017";
const DB_NAME = env.DB_NAME || "dev-api";
const DB_PASSWORD = env.DB_PASSWORD || "dev";
const DB_USER = env.DB_USER || "dev";
const SWAGGER_OPTIONS = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Jorge Ordoñez",
        email: "jorgeorm@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["src/api/**.js", "src/api/**/**.js"],
};

module.exports = {
  JWT_SECRET,
  BCRYPT_SALT,
  JWT_EXPIRATION,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  SWAGGER_OPTIONS,
};
