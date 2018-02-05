const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: Schema.Types.ObjectId, ref: 'States',
    },
    reporter: {
        type: [{type: Schema.Types.ObjectId, ref: 'User' }],
        required: true
    },
    asignees: [{type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{type: Schema.Types.ObjectId, ref: 'User' }],
    relations: {
        blockedBy: [{type: Schema.Types.ObjectId, ref: 'Card' }],
        blocks: [{type: Schema.Types.ObjectId, ref: 'Card' }],
        generatedBy: [{type: Schema.Types.ObjectId, ref: 'Card' }]
    },
    comments: [{
        comment: {type: String, required: true},
        creationDate: {type: Date, required: true},
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }],
    priority: Number
});

module.exports = mongoose.model('Card', cardSchema);