const express = require('express');
const {
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const router = express.Router();

const authService = require('../../modules/auth/auth.service');
const authMiddlewares = require('./auth.middlewares');

const {
    AUTH_ERROR,
    AUTH_EXCEPTION
} = require('./auth.constants');

const authFlow = [
    authMiddlewares.jwt,
    authMiddlewares.requireLogin
];

router.post('/', (req, res) => {
    const creds = req.body;

    authService.jwtLogin(creds, req.app)
        .then((token) => {
            if(!token) return res.status(UNAUTHORIZED)
                .json({success: false, message: AUTH_ERROR});

            res.json({success: true, token: token});
        })
        .catch((err) => {
            res.status(INTERNAL_SERVER_ERROR)
                .json({success: false, message: AUTH_EXCEPTION});
        });
});

router.post('/user', authFlow, (req, res) => {
    authService.currentUser(req.userPayload)
        .then((user) => {
            res.json({success: true, user});
        })
        .catch((err) => {
            console.error(err);
            res.status(INTERNAL_SERVER_ERROR)
                .json({success: false, message: AUTH_EXCEPTION});
        });
});

module.exports = router;