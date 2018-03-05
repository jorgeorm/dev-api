const mongoose = require('mongoose');
const SchemaTypes = mongoose.SchemaTypes;
/**
 * Stampable decorator
 * adds timestamp to a schema object
 * @param {object} target 
 */
module.exports.Revisionable = function (target) {
    target.createdAt = {
        type: SchemaTypes.Date,
        required: true,
    };
    target.createdBy = {
        type: SchemaTypes.ObjectId,
        required: true,
    };
    target.updatedBy = {
        type: SchemaTypes.ObjectId,
    };
    target.removedBy = {
        type: SchemaTypes.ObjectId
    };
};
