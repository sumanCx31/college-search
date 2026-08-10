const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { randomStringGenerator } = require("../utilities/helper");

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    cb(null, filePath);
  },

  filename: (req, file, cb) => {
    const filename =
      randomStringGenerator(15) + "-" + file.originalname;

    cb(null, filename);
  },
});

const uploader = (type = "image") => {
  let allowedExts = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "webp",
    "svg",
    "bmp",
  ];

  let fileSize = 3000000; // 3 MB

  if (type === "doc") {
    fileSize = 500000; // 500 KB

    allowedExts = [
      "pdf",
      "doc",
      "docx",
      "txt",
      "csv",
      "xls",
      "xlsx",
    ];
  }

  if (type === "audio") {
    fileSize = 700000; // 700 KB

    allowedExts = [
      "mp3",
      "wav",
      "ogg",
      "aac",
    ];
  }

  const fileFilter = (req, file, cb) => {
    const fileExt = file.originalname
      .split(".")
      .pop()
      .toLowerCase();

    if (allowedExts.includes(fileExt)) {
      cb(null, true);
    } else {
      cb({
        code: 422,
        message: "File format not supported",
        status: "INVALID_FILE_FORMAT",
      });
    }
  };

  return multer({
    storage: myStorage,

    fileFilter: fileFilter,

    limits: {
      fileSize: fileSize,
    },
  });
};

module.exports = uploader;