/**
 * Set up the authentication layer to be used by the server
 * @param {object} authCfg
 * @param {object} authCfg.env - process.env
 * @param {express} authCfg.app - app
 */
exports.setupAuth = ({env, app} = {}) => {
  app.set('jwtSecret', env.JWT_SECRET); // Secret to be used by JWT
  app.set('bcryptSaltRounds', env.BCRYPT_SALT); // Salt to be used by crypto stuff
  app.set('jwtExpiration', env.JWT_EXPIRATION);
};
