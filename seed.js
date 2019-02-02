'use strict';
require('dotenv').config();

const dbConfig = require('./src/config/database.config');
const seedHelper = require('./src/lib/seed.helpers');

/*eslint no-console: "off"*/
const name = process.argv[2] || '*';

dbConfig.setupDatabase(process)
  .then(() => {
    return seedHelper.loadFiles(`${__dirname}/src/**/${name}.seed.js`);
  })
  .then((files) => {
    console.log('--- SEEDING PROCESS START');
    return seedHelper.seed(files);
  })
  .then((report) => {
    report.forEach((entry) => {
      const logger = entry.hasOwnProperty('collection') ? console.log : console.error;

      logger(JSON.stringify(entry));
    });

    console.log('--- SEEDING PROCESS END');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
