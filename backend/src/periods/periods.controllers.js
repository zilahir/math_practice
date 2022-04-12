import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password } = serverConfig.database;
const database = new MySQL(host, port, user, password, "erettsegi");

/**
 * @param request
 * @param response
 */
export async function insertNewPeriod(request, response) {
  const { period } = request.body;
  const sqlInsertQuery = `INSERT INTO periods (periodName) VALUES ("${period}") `;
  const newPeriodSqlResult = await database.query(sqlInsertQuery);

  response.status(200).send(newPeriodSqlResult);
}

/**
 * @param request
 * @param response
 */
export async function getAllPeriods(request, response) {
  const sqlQuery = "SELECT * from periods";
  const allPeriodResult = await database.query(sqlQuery);
  response.status(200).send(allPeriodResult);
}
