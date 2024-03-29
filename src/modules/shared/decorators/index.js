const mongoose = require('mongoose');
const SchemaTypes = mongoose.SchemaTypes;
/**
 * Stamp-able decorator
 * adds timestamp to a schema object
 * @param {object} target
 */
module.exports.Revisionable = function revisionableDecorator(target) {
  target.createdAt = {
    type: SchemaTypes.Date,
    required: true,
  };
  target.createdBy = {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  };
  target.updatedBy = {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  };
  target.removedBy = {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  };

  return target;
};
