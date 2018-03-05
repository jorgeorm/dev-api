const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const { Revisionable } = require('../shared/decorators');

const boardSchema = new Schema(Revisionable({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    transitions: [{
        from: SchemaTypes.ObjectId,
        to: SchemaTypes.ObjectId,
    }]
}));

module.exports = mongoose.model('Board', boardSchema);