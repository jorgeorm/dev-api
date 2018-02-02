require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'superSecret123';
const BCRYPT_SALT = Number(process.env.BCRYPT_SALT) || 10;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '7 days';

/**
 * Set up the authentication layer to be used by the server
 * @param {object} authCfg
 * @param {object} authCfg.env - process.env
 * @param {express} authCfg.app - app  
 */
exports.setupAuth = ({env, app} = {}) => {
    app.set('jwtSecret', JWT_SECRET); // Secret to be used by JWT
    app.set('bcryptSaltRounds', BCRYPT_SALT); // Salt to be used by crypto stuff
    app.set('jwtExpiration', JWT_EXPIRATION);
};

exports.JWT_SECRET = JWT_SECRET;
exports.BCRYPT_SALT = BCRYPT_SALT;
exports.JWT_EXPIRATION = JWT_EXPIRATION;