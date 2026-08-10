const College = require("./college.model");
const collegeSvc = require("./college.service");

class CollegeController {
  // Create College
  createCollege = async (req, res, next) => {
    try {
        
      const transformData = await collegeSvc.transformCollegeCreate(req);
      const collegeData = await collegeSvc.storeCollege(transformData);

      res.status(201).json({
        success: true,
        message: "College created successfully",
        data: collegeData,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Get All Colleges
  getAllColleges = async (req, res, next) => {
    try {
      const colleges = await College.find();

      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Get College By ID
  getCollegeByCollegeId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const college = await College.findById(id);

      if (!college) {
        return res.status(404).json({
          success: false,
          message: "College not found",
        });
      }

      res.status(200).json({
        success: true,
        data: college,
      });
    } catch (exception) {
      next(exception);
    }
  };

getAllCollegesWithCourseId = async (req, res, next) => {
    try {
      const { courseId } = req.params;
      
      // Query using 'courses.course' because courses is an array of subdocuments
      const colleges = await College.find({ "courses.course": courseId });
      
      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Get Colleges By Faculty
  getCollegesByFacultyId = async (req, res, next) => {
    try {
      const { faculty } = req.params;

      const colleges = await College.find({
        faculty: faculty,
      });

      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new CollegeController();