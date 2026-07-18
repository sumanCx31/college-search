const facultyRouter = require("express").Router();

const uploader = require("../../middlewares/uploader.middleware");
const facultyController = require("./faculty.controller");

// Create Faculty
facultyRouter.post(
  "/",
  uploader().single("image"),
  facultyController.createFaculty
);

// Get All Faculties
facultyRouter.get("/", facultyController.getAllFaculty);

// Get Faculty By ID
facultyRouter.get("/:id", facultyController.getFacultyById);

// Update Faculty
facultyRouter.put(
  "/:id",
  uploader().single("image"),
//   validator(updateFacultySchema),
  facultyController.updateFaculty
);

// Delete Faculty
facultyRouter.delete("/:id", facultyController.deleteFaculty);

module.exports = facultyRouter;