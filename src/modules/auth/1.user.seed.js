const ADMIN = require('./roles.constants').ADMIN;
const strHelpers = require('../../lib/string.helpers');
const User = require('./user.model');

const adminPass = process.env.ADMIN_PASSWORD || strHelpers.randomString(5);

const BASE_ADMIN = {
  email: 'jorgeorm@gmail.com',
  password: adminPass,
  firstName: 'Jorge',
  lastName: 'Ordoñez Mendez',
  role: ADMIN
};

module.exports = {
  Model: User,
  data: BASE_ADMIN
};
