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
    });
  });
};

/**
 * Migrates a list of migration file classes, all classes must have up and down method
 * @param {String[]} files List of migration files
 */
exports.seed = function (files) {
  /**
     * @type {Promise[]}
     */
  const seedPromises = files.map(async(seedFile) => {
    let {Model, data} = require(seedFile);
    const collection = Model.collection.collectionName;

    data = data instanceof Promise ? await data : data;

    await Model.create(data);

    return {collection, data};
  });

  return Promise.all(seedPromises);
};
