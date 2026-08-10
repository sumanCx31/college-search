const courseRouter = require("express").Router();

const uploader = require("../../middlewares/uploader.middleware");
const courseController = require("./course.controller");

courseRouter.post(
  "/",
  uploader().single("image"),
  courseController.createCourse
);
courseRouter.get("/", courseController.getAllCourses);

courseRouter.get("/:id", courseController.getCourseById);

courseRouter.get("/faculty/:facultyId", courseController.getCoursesByFaculty);

courseRouter.put(
  "/:id",
  //   validator(updateCourseSchema),
  courseController.updateCourse,
);

courseRouter.delete("/:id", courseController.deleteCourse);

module.exports = courseRouter;
