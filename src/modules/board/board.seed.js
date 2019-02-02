const Board = require('./board.model');
const State = require('../state/state.model');
const User = require('../auth/user.model');

const userData = require('../auth/user.seed').data;
const statesData = require('../state/state.seed').data;

async function prepareData() {
  const boardData = {
    name: 'Sample board',
    transitions: [],
    createdBy: undefined,
    createdAt: undefined,
    usedStates: [],
  };
  const user = await User.findOne({email: userData.email});
  const statesToFind = await statesData;
  const statesQ = statesToFind.map((state) => {
    const { name, description } = state;
    return { name, description };
  });

  const states = await State.find({ $or: [...statesQ] });

  boardData.createdBy = user;
  boardData.createdAt = new Date();

  states.forEach((state, index) => {
    if (index > 0) {
      boardData.transitions.push({
        from: state,
        to: states[index - 1]
      });
    }
    if (index < (states.length - 1)) {
      boardData.transitions.push({
        from: state,
        to: states[index + 1]
      });
    }

    boardData.usedStates.push(state);
  });

  return boardData;
}

module.exports = {
  Model: Board,
  data: prepareData()
};
