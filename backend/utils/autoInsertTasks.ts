import fs from "fs";
import path from "path";
import taskData from "./data.json";
import { serverConfig } from "../src/config";
import MySQL from "../src/db/MySQL";

const NEW_TASKS_FOLDER = path.join(__dirname, "../", "public", "upload", "new");
const EXISTING_TASKS_FOLDER = path.join(__dirname, "../", "public", "upload");

const { host, port, user, password } = serverConfig.database;
const database = new MySQL(host, port, user, password, "erettsegi");

interface FileType {
  allowed: RegExp[];
}

function parseTaskData() {
  taskData.map((task: any) => console.log("task", task));
}

const fileTypes: FileType = {
  allowed: [new RegExp(/.*\.(?:jpg|png)$/i)],
};

function getAllFiles(): string[] {
  const files = fs.readdirSync(NEW_TASKS_FOLDER);

  const newTaskImages = files.filter((file) =>
    fileTypes.allowed.some((regexp) => regexp.test(file))
  );

  console.log(newTaskImages.length);
  return newTaskImages;
}

async function getPeriodIdByPeriodName(periodName: string): Promise<string> {
  const sqlQuery = `SELECT * from periods where periodName = ${periodName}`;
  const result = await database.query(sqlQuery);
  return result;
}

async function getCategoryIdByCategoryName(
  categoryName: string
): Promise<string> {
  const sqlQuery = `SELECT * from categories where name = "${categoryName}"`;
  // console.log("sqlQuery", sqlQuery);
  const result = await database.query(sqlQuery);
  return result;
}

interface JsonTask {
  pictureName: string;
  period: string;
  category: string;
  task_no: number;
  task_point_no: number;
}

interface Task
  extends Omit<JsonTask, "periodName" | "category" | "period" | "pictureName"> {
  category_id: number | string;
  period_id: number;
  task_image_id: number;
}

async function insertTask({
  category_id,
  period_id,
  task_image_id,
  task_no,
  task_point_no,
}: Task): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const insertSqlQuery = `INSERT INTO tasks (task_image_id, category_id, period_id, task_no, task_point_no) VALUES (${task_image_id}, ${category_id}, ${period_id}, ${task_no}, ${task_point_no})`;
    return database.query(insertSqlQuery);
  });
}

async function processJson(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const allTaskPromise = taskData.map(async (task: any, index: number) => {
      // console.log("task", task);
      // 1. get period_id by periodName
      // 2. get category_id by cateogry Name
      // const categoryId = await getCategoryIdByCategoryName(task.category);
      // console.log(categoryId, index);
      // 3. upload the image
      const singleTask: Task = {
        period_id: 0,
        category_id: 0,
        task_image_id: 0,
        task_no: task.task_no,
        task_point_no: task.task_point_no,
      };

      // return insertTask(singleTask);
    });

    Promise.all([allTaskPromise]).then(() => {
      resolve(true);
    });
  });
}

async function main() {
  processJson();
}

main();
