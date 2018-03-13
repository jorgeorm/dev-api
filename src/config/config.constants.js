require('dotenv').config();

const env = process.env;

// AUTH'N CRYPTO VARS
const JWT_SECRET = env.JWT_SECRET || 'superSecret123';
const BCRYPT_SALT = Number(env.BCRYPT_SALT) || 10;
const JWT_EXPIRATION = env.JWT_EXPIRATION || '7 days';

// DB VARS
const DB_HOST = env.DB_HOST || 'localhost';
const DB_NAME = env.DB_NAME || 'dev-api';
const DB_PASSWD = env.DB_PASSWD || 'dev';
const DB_USER = env.DB_USER || 'dev';

module.exports = {
  JWT_SECRET,
  BCRYPT_SALT,
  JWT_EXPIRATION,
  DB_HOST,
  DB_NAME,
  DB_PASSWD,
  DB_USER
};