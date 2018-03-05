const Board = require('./board.model');
const State = require('../state/state.model');
const User = require('../auth/user.model');

const userData = require('../auth/user.seed').data;
const statesData = require('../state/state.seed').data;

async function prepareData() {
    const boardData = {
        name: 'First board',
        transitions: [],
        createdBy: undefined
    };
    const user = await User.findOne({email: userData.email});
    const statesQueries = statesData.map((state) => {
        return { $and: [{ name: state.name }, {description: state.description}] }
    });
    const states = await State.find({ $or: [...statesQueries] });

    boardData.createdBy = user;
    boardData.createdAt = new Date();

    states.forEach((state, index) => {
        if (index > 0) {
            boardData.transitions.push({
                from: state._id,
                to: states[index - 1]._id
            })
        }
        if (index < (states.length - 1)) {
            boardData.transitions.push({
                from: state._id,
                to: states[index + 1]._id
            })
        }
    });

    return boardData;
}

module.exports = {
    Model: Board,
    data: prepareData()
};