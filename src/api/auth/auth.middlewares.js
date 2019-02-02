const jwt = require('jsonwebtoken');
const {
  UNAUTHORIZED,

} = require('http-status-codes');

const {
  AUTH_EXCEPTION,
  AUTH_EXPIRED
} = require('./auth.constants');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.jwt = function (req, res, next) {
  const hasToken = req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer';

  if (!hasToken) return next();

  const token = req.headers.authorization.split(' ')[1];
  try {
    req.userPayload = jwt.verify(token, req.app.get('jwtSecret'));
  } catch (err) {
    switch(err.name) {
    case 'TokenExpiredError':
      return res.status(UNAUTHORIZED)
        .json({success: false, message: AUTH_EXPIRED});
    default:
      return res.status(UNAUTHORIZED)
        .json({success: false, message: AUTH_EXCEPTION});
    }
  }

  next();
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.requireLogin = function (req, res, next) {
  if(!req.userPayload) return res.status(UNAUTHORIZED)
    .json({message: 'Login is required'});

  next();
};
