import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password, dbName } = serverConfig.database;
const database = new MySQL(host, port, user, password, dbName);

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
export async function insertMultiplePeriods(request, response) {
  const { periods } = request.body;

  if (Array.isArray(periods) && periods.length > 0) {
    const periodsPromises = periods.map((period) => {
      const sqlInsertQuery = `INSERT INTO periods (periodName) VALUES ("${period.periods}") `;
      return database.query(sqlInsertQuery);
    });

    Promise.all([periodsPromises]).then(() => {
      response.status(200).send({
        done: true,
      });
    });
  } else {
    response.status(400).send({
      error: true,
    });
  }
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

/** @param periodName */
export async function getPeriodByPeriodName(periodName) {
  const sqlQuery = `SELECT * from periods where periodName = "${periodName}"`;
  const period = await database.query(sqlQuery);
  if (period && Array.isArray(period) && period.length > 0) {
    return period[0];
  }
  return undefined;
}
