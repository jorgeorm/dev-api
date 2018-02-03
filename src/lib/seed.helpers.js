
const glob = require('glob');

/**
 * Loads file paths in a array
 * @param {String} globExp 
 * @return {Promise<string[]>}
 */
exports.loadFiles = function (globExp) {
    return new Promise((resolve, reject) => {
        glob(globExp, (err, files) => {
            if(err) return reject(err);

            resolve(files);
        })
    });
}

/**
 * Migrates a list of migration file classes, all classes must have up and down method
 * @param {String[]} files List of migration files
 */
exports.seed = async function (files) {
    /**
     * @type {Promise[]}
     */
    const seedPromises = files.map((seedFile) => {
        const {Model, data} = require(seedFile);
        const collection = Model.collection.collectionName;

        if(data instanceof Promise) return data
            .then((_data) => {
                return Model.create(_data);
            })
            .then((object) => {
                return Promise.resolve({collection, _data});
            })
            .catch((err) => {
                return Promise.resolve(err);
            });

        return Model.create(data)
            .then((object) => {
                return Promise.resolve({collection, data});
            })
            .catch((err) => {
                return Promise.resolve(err);
            });
    });

    return Promise.all(seedPromises);
}
