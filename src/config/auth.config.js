const jwt = require('jsonwebtoken');

/**
 * Set up the authentication layer to be used by the server
 * @param {object} authCfg
 * @param {object} authCfg.env - process.env
 * @param {express} authCfg.app - app  
 */
exports.setupAuth = ({env, app} = {}) => {
    const JWT_SECRET = env.JWT_SECRET || 'superSecret123';

    app.set('jwtSecret', JWT_SECRET); // secret variable
};