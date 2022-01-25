const express = require('express');
const {
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR
} = require('http-status-codes');
const router = express.Router();

const authService = require('../../modules/auth/auth.service');
const authMiddleware = require('./auth.middleware');

const {
  AUTH_ERROR,
  AUTH_EXCEPTION
} = require('./auth.constants');

const authFlow = [
  authMiddleware.jwtPayload,
  authMiddleware.requireLogin
];

router.post('/', (req, res) => {
  const credentials = req.body;

  authService.jwtLogin(credentials, req.app)
    .then((token) => {
      if(!token) return res.status(UNAUTHORIZED).json({
        success: false,
        message: AUTH_ERROR
      });

      res.json({
        success: true,
        token: token
      });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR)
        .json({success: false, message: AUTH_EXCEPTION});
    });
});

router.post('/user', authFlow, async (req, res) => {
  const { userPayload } = req;

  try {
    const user = await authService.currentUser(userPayload);
    res.json({ success: true, user });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ success: false, message: AUTH_EXCEPTION });
  }
});

module.exports = router;
