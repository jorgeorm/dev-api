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
        index: true,
        required: true,
        validate: [(email) => {
            const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return emailReg.test(email);
        }, 'Please provide a valid email address'],
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ADMIN, MANAGER, USER]
    }
});

async function cleanData(user) {
    user.email = user.email.toLowerCase(); // Guarantees emails are stored in lowercase
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return;

    const salt = await bcrypt.genSalt(BCRYPT_SALT); // Generates salt
    const hash = await bcrypt.hash(user.password, salt); // Generates Hash from password

    user.password = hash;

    return user;
}

// Before save hook
userSchema.pre('save', function (next) {// Can't use arrow functions
    const user = this;

    cleanData(user)
        .then(() => {
            next();
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

// Before findAndUpdate
userSchema.pre('findAndUpdate', function (next) {// Can't use arrow functions
    const user = this;

    cleanData(user)
        .then(() => {
            next();
        })
        .catch((err) => {
            next(err);
        });
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