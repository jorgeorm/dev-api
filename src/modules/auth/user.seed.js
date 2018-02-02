const ADMIN = require('./roles.constants').ADMIN;
const strHelpers = require('../../lib/string.helpers');
const User = require('./user.model');

const BASE_ADMIN = {
    email: 'jorgeorm@gmail.com',
    password: strHelpers.randomStr(5),
    role: ADMIN
};

module.exports = {
    Model: User,
    data: BASE_ADMIN
};