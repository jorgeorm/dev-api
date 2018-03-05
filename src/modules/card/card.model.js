const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

// TODO: Put status as required

const cardSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    desc: {
        type: String,
    },
    estimate: {
        type: String|Number
    },
    cardType: {type: String, required: true},
    status: {
        type: SchemaTypes.ObjectId, ref: 'States',
    },
    reporter: {
        type: [{type: SchemaTypes.ObjectId, ref: 'User' }],
        required: true
    },
    asignees: [{type: SchemaTypes.ObjectId, ref: 'User' }],
    followers: [{type: SchemaTypes.ObjectId, ref: 'User' }],
    relations: {
        blockedBy: [{type: SchemaTypes.ObjectId, ref: 'Card' }],
        blocks: [{type: SchemaTypes.ObjectId, ref: 'Card' }],
        generatedBy: [{type: SchemaTypes.ObjectId, ref: 'Card' }]
    },
    comments: [{
        comment: {type: String, required: true},
        creationDate: {type: Date, required: true},
        author: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: true
        },
        followers: [{type: SchemaTypes.ObjectId, ref: 'User'}]
    }],
    priority: Number,
    board: {
        type: SchemaTypes.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Card', cardSchema);