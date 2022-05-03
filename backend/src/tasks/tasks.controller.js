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

/**
 * @param request
 * @param response
 */
export async function getAllTasks(request, response) {
  const sqlQuery =
    "select t.id, t.task_image_id, t.category_id, t.period_id, t.task_no, t.task_point_no, ti.filePath, c.name as 'categoryName', p.periodName from tasks t INNER JOIN categories c on c.id = t.category_id INNER JOIN periods p on p.id = t.period_id INNER JOIN task_images ti on ti.id = t.task_image_id";

  const sqlQueryResult = await database.query(sqlQuery);

  response.status(200).send(sqlQueryResult);
}

/**
 * @param request
 * @param response
 */
export async function getTaskById(request, response) {
  const { taskId } = request.params;

  const sqlQuery = `select t.id, t.task_image_id, t.category_id, t.period_id, t.task_no, t.task_point_no, ti.filePath, c.name as "categoryName", p.periodName from tasks t INNER JOIN categories c on c.id = t.category_id INNER JOIN periods p on p.id = t.period_id INNER JOIN task_images ti on ti.id = t.task_image_id WHERE t.id = "${taskId}";`;

  const task = await database.query(sqlQuery);

  response.status(200).send(task);
}
