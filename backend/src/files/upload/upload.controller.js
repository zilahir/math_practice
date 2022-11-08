import multer from "multer";
import path from "path";
import fs from "fs";
import { S3 } from "@aws-sdk/client-s3";

// import { imageFilter, storage } from "../storage";
import { serverConfig } from "../../config";
import MySQL from "../../db/MySQL";
import { reject } from "lodash";
import { s3 } from "../storage";

const { host, port, user, password, dbName } = serverConfig.database;

const database = new MySQL(host, port, user, password, dbName);

/**
 * @param request
 * @param response
 * @param next
 */
async function uploadFile(request, response, next) {
  const thisFileName = `file-${new Date().getTime()}`;

  const uploadResponse = await uploadFileToS3(request.file, thisFileName);

  next();
}

/**
 * @param file
 * @param fileName
 */
export async function uploadFileToS3(file, fileName) {
  const putObjectResult = await s3.putObject({
    Bucket: "erettsegi-prod",
    Key: `${fileName}.png`,
    Body: file,
  });

  return putObjectResult;
}

/**
 * @param request
 * @param response
 * @param next
 */
export async function saveImageInDatabase(request, response) {
  const { file } = request;
  const filePath = file.key;

  const fileName = filePath.split(".")[0];

  console.log("file.originalname", file.originalname);
  console.log("fileName", fileName);

  let sqlQueryResult = {};
  const newImageQuery = `INSERT INTO task_images (filePath) VALUES ("${fileName}") `;
  try {
    sqlQueryResult = await database.query(newImageQuery);
  } catch {
    response.status(500).response({
      error: "Inserint into the database has failed",
    });
  }

  response.status(200).send({
    filePath: file.key,
    imagePath: file.location,
    ...sqlQueryResult,
  });
}

/** @param filePath */
export async function saveImageInDatabaseSync(filePath) {
  return new Promise((resolve) => {
    const newImageQuery = `INSERT INTO task_images (filePath) VALUES ("${filePath}") `;

    database
      .query(newImageQuery)
      .then((result) => {
        resolve(result);
      })
      .catch(() => {
        reject();
      });
  });
}

/** @param fileName */
export async function getFileByName(fileName) {
  return new Promise((resolve, reject) => {
    const newFileDirPath = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "public",
      "upload",
      "new"
    );
    try {
      fs.readdir(path.join(newFileDirPath), null, (err, files) => {
        const file = files.find((file) => file === `${fileName}.png`);
        if (err) reject(err);
        if (file) {
          // const result = copyFile(newFileDirPath, file);
          const thisImageFile = fs.readFileSync(
            `${newFileDirPath}/${fileName}.png`
          );
          resolve(thisImageFile);
        }
      });
    } catch (err) {
      reject(false);
    }
  });
}

/**
 * @param source
 * @param fileName
 */
export async function copyFile(source, fileName) {
  return new Promise(function (resolve) {
    const targetFileDir = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "public",
      "upload"
    );
    const newFileName = `file-${Date.now()}.png`;
    fs.copyFileSync(`${source}/${fileName}`, `${targetFileDir}/${newFileName}`);
    resolve(newFileName);
  });
}

export default uploadFile;
