const facultyModel = require("./faculty.model");
const cloudinarySvc = require("../../services/cloudinary.service");

class FacultyService {
  // Transform Data Before Saving
  transformFacultyCreate = async (req) => {
    try {
      let data = req.body;

      if (req.file && req.file.path) {
        data.image = await cloudinarySvc.fileUpload(
          req.file.path,
          "/faculty/"
        );
      } else {
        data.image = null;
      }

      return data;
    } catch (exception) {
      throw exception;
    }
  };

  // Upload Image (Used in Update)
  uploadImage = async (path) => {
    try {
      return await cloudinarySvc.fileUpload(path, "/faculty/");
    } catch (exception) {
      throw exception;
    }
  };

  // Create Faculty
  storeFaculty = async (data) => {
    try {
      return await facultyModel.create(data);
    } catch (exception) {
      throw exception;
    }
  };

  // Get All Faculties
  getAllFaculty = async () => {
    try {
      return await facultyModel.find().sort({ createdAt: -1 });
    } catch (exception) {
      throw exception;
    }
  };

  // Get Faculty By ID
  getFacultyById = async (id) => {
    try {
      return await facultyModel.findById(id);
    } catch (exception) {
      throw exception;
    }
  };

  // Update Faculty
  updateFaculty = async (id, data) => {
    try {
      return await facultyModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
    } catch (exception) {
      throw exception;
    }
  };

  // Delete Faculty
  deleteFaculty = async (id) => {
    try {
      return await facultyModel.findByIdAndDelete(id);
    } catch (exception) {
      throw exception;
    }
  };
}

const facultySvc = new FacultyService();

module.exports = facultySvc;