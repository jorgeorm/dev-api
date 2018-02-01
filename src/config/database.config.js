const glob = require('glob');
const mongoose = require('mongoose');


/**
 * Setup the database connection
 * @param {object} dbCfg
 * @param {object} dbCfg.env - process.env
 * @param {express} dbCfg.app - app  
 */
exports.setupDatabase = ({env, app} = {}) => {
    const isDev = env.APP_ENV === 'dev';
    // DATABASE STUFF
    const dbHost = env.DB_HOST || 'localhost';
    const dbName = env.DB_NAME || 'dev-api';
    const dbPasswd = env.DB_PASSWD || 'dev';
    const dbPort = env.DB_PORT  || '27017';
    const dbUser = env.DB_USER || 'dev';

    const dbURI = `mongodb://${dbUser}:${dbPasswd}@${dbHost}/${dbName}`;

    mongoose.connect(dbURI)
        .then(() => {
            console.log('DB_CONNECTION_STATUS: Connected');

            if (isDev) {
                return migrate();
            }

            return Promise.resolve([]);
        })
        .then((migrations) => {
            if (isDev) {
                console.log('DB_MIGRATION: COMPLETED SEE RESULTS');
                migrations.forEach((migRes) => {
                    console.log(JSON.stringify(migRes));
                });
            }
        })
        .catch((err) => {
            console.error('DB_CONNECTION_STATUS: Error');
            console.error('DB_ERROR: ', err);
        });
};


/**
 * Runs migrations in the project
 */
async function migrate() {
    const migrations = await new Promise((resolve, reject) => {
        const globPath = `${__dirname}/../**/*.migration.js`;
        glob(globPath, (err, matches) => {

            if(err) {
                resolve([]);
            }

            resolve(matches);
        });
    });

    const migPromises = migrations.map((migFile) => {
        const MigClass = require(migFile);
        const migration = new MigClass();

        return migration.up()
            .then((data) => {
                return Promise.resolve(data);
            })
            .catch((err) => {
                if (typeof migration.down === 'function') {
                    return migration.down({message: `Error in migration file: ${migFile}` , error: 'MigrationError'});
                }

                return Promise.resolve({message: `Error in migration file: ${migFile}, and there's no down method` , error: 'MigrationError'});
            });
    });

    return await Promise.all(migPromises);
}