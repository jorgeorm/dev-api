const ADMIN = require('./roles.constants').ADMIN;
const strHelpers = require('../../lib/string.helpers');
const User = require('./user.model');

const adminPass = process.env.ADMIN_PASSWORD || strHelpers.randomStr(5);

const BASE_ADMIN = {
    email: 'jorgeorm@gmail.com',
    password: adminPass,
    firstname: 'Jorge',
    lastname: 'Ordoñez Mendez',
    role: ADMIN
};

module.exports = {
    Model: User,
    data: BASE_ADMIN
};