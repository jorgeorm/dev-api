'use strict';
const jwt = require('jsonwebtoken');

const User = require('./user.model');

/**
 *
 * @param {Object} cred
 * @param {String} cred.email - Email
 * @param {String} cred.password - Password
 * @param {Express} app
 */
exports.jwtLogin = async function jwtLogin({email, password} = {}, app) {
  const signConfig = {
    expiresIn: app.get('jwtExpiration')
  };
  const jwtSecret = app.get('jwtSecret');

  const user = await User.findOne({ email }).select('+password').exec();

  if(!user) return undefined;

  const passMatch = await user.comparePassword(password);

  if(!passMatch) return undefined;

  const userPayload = {
    id: user._id,
    role: user.role
  };

  // Using synchronous method since no perf. value: @see https://github.com/auth0/node-jsonwebtoken/issues/566
  return jwt.sign(userPayload, jwtSecret, signConfig);
};

/**
 * Obtains user's data from an a Authorization token
 * @param {Object} payload - User payload used to sign the token
 * @return {Promise<User>}
 */
exports.currentUser = async function currentUser({ id } = {}) {
  return User.findById(id).exec();
};

/**
 *
 * @param {Object} creds
 * @param {String} creds.email
 * @param {String} creds.password
 */
exports.signUp = async function signUp({email, password}) {
  throw new TypeError(`Sign Up not implemented ${{email, password}}`);
};
