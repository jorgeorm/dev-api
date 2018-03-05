const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    description: String,
});

module.exports = mongoose.model('State', stateSchema);