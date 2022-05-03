import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password } = serverConfig.database;

const database = new MySQL(host, port, user, password, "erettsegi");

/**
 * @param request
 * @param response
 */
export async function createNewTask(request, response) {
  const { taskImageId, categoryId, periodId, taskPoints, taskNo } =
    request.body;

  const insertSqlQuery = `INSERT INTO tasks (task_image_id, category_id, period_id, task_no, task_point_no) VALUES (${taskImageId}, ${categoryId}, ${periodId}, ${taskNo}, ${taskPoints})`;

  const sqlQueryResult = await database.query(insertSqlQuery);

  response.status(200).send(sqlQueryResult);
}
