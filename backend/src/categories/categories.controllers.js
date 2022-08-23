import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password, dbName } = serverConfig.database;
const database = new MySQL(host, port, user, password, dbName);

/**
 * @param request
 * @param response
 */
export async function getAllCategories(request, response) {
  const allCategories = await database.query(`SELECT * from categories`);
  return response.status(200).send(allCategories);
}

/** @param categoryName */
export async function getCategoryIdByCategoryName(categoryName) {
  const sqlQuery = `SELECT * from categories where name = "${categoryName}"`;
  const result = await database.query(sqlQuery);
  if (Array.isArray(result) && result.length > 0) {
    return result[0];
  }
  return undefined;
}
