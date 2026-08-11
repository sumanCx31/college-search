const collegeModel = require("./college.model");
const collegeSvc = require("./college.service");

class CollegeController {

  // =====================================================
  // CREATE COLLEGE
  // =====================================================

  createCollege = async (req, res, next) => {
    try {
      const transformData =
        await collegeSvc.transformCollegeCreate(req);

      const collegeData =
        await collegeSvc.storeCollege(transformData);

      res.status(201).json({
        success: true,
        message: "College created successfully",
        data: collegeData,
      });

    } catch (exception) {
      next(exception);
    }
  };


  // =====================================================
  // GET ALL COLLEGES
  // =====================================================

  getAllColleges = async (req, res, next) => {
    try {

      const colleges =
        await collegeSvc.getAllBanner();

      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });

    } catch (exception) {
      next(exception);
    }
  };


  // =====================================================
  // GET COLLEGE BY ID
  // =====================================================

  getCollegeByCollegeId = async (req, res, next) => {
    try {

      const { id } = req.params;

      const college =
        await collegeSvc.getById(id);

      res.status(200).json({
        success: true,
        data: college,
      });

    } catch (exception) {
      next(exception);
    }
  };


  // =====================================================
  // GET COLLEGES BY COURSE ID
  // =====================================================

  getAllCollegesWithCourseId = async (req, res, next) => {
    try {

      const { courseId } = req.params;

      const colleges =
        await collegeSvc.getCollegesByCourseId(courseId);

      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });

    } catch (exception) {
      next(exception);
    }
  };


  // =====================================================
  // GET COLLEGES BY FACULTY
  // =====================================================

  getCollegesByFacultyId = async (req, res, next) => {
    try {

      const { faculty } = req.params;

      const colleges =
        await collegeSvc.getCollegesByFacultyId(faculty);

      res.status(200).json({
        success: true,
        count: colleges.length,
        data: colleges,
      });

    } catch (exception) {
      next(exception);
    }
  };


  // =====================================================
  // UPDATE COLLEGE
  // =====================================================

 updateCollege = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get information sent from form-data / JSON
    const data = {
      ...req.body,
    };

    // Convert JSON string fields when using form-data
    if (data.courses && typeof data.courses === "string") {
      data.courses = JSON.parse(data.courses);
    }

    if (data.facilities && typeof data.facilities === "string") {
      data.facilities = JSON.parse(data.facilities);
    }

    if (data.activities && typeof data.activities === "string") {
      data.activities = JSON.parse(data.activities);
    }

    if (data.contact && typeof data.contact === "string") {
      data.contact = JSON.parse(data.contact);
    }

    if (data.principal && typeof data.principal === "string") {
      data.principal = JSON.parse(data.principal);
    }

    if (data.hod && typeof data.hod === "string") {
      data.hod = JSON.parse(data.hod);
    }

    // Prevent image from being updated
    delete data.image;

    // Update college
    const updatedCollege = await collegeModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollege) {
      return res.status(404).json({
        success: false,
        message: "College not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "College information updated successfully",
      data: updatedCollege,
    });

  } catch (exception) {
    console.error("Update College Error:", exception);
    next(exception);
  }
};

  // =====================================================
  // DELETE COLLEGE
  // =====================================================

  deleteCollege = async (req, res, next) => {
    try {

      const { id } = req.params;

      await collegeSvc.deleteById(id);

      res.status(200).json({
        success: true,
        message: "College deleted successfully",
      });

    } catch (exception) {
      next(exception);
    }
  };

}


module.exports = new CollegeController();