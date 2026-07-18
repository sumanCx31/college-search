const express = require("express");
require("./mongodb.config");

const router = require("./router.config");
const { deleteFile } = require("../utilities/helper");
const cors = require('cors');
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use((req, res, next) => {
  next({
    code: 404,
    message: "Route not found",
    status: "NOT_FOUND",
  });
});

app.use((error, req, res, next) => {
  let code = error.code || 500;
  let detail = error.detail || null;
  let msg = error.message || "Internal Server Error";
  let status = error.status || "INTERNAL_SERVER_ERROR";

  if (req.file) {
    deleteFile(req.file.path);
  }

  if (req.files) {
    req.files.forEach((file) => {
      deleteFile(file.path);
    });
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    code = 400;
    msg = "Validation Failed";
    status = "VALIDATION_ERROR";
    detail = {};

    Object.keys(error.keyValue).forEach((key) => {
      detail[key] = `${key} already exists. Please choose another.`;
    });
  }

  console.error(error);

  res.status(code).json({
    error: detail,
    message: msg,
    status,
    options: null,
  });
});

module.exports = app;