const mongoose = require('mongoose');

const {
    ADMIN,
    MANAGER,
    USER
} = require('./roles.constants');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        validate: [(email) => {
            const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailReg.test(email);
        }, 'Please provide a valid email address'],
    },
    password: String,
    role: {
        type: String,
        enum: [ADMIN, MANAGER, USER]
    }
});

module.exports = mongoose.model('User', userSchema);