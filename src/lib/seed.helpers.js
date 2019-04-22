const glob = require('glob');

/**
 * Loads file paths in a array
 * @param {String} globExp
 * @return {Promise<string[]>}
 */
exports.loadFiles = function loadFiles(globExp) {
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
exports.seed = function seed(files) {
  /**
   * @type {Promise[]}
   */
  const seedPromises = files.map(async(seedFile) => {
    const { Model, data } = require(seedFile);
    const collection = Model.collection.collectionName;
    const insertData = data instanceof Promise ? await data : data;

    await Model.create(insertData);

    return {collection, data};
  });

  return Promise.all(seedPromises);
};
