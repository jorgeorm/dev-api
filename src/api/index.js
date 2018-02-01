const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/auth.routes');

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the api' });   
});

router.use('/auth', authRoutes);

module.exports = router;