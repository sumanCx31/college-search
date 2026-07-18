const facultySvc = require("./faculty.service");

class FacultyController {
  // Create Faculty
  createFaculty = async (req, res, next) => {
    try {
      const data = await facultySvc.transformFacultyCreate(req);

      const faculty = await facultySvc.storeFaculty(data);

      res.status(201).json({
        success: true,
        message: "Faculty created successfully",
        data: faculty,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Get All Faculties
  getAllFaculty = async (req, res, next) => {
    try {
      const faculties = await facultySvc.getAllFaculty();

      res.status(200).json({
        success: true,
        count: faculties.length,
        data: faculties,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Get Faculty By ID
  getFacultyById = async (req, res, next) => {
    try {
      const faculty = await facultySvc.getFacultyById(req.params.id);

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found",
        });
      }

      res.status(200).json({
        success: true,
        data: faculty,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Update Faculty
  updateFaculty = async (req, res, next) => {
    try {
      const data = req.body;

      if (req.file) {
        data.image = await facultySvc.uploadImage(req.file.path);
      }

      const faculty = await facultySvc.updateFaculty(
        req.params.id,
        data
      );

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Faculty updated successfully",
        data: faculty,
      });
    } catch (exception) {
      next(exception);
    }
  };

  // Delete Faculty
  deleteFaculty = async (req, res, next) => {
    try {
      const faculty = await facultySvc.deleteFaculty(req.params.id);

      if (!faculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Faculty deleted successfully",
      });
    } catch (exception) {
      next(exception);
    }
  };
}

module.exports = new FacultyController();