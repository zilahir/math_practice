import fs from "fs";
import path from "path";
import { serverConfig } from "../src/config";
import MySQL from "../src/db/MySQL";

const NEW_TASKS_FOLDER = path.join(__dirname, "../", "public", "upload", "new");
const { host, port, user, password } = serverConfig.database;
const database = new MySQL(host, port, user, password, "erettsegi");

interface FileType {
  allowed: RegExp[];
}

const fileTypes: FileType = {
  allowed: [new RegExp(/.*\.(?:jpg|png)$/i)],
};

function getAllFiles(): string[] {
  const files = fs.readdirSync(NEW_TASKS_FOLDER);

  const newTaskImages = files.filter((file) =>
    fileTypes.allowed.some((regexp) => regexp.test(file))
  );

  return newTaskImages;
}

async function insertTask(): Promise<boolean> {
  const newTaskImages = getAllFiles();
  return new Promise<boolean>((resolve, reject) => {
    const insertPromises = newTaskImages.map((image) => {
      // TODO: get all the values that represent a task
      const taskImageId = 0;
      const categoryId = 0;
      const periodId = 0;
      const taskNo = 0;
      const taskPoints = 0;
      const insertSqlQuery = `INSERT INTO tasks (task_image_id, category_id, period_id, task_no, task_point_no) VALUES (${taskImageId}, ${categoryId}, ${periodId}, ${taskNo}, ${taskPoints})`;
      // const sqlQueryResult = database.query(insertSqlQuery);
      // return sqlQueryResult;
      console.log("insertSqlQuery", insertSqlQuery);
      return insertSqlQuery;
    });

    Promise.all(insertPromises).then(() => {
      resolve(true);
    });
  });
}

async function main() {
  await insertTask();
}

main();
