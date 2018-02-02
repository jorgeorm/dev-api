'use strict';
require('dotenv').config();

const dbConfig = require('./src/config/database.config');
const seedHelper = require('./src/lib/seed.helpers');

dbConfig.setupDatabase(process);
seedHelper.loadFiles(`${__dirname}/src/**/*.seed.js`)
    .then((files) => {
        console.log('--- SEEDING PROCESS START');
        return seedHelper.seed(files); 
    })
    .then((report) => {
        report.forEach((entry) => {
            const logger = entry.hasOwnProperty('_id') ? console.log : console.error;

            logger(JSON.stringify(entry));
        });

        console.log('--- SEEDING PROCESS END');
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

