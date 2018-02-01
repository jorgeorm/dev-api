const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {BCRYPT_SALT} = require('../../config/auth.config');

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

userSchema.pre('save', function (next) {
    const user = this;
    const saltRounds = BCRYPT_SALT; // Salt to hash

    user.email = user.email.toLowerCase(); // Guarantees emails are stored in lowercase
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt

    bcrypt.genSalt(saltRounds)
        .then((salt) => {
            return bcrypt.hash(user.password, salt) // hash the password
        })
        .then((hash) => { 
            user.password = hash; // override the cleartext password
            next();
        })
        .catch((err) => {
            next(err);
        })
});

/**
 * Compares password in user model
 * @param {string} testPass - String to be compared with the password
 * @return {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (testPass) {
    const user = this;

    return bcrypt.compare(testPass, user.password);
};

module.exports = mongoose.model('User', userSchema);