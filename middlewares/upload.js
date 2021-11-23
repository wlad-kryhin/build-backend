const multer = require("multer");
const path = require("path");
const tempdir = path.join("../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempdir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1024,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
