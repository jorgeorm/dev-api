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
        from: { type: SchemaTypes.ObjectId, ref: 'State' },
        to: { type: SchemaTypes.ObjectId, ref: 'State' },
    }],
    usedStates: [{ type: SchemaTypes.ObjectId, ref: 'State'}],
    stateGroups: [{ name: String, states: [{ type: SchemaTypes.ObjectId, ref: 'State' }] }]
}));

module.exports = mongoose.model('Board', boardSchema);