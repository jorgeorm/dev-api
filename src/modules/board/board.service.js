const User = require('../auth/user.model');
const Board = require('./board.model');
const State = require('../state/state.model');

module.exports = {
  /**
     * Gets the boards based on the app logic
     * @param {String} userId 
     * @param {String} userRole 
     */
  async getBoards(userId) {
    try {
      const user = await User.findById(userId);
      const userBoards = await Board.find({ createdBy: user._id })
        .populate('usedStates', undefined, State).exec();

      return userBoards;
    }
    catch(err) {
      throw err;
    }
  },
};