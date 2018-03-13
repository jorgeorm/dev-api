const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const express = require('express');
const router = express.Router();

const {notImplemented} = require('../shared/utils.middlewares');
const boardsService = require('../../modules/board/board.service');

/**
 * @swagger
 * resourcePath: /api/state
 * description: Manages Card States
 */
router.get('/', function (req, res) {
  const { id, role } = req.userPayload;
    
  boardsService.getBoards(id, role)
    .then((boards) => {
      res.json({ success: true, boards });
    })
    .catch(() => {
      res.status = INTERNAL_SERVER_ERROR;
      res.json({ success: false, error: 'Boards couldn\'t be fetched' });
    });
});

router.post('/', notImplemented);

router.get('/:stateId', notImplemented);

router.put('/:stateId', notImplemented);

router.delete('/:stateId', notImplemented);

router.post('/:stateId/transitions', notImplemented);

router.get('/:stateId/transitions', notImplemented);

router.put('/:stateId/transitions', notImplemented);

router.delete('/:stateId/transitions', notImplemented);

module.exports = router;