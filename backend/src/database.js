const knex = require('knex');
const { database } = require('./config');

const dbConfig = knex({
  client: 'mysql2',
  connection: database,
});

export default dbConfig