const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED,
} = require('http-status-codes');

const {
  AUTH_EXCEPTION,
  AUTH_EXPIRED
} = require('./auth.constants');

const errorMap = {
  TokenExpiredError: { code: UNAUTHORIZED, message: AUTH_EXPIRED }
};

/**
 * Extracts payload fron JWT and adds it to the request object.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.jwtPayload = function jwtPayload(req, res, next) {
  const hasToken = req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer';

  if (!hasToken) return next();

  const token = req.headers.authorization.split(' ')[1];
  try {
    req.userPayload = jwt.verify(token, req.app.get('jwtSecret'));
  } catch (err) {
    const error = errorMap[err.name];

    if (error) {
      return res.status(error.code).json({ success: false, message: error.message });
    }

    return res.status(UNAUTHORIZED)
      .json({success: false, message: AUTH_EXCEPTION});
  }

  next();
};

/**
 * Checks if a user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.requireLogin = function requireLogin(req, res, next) {
  if(!req.userPayload) return res.status(UNAUTHORIZED)
    .json({message: 'Login is required'});

  next();
};
