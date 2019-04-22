const express = require('express');
const router = express.Router();

const authMiddleware = require('./auth/auth.middleware');
const authRoutes = require('./auth/auth.routes');
const boardRoutes = require('./board/board.routes');
const cardRoutes = require('./card/card.routes');
const stateRoutes = require('./state/state.routes');

const authFlow = [
  authMiddleware.jwtPayload,
  authMiddleware.requireLogin
];

router.use(function corsMiddleware(req, res, next) {
  const method = req.method && req.method.toUpperCase && req.method.toUpperCase();

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if(method === 'OPTIONS') {
    res.header('Vary', 'Access-Control-Request-Headers');
    res.statusCode = 204;
    res.setHeader('Content-Length', '0');

    return res.end();
  }

  next();
});

router.use('/auth', authRoutes);
router.use('/card', authFlow, cardRoutes);
router.use('/state', authFlow, stateRoutes);
router.use('/board', authFlow, boardRoutes);
// router.use('/team', authFlow, notImplemented);

module.exports = router;
