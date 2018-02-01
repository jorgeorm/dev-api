'use strict';
const jwt = require('jsonwebtoken');

const User = require('./user.model');

/**
 * 
 * @param {object} cred
 * @param {string} cred.email - Email
 * @param {string} cred.password - Password
 */
exports.jwtLogin = async ({email, password} = {}, app) => {
    const signConfg = {
        expiresIn: app.get('jwtExpiration')
    };

    const user = await new Promise((resolve, reject) => {
        User.findOne({email}, (err, user) => {
            if(err) return reject(err);

            resolve(user);
        })
    });

    if(!user) return undefined;

    const passMatch = await user.comparePassword(password);

    if(!passMatch) return undefined;
    
    return jwt.sign({role: user.role}, app.get('jwtSecret'), signConfg);
};

exports.signup = async ({email, password}) => {


};