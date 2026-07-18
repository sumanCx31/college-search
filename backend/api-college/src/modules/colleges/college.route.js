const express = require("express");
const collegeRouter = express.Router();

const collegeController = require("./college.controller");

const validator = require("../../middlewares/request-validate.middleware");

const {
  createCollegeSchema,
  updateCollegeSchema,
} = require("./college.validator");
const uploader = require("../../middlewares/uploader.middleware");

collegeRouter.post(
  "/",
//   validator(createCollegeSchema),
  uploader().single("image"),
  collegeController.createCollege
);
collegeRouter.get("/", collegeController.getAllColleges);

collegeRouter.get("/:id", collegeController.getCollegeByCollegeId);

collegeRouter.get(
  "/faculty/:faculty",
  collegeController.getCollegesByFacultyId
);

// collegeRouter.put(
//   "/:id",
//   validator(updateCollegeSchema),
//   collegeController.updateCollege
// );
// collegeRouter.delete("/:id", collegeController.deleteCollege);

module.exports = collegeRouter;