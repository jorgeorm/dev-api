const express = require('express');
const {
    UNAUTHORIZED,
    INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const router = express.Router();

const authService = require('../../modules/auth/auth.service');

const {
    AUTH_ERROR,
    AUTH_EXCEPTION
} = require('./auth.constants');

router.post('/', (req, res) => {
    const creds = req.body.data;

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

module.exports = router;