const authMiddleware = require("./auth.middleware");

exports.AUTH_ERROR = "Authentication error. Wrong email/password.";
exports.AUTH_EXCEPTION = "Unknown Error";
exports.AUTH_FLOW = [authMiddleware.jwtPayload, authMiddleware.requireLogin];
exports.AUTH_FAILED = authMiddleware.AUTH_FAILED;
