const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { BCRYPT_SALT } = require("../../config/auth.config");

const { ADMIN, MANAGER, USER } = require("./roles.constants");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
    validate: [
      (email) => {
        const emailReg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailReg.test(email);
      },
      "Please provide a valid email address",
    ],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    enum: [ADMIN, MANAGER, USER],
  },
});

async function cleanData(user) {
  user.email = user.email.toLowerCase(); // Guarantees emails are stored in lowercase

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return;

  const salt = await bcrypt.genSalt(BCRYPT_SALT); // Generates salt
  const hash = await bcrypt.hash(user.password, salt); // Generates Hash from password

  user.password = hash;

  return user;
}

// Before save hook
userSchema.pre("save", function preUserSave(next) {
  // Can't use arrow functions
  const user = this;

  cleanData(user)
    .then(() => {
      next();
    })
    .catch((err) => {
      next(err);
    });
});

// Before findAndUpdate
userSchema.pre("findAndUpdate", function preUserFindAndUpdate(next) {
  // Can't use arrow functions
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
 * @memberOf User#
 * Compares password in user model
 * @param {string} testPass - String to be compared with the password
 * @return {Promise<boolean>}
 */
userSchema.methods.comparePassword = function userComparePassword(testPass) {
  const user = this;

  // bcrypt.compare returns Promise
  return bcrypt.compare(testPass, user.password);
};

/**
 * @memberOf User
 * Computed property to get the fullName
 */
userSchema.virtual("fullName").get(function userFullName() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * @class User
 * @type {Model<User>}
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
