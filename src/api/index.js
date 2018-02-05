const express = require('express');
const router = express.Router();

const auth = require('./auth/auth.middlewares');
const authRoutes = require('./auth/auth.routes');
const cardRoutes = require('./card/card.routes');
const {notImplemented} = require('./shared/utils.middlewares');
const stateRoutes = require('./state/state.routes');

const authFlow = [
    auth.jwt,
    auth.requireLogin
];

router.use('/auth', authRoutes);
router.use('/card', authFlow, cardRoutes);
router.use('/state', authFlow, stateRoutes);
router.use('/project', authFlow, notImplemented);
router.use('/workflow', authFlow, notImplemented);
router.use('/team', authFlow, notImplemented);

module.exports = router;