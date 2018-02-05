const mongoose = requrie('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    transitions: [{
        name: {
            type: String,
            required: true
        },
        state: {
            type: Schema.Types.ObjectId, ref: 'State'
        }
    }]
});

module.exports = mongoose.model('State', stateSchema);