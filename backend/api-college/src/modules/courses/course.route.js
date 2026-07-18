const courseRouter = require("express").Router();

const courseController = require("./course.controller");

courseRouter.post(
  "/",
//   validator(createCourseSchema),
  courseController.createCourse
);

courseRouter.get("/", courseController.getAllCourses);

courseRouter.get("/:id", courseController.getCourseById);

courseRouter.get(
  "/faculty/:facultyId",
  courseController.getCoursesByFaculty
);

courseRouter.put(
  "/:id",
//   validator(updateCourseSchema),
  courseController.updateCourse
);

courseRouter.delete("/:id", courseController.deleteCourse);

module.exports = courseRouter;