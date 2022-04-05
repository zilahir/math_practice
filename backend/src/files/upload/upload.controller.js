import multer from "multer";

import { imageFilter, storage } from "../storage";
import { serverConfig } from "../../config";
import MySQL from "../../db/MySQL";

const { host, port, user, password } = serverConfig.database;

const database = new MySQL(host, port, user, password, "erettsegi");

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

/**
 * @param request
 * @param response
 * @param next
 */
export async function saveImageInDatabase(request, response) {
  const { filePath } = request;

  const newImageQuery = `INSERT INTO task_images (filePath) VALUES ("${filePath}") `;
  try {
    await database.query(newImageQuery);
  } catch {
    response.status(500).response({
      error: "Inserint into the database has failed",
    });
  }

  response.status(200).send({
    filePath: filePath,
  });
}

export default uploadFile;
