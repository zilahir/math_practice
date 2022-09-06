import multer from "multer";
import path from "path";
import fs from "fs";
import { S3 } from "@aws-sdk/client-s3";

import { imageFilter, storage } from "../storage";
import { serverConfig } from "../../config";
import MySQL from "../../db/MySQL";
import { reject } from "lodash";

const { host, port, user, password, dbName } = serverConfig.database;

const database = new MySQL(host, port, user, password, dbName);

/**
 * @param request
 * @param response
 * @param next
 */
function uploadFile(request, response, next) {
  const upload = multer({ storage: storage, fileFilter: imageFilter }).single(
    "file"
  );
  upload(request, response, function (err) {
    // request.file contains information of uploaded file
    // request.body contains information of text fields, if there were any

    if (request.fileValidationError) {
      return response.send(request.fileValidationError);
    } else if (!request.file) {
      return response.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return response.send(err);
    } else if (err) {
      return response.send(err);
    }

    request.filePath = request.file.filename;

    next();
  });
}

export const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

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
  const { filePath } = request;

  let sqlQueryResult = {};
  const newImageQuery = `INSERT INTO task_images (filePath) VALUES ("${filePath}") `;
  try {
    sqlQueryResult = await database.query(newImageQuery);
  } catch {
    response.status(500).response({
      error: "Inserint into the database has failed",
    });
  }

  response.status(200).send({
    filePath: filePath,
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
