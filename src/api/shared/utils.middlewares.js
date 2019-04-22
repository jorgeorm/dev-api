const { NOT_IMPLEMENTED } = require('http-status-codes');

exports.notImplemented = function notImplemented(req, res) {
  res.status(NOT_IMPLEMENTED)
    .json({message: 'Not implemented'});
};
