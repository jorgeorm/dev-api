const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require("http-status-codes");

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
    req.userPayload = jwt.verify(token, req.app.get('jwtSecret'));

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