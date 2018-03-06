const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { Revisionable } = require('../shared/decorators');

const stateSchema = new Schema(Revisionable({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: String,
}));

module.exports = mongoose.model('State', stateSchema);