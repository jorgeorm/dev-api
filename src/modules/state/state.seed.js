'use strict';

const State = require('./state.model');

const User = require('../auth/user.model');
const userData = require('../auth/user.seed').data;

async function prepareData () {
  const defaultStates = [{
    name: 'backlog',
    description: 'Represents the backlog'
  },
  {
    name: 'to do',
    description: 'Something is going to be handled in a sprint'
  },
  {
    name: 'in progress',
    description: 'State when something is being done'
  },
  {
    name: 'done',
    description: 'State when something is completed'
  }];

  const user = await User.findOne({email: userData.email});

  return defaultStates.map((state) => {
    state.createdBy = user;
    state.createdAt = new Date();

    return state;
  });
}

module.exports = {
  Model: State,
  data: prepareData()
};
