import path from "path";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
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

export const storage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "erettsegi-prod",
    key: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
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
  storage,
  fileFilter: imageFilter,
});
