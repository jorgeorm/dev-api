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
    const sortedFiles = files.sort((a, b) => {
      const aName = a.split('/').pop();
      const bName = b.split('/').pop();

      return aName > bName ? 1 : -1;
    });
    console.log('--- SEEDING PROCESS START');
    console.log(sortedFiles);
    return seedHelper.seed(sortedFiles);
  })
  .then((report) => {
    report.forEach((entry) => {
      const { collection } = entry;
      const logger = collection ? console.log : console.error;

      logger(JSON.stringify(entry));
    });

    console.log('--- SEEDING PROCESS END');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
