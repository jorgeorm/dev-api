const { ObjectId } = require('mongoose').SchemaTypes;

const User = require('../auth/user.model');
const Board = require('./board.model');

module.exports = {
    /**
     * Gets the boards based on the app logic
     * @param {String} userId 
     * @param {String} userRole 
     */
    async getBoards(userId, userRole) {
        try {
            const user = await User.findById(userId);
            const userBoards = await Board.find({ createdBy: user._id });

            return userBoards;
        }
        catch(err) {
            throw err;
        }
    },
};