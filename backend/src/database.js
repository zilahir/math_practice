import knex from 'knex';
import { serverConfig } from './config';

const dbConfig = knex({
  client: 'mysql2',
  connection: serverConfig.database
});

export default dbConfig