const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("http-status-codes");

const AUTH_FAILED = "Authentication failed.";

const errorMap = {
  TokenExpiredError: { code: UNAUTHORIZED, message: AUTH_FAILED },
};

/**
 * Extracts payload fron JWT and adds it to the request object.
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Handler} next
 */
exports.jwtPayload = function jwtPayload(req, res, next) {
  const [bearer, token] =
    (req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")) ||
    [];

  if (!bearer || !token) return next();

  try {
    req.userPayload = jwt.verify(token, req.app.get("jwtSecret"));
  } catch (err) {
    const error = errorMap[err.name];

    if (error) {
      return res.status(error.code).json({ message: error.message });
    }

    next(err);
  }

  next();
};

/**
 * Checks if a user
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.Handler} next
 */
exports.requireLogin = function requireLogin(req, res, next) {
  if (!req.userPayload)
    return res.status(UNAUTHORIZED).json({ message: "Login is required" });

  next();
};

exports.AUTH_FAILED = AUTH_FAILED;
