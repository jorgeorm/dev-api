const express = require('express');
const router = express.Router();

const {notImplemented} = require('../shared/utils.middlewares');

/**
 * @swagger
 * resourcePath: /api/card
 * description: Manages cards
 */
router.post('/', notImplemented);

router.get('/', notImplemented);

router.get('/:cardId', notImplemented);

router.put('/:cardId', notImplemented);

router.delete('/:cardId', notImplemented);

module.exports = router;