const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');
const cardRoutes = require('./card/card.routes');
const auth = require('./auth/auth.middlewares');

const authFlow = [
    auth.jwt,
    auth.requireLogin
];

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the api' });   
});

router.use('/auth', authRoutes);
router.use('/card', authFlow, cardRoutes);

module.exports = router;