const mongoose = require('mongoose');

const ADMIN = require('./roles.constants').ADMIN;
const strHelpers = require('../../lib/string.helpers');
const User = require('./user.model');

const BASE_ADMIN = {
    email: 'jorgeorm@gmail.com',
    password: strHelpers.randomStr(5),
    role: ADMIN
};



class UserMigration {
    construct(sampleData) {
        this.sampleData = sampleData;
    }

    up() {
        const adminQuery = {
            email: BASE_ADMIN.email
        };

        console.log('BASE_ADMIN', BASE_ADMIN);

        return User.create([BASE_ADMIN])
            .then((res) => {
                return Promise.resolve(res);
            });
    }

    down(err) {
        return User.collection.drop()
            .then(() => {
                return Promise.resolve(err);
            })
            .catch((dropErr) => {
                return Promise.resolve(dropErr);
            });
    }
}

module.exports = UserMigration;