const glob = require('glob');
const mongoose = require('mongoose');
const path = require('path');

const seedSchema = new mongoose.Schema({
  filename: String,
  type: String,
  date: mongoose.SchemaTypes.Date,
});
const Seed = mongoose.model('Seed', seedSchema);
exports.Seed = Seed;

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
 * Executes a seed operation by inserting data into a specified model.
 * @param {Object} options - The options for the seed operation.
 * @param {Model} options.Model - The model to insert data into.
 * @param {Promise|Object} options.data - The data to be inserted. Can be a Promise or a plain object.
 * @returns {Object} - The collection name and the inserted data.
 */
async function executeSeed({Model, data}) {
  if (!Model || !data) throw new Error('Model and data are required for seed operation');

  const collection = Model.collection.collectionName;
  const insertData = data instanceof Promise ? await data : data;
  const seedReport = ['=== SEED: ', collection, ' STARTED, '];

  try {
    const result = await Model.create(insertData);
    seedReport.push('SUCCESS: ', result.length ?? 1, ' entries ===');
  } catch (e) {
    seedReport.push('=== ERROR: ', e, ' ===');
    throw e;
  } finally {
    console.log(seedReport.join(''));
  }

  return {collection, data: insertData};
}

/**
 * Migrates a list of migration file classes, all classes must have up and down method
 * @param {String[]} files List of migration files
 */
exports.seed = function seed(files) {
  return files.reduce((chain, file) => {
    if (!file) return chain;

    return chain.then(async (chainedResult) => {
      const filename = path.basename(file);
      const existingSeed = await Seed.findOne({ filename, type: 'file' });

      if (existingSeed) {
        console.log('=== SEED: ', filename, ' SKIPPED ===');
        return chainedResult;
      }

      const seederConfig = require(file);
      
      const result = await executeSeed(seederConfig);
      await Seed.create({ filename, date: new Date() });
      
      if (chainedResult)  {
        return [...chainedResult, result];
      }

      return [result];
    });
  }, Promise.resolve());
};
