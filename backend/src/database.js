import knex from "knex";
// import { serverConfig } from "./config";

const dbConfig = knex({
  client: "mysql2",
  connection: process.env.CLEARDB_DATABASE_URL,
});

export default dbConfig;
