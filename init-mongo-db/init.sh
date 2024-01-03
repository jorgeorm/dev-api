#!/bin/sh
# The following script switch the database to the one used by the app and set the permissions so that the app can connect
mongosh --quiet --eval "
    var MONGO_INITDB_ROOT_USERNAME = '$MONGO_INITDB_ROOT_USERNAME';
    var MONGO_INITDB_ROOT_PASSWORD='$MONGO_INITDB_ROOT_PASSWORD';
    var CURRENT_DATE=new Date();
    var dbApp = db.getSiblingDB('$MONGO_INITDB_DATABASE');

    function skipSeed() {
        print('Database already initialized');
        quit();
    }

    function seedOwner({ date = CURRENT_DATE} = {}) {
        print('Creating database user');
        dbApp.createUser({
            user: MONGO_INITDB_ROOT_USERNAME,
            pwd: MONGO_INITDB_ROOT_PASSWORD,
            roles:[ 'dbOwner' ]
        });
        dbApp.createCollection('seeds');
        dbApp.seeds.insertOne({ type: 'DB_CREATION', filename: 'init.sh', date: date });
    }

    db.seeds.findOne({ type: 'DB_CREATION', file: 'init.sh' }) ? skipSeed() : seedOwner();
"
