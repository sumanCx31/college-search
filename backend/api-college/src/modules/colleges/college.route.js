const express = require("express");
const collegeRouter = express.Router();

const collegeController = require("./college.controller");

const validator = require("../../middlewares/request-validate.middleware");

const {
  createCollegeSchema,
  updateCollegeSchema,
} = require("./college.validator");

const uploader = require("../../middlewares/uploader.middleware");


// =====================================================
// CREATE COLLEGE
// =====================================================

collegeRouter.post(
  "/",
  // validator(createCollegeSchema),
  uploader("image").single("image"),
  collegeController.createCollege
);


// =====================================================
// GET ALL COLLEGES
// =====================================================

collegeRouter.get(
  "/",
  collegeController.getAllColleges
);


// =====================================================
// GET COLLEGES BY COURSE
// IMPORTANT: Keep this BEFORE /:id
// =====================================================

collegeRouter.get(
  "/all-colleges/:courseId",
  collegeController.getAllCollegesWithCourseId
);


// =====================================================
// GET COLLEGES BY FACULTY
// =====================================================

collegeRouter.get(
  "/faculty/:faculty",
  collegeController.getCollegesByFacultyId
);


// =====================================================
// GET SINGLE COLLEGE BY ID
// =====================================================

collegeRouter.get(
  "/:id",
  collegeController.getCollegeByCollegeId
);


// =====================================================
// UPDATE COLLEGE
// =====================================================

collegeRouter.put(
  "/:id",
  // validator(updateCollegeSchema),
  collegeController.updateCollege
);


// =====================================================
// DELETE COLLEGE
// =====================================================

collegeRouter.delete(
  "/:id",
  collegeController.deleteCollege
);


module.exports = collegeRouter;