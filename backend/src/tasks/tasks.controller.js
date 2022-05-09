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
export async function modifyTask(request, response) {
  const { taskImageId, categoryId, periodId, taskPoints, taskNo, taskId } =
    request.body;

  const updateSqlQuery = `UPDATE tasks set task_image_id = ${taskImageId}, category_id = ${categoryId}, period_id = ${periodId}, task_no = ${taskNo}, task_point_no = ${taskPoints} WHERE id = ${taskId}  `;
  console.log("modifyQuery", updateSqlQuery);
  const sqlQueryResult = await database.query(updateSqlQuery);

  response.status(200).send({
    modified: true,
    ...sqlQueryResult,
  });
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

  let task;
  let status;
  try {
    const result = await database.query(sqlQuery);
    task = result[0];
    status = 200;
  } catch {
    status = 404;
    task = "Nincs ilyen feladat!";
  }

  response.status(status).send(task);
}

/**
 * @param request
 * @param response
 */
export async function deleteTaskById(request, response) {
  const { taskId } = request.body;

  // console.log("taskId", taskId);

  const sqlQuery = `DELETE from tasks WHERE id = "${taskId}"`;

  const deleteResponse = await database.query(sqlQuery);

  response.status(200).send({
    ...deleteResponse,
    isDeleted: true,
  });
}
