const express = require('express');
const router = express.Router();

const auth = require('../../modules/auth').authService;

const {
    AUTH_ERROR,
    AUTH_EXCEPTION
} = require('./auth.constants');

router.post('/login', (req, res) => {
    const creds = req.body;

    auth.jwtLogin(creds, req.app)
        .then((token) => {
            if(!token) return res.json({success: false, message: AUTH_ERROR});

            res.json({success: true, token: token});
        })
        .catch((err) => {
            console.error(err);
            res.json({success: false, message: AUTH_EXCEPTION});
        });
});

module.exports = router;