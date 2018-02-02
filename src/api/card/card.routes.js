const express = require('express');
const {
    NOT_IMPLEMENTED
} = require('http-status-codes');
const router = express.Router();

const notImp = function (req, res) {
    res.status(NOT_IMPLEMENTED)
        .json({});
};

router.post('/', notImp);

router.get('/', notImp);

router.get('/:cardId', notImp)

router.put('/:cardId', notImp)

router.delete('/:cardId', notImp);

module.exports = router;