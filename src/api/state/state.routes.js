const express = require('express');
const router = express.Router();

const {notImplemented} = require('../shared/utils.middlewares');

/**
 * @swagger
 * resourcePath: /api/state
 * description: Manages Card States
 */
router.get('/', notImplemented);

router.post('/', notImplemented);

router.get('/:stateId', notImplemented);

router.put('/:stateId', notImplemented);

router.delete('/:stateId', notImplemented);

router.post('/:stateId/transitions', notImplemented);

router.get('/:stateId/transitions', notImplemented);

router.put('/:stateId/transitions', notImplemented);

router.delete('/:stateId/transitions', notImplemented);

module.exports = router;
