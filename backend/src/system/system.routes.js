import { Router } from "express";

import { serverConfig } from "../config";
import MySQL from "../db/MySQL";
import { data } from "../utils/data";
import { getCategoryIdByCategoryName } from "../categories/categories.controllers";
import { getPeriodByPeriodName } from "../periods/periods.controllers";
import {
  getFileByName,
  saveImageInDatabaseSync,
  uploadFileToS3,
} from "../files/upload/upload.controller";

const router = Router();

const { host, port, user, password, dbName } = serverConfig.database;
const database = new MySQL(host, port, user, password, dbName);

/**
 * @param root0
 * @param root0.category_id
 * @param root0.period_id
 * @param root0.task_image_id
 * @param root0.task_no
 * @param root0.task_point_no
 */
async function insertTask({
  category_id,
  period_id,
  task_image_id,
  task_no,
  task_point_no,
}) {
  return new Promise((resolve, reject) => {
    const insertSqlQuery = `INSERT INTO tasks (task_image_id, category_id, period_id, task_no, task_point_no) VALUES ("${task_image_id}", ${category_id}, ${period_id}, ${task_no}, ${task_point_no})`;
    database
      .query(insertSqlQuery)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

/**
 * @param request
 * @param response
 */
async function parseJson(request, response) {
  return new Promise((resolve, reject) => {
    const allTaskPromise = data.map(async (task) => {
      // console.log("task", task);
      // 1. get period_id by periodName
      // 2. get category_id by cateogry Name
      const categoryId = await getCategoryIdByCategoryName(task.category);
      const periodId = await getPeriodByPeriodName(task.period);

      // in production upload image to aws s3
      const fileToUpload = await getFileByName(task.pictureName);
      const fileName = `file-${new Date().getTime()}`;
      await uploadFileToS3(fileToUpload, fileName);

      const taskImageId = await saveImageInDatabaseSync(fileName);

      // 3. upload the image
      const singleTask = {
        period_id: periodId.id,
        category_id: categoryId.id,
        task_image_id: taskImageId.insertId,
        task_no: task.task_no,
        task_point_no: task.task_point_no,
      };

      return insertTask(singleTask).then(() => {
        resolve();
      });
    });

    Promise.all([allTaskPromise])
      .then(() => {
        response.status(200).send({
          done: true,
        });
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
}

// router.post("/parse-tasks", [parseJson]);

export default router;
