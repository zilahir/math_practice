import path from "path";
import multer from "multer";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.debug(__dirname);
    cb(null, path.resolve("public/upload"));
  },

  filename: function (req, file, cb) {
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
  cb(null, true);
};

export const upload = multer({ storage: storage, fileFilter: imageFilter });
