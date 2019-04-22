#!/bin/sh
# The following script switch the database to the one used by the app and set the permissions so that the app can connect
mongo --eval "
    var MONGO_INITDB_ROOT_USERNAME = '$MONGO_INITDB_ROOT_USERNAME';
    var MONGO_INITDB_ROOT_PASSWORD='$MONGO_INITDB_ROOT_PASSWORD';
    var CURRENT_DATE=new Date();
    var dbApp = db.getSiblingDB('$MONGO_INITDB_DATABASE');
    dbApp.createUser({
        user: MONGO_INITDB_ROOT_USERNAME,
        pwd: MONGO_INITDB_ROOT_PASSWORD,
        roles:[ 'dbOwner' ]
    });
    dbApp.seeds.save({ type: 'DB_CREATION', date: CURRENT_DATE });"
