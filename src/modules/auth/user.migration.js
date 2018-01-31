const mongoose = require('mongoose');

const ADMIN = require('./roles.constants').ADMIN;
const strHelpers = require('../../lib/string.helpers');
const User = require('./user.model');

const BASE_ADMIN = {
    email: 'jorgeorm@gmail.com',
    passwd: strHelpers.randomStr(5),
    role: ADMIN
};



class UserMigration {
    construct(sampleData) {
        this.sampleData = sampleData;
    }

    async up() {
        const adminUser = new User(BASE_ADMIN);

        console.log('Password: ', BASE_ADMIN.passwd);

        return await User.findOneAndUpdate({
            email: BASE_ADMIN.email
        }, BASE_ADMIN, { upsert: true, new: true, setDefaultsOnInsert: true });
    }

    async down(err) {
        return await User.collection.drop()
            .then(() => {
                return Promise.resolve(err);
            })
            .catch((dropErr) => {
                return Promise.resolve(dropErr);
            });
    }
}

module.exports = UserMigration;