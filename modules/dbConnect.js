const mgClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const dbName = 'website';
const dbURL =
  process.env.MONGODB_URI ||
  'mongodb+srv://dhiren:t3741100dp@merchexpress.ba962.mongodb.net/test?retryWrites=true&w=majority';
const mongoOption = { useNewUrlParser: true, useUnifiedTopology: true };
const state = {
  db: null,
};

const connect = (cb) => {
  if (state.db) cb();
  else {
    mgClient.connect(dbURL, mongoOption, (err, client) => {
      if (err) cb('Error connection to database');
      else {
        state.db = client.db(dbName);
        cb();
      }
    });
  }
};

const getPrimaryKey = (_id) => {
  return objectId(_id);
};

const getDB = () => {
  console.log(state.db);
  return state.db;
};

module.exports = { connect, getDB, getPrimaryKey };
