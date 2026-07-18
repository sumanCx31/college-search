const courseSvc = require("./course.service");

class CourseController {
  createCourse = async (req, res, next) => {
    try {
      const course = await courseSvc.store(req.body);

      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course,
      });
    } catch (err) {
      next(err);
    }
  };

  getAllCourses = async (req, res, next) => {
    try {
      const data = await courseSvc.getAll();

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCourseById = async (req, res, next) => {
    try {
      const data = await courseSvc.getById(req.params.id);

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  getCoursesByFaculty = async (req, res, next) => {
    try {
      const data = await courseSvc.getByFaculty(
        req.params.facultyId
      );

      res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  updateCourse = async (req, res, next) => {
    try {
      const data = await courseSvc.update(
        req.params.id,
        req.body
      );

      res.json({
        success: true,
        message: "Course updated successfully",
        data,
      });
    } catch (err) {
      next(err);
    }
  };

  deleteCourse = async (req, res, next) => {
    try {
      await courseSvc.delete(req.params.id);

      res.json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = new CourseController();