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

  const user = await User.findOne({ email }).select('+password');

  if(!user) return undefined;

  const passMatch = await user.comparePassword(password);

  if(!passMatch) return undefined;

  const userPayload = {
    id: user._id,
    role: user.role
  };

  const jwtToken = await new Promise((resolve, reject) => {
    jwt.sign(userPayload, app.get('jwtSecret'), signConfig, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });

  return jwtToken;
};

/**
 * Obtains user's data from an a Authorization token
 * @param {Object} payload - User payload used to sign the token
 * @return {Promise<User>}
 */
exports.currentUser = async function currentUser({ id }, ) {
  const user = await new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if(err) return reject(err);

      resolve(user);
    });
  });

  if(!user) return undefined;

  return user;
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
