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
exports.jwtLogin = async function ({email, password} = {}, app) {
  const signConfg = {
    expiresIn: app.get('jwtExpiration')
  };

  const user = await new Promise((resolve, reject) => {
    User.findOne({email}, (err, user) => {
      if(err) return reject(err);

      resolve(user);
    }).select('+password');
  });

  if(!user) return undefined;

  const passMatch = await user.comparePassword(password);

  if(!passMatch) return undefined;

  const userPayload = {
    id: user._id,
    role: user.role
  };
    
  return jwt.sign(userPayload, app.get('jwtSecret'), signConfg);
};

/**
 * Obtains user's data from an a Authorization token
 * @param {Object} payload - User payload used to sign the token
 * @return {Promise<User>}
 */
exports.currentUser = async function ({ id }, ) {
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
exports.signup = async function ({email, password}) {
  throw new TypeError(`Sign Up not implemented ${{email, password}}`);
};