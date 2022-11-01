import path from "path";
import multer from "multer";
import { S3 } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

export const s3 = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const storageLocal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("public/upload"));
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const storage = multerS3({
  s3,
  acl: "public-read",
  bucket: "erettsegi-prod",
  key: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  return cb(null, true);
};

export const upload = multer({
  storage: process.env.ENVIRONMENT === "production" ? storage : storageLocal,
  fileFilter: imageFilter,
});
