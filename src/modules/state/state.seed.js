const State = require('./state.model');

module.exports = {
    Model: State,
    data: [
        { name: 'backlog', description: 'Represents the backlog' },
        { name: 'to do', description: 'Something is going to be handled in a sprint' },
        { name: 'in progress', description: 'State when something is being done' },
        { name: 'done', description: 'State when something is completed' },
    ]
};