const cloudinarySvc = require("../../services/cloudinary.service");
const collegeModel = require("./college.model");

class CollegeService {
transformCollegeCreate = async (req) => {
  try {
    let data = { ...req.body };

    // Convert string to array
    if (data.courses && typeof data.courses === "string") {
      data.courses = JSON.parse(data.courses);
    }

    // Convert activities if sending as JSON string
    if (data.activities && typeof data.activities === "string") {
      data.activities = JSON.parse(data.activities);
    }

    if (req.file && req.file.path) {
      data.image = await cloudinarySvc.fileUpload(
        req.file.path,
        "/college/"
      );
    }

    return data;
  } catch (exception) {
    throw exception;
  }
};

  storeCollege = async (data) => {
    try {
      const college = await collegeModel.create(data);
      return college;
    } catch (exception) {
      throw exception;
    }
  };

  getSingleRowById = async (id) => {
    try {
      const collegeData = await collegeModel.findOne({ _id: id });
      if (!collegeData) {
        throw {
          code: 404,
          message: "college not found with the provided id.",
          status: "NOT_FOUND",
        };
      }
      return collegeData;
    } catch (exception) {
      throw exception;
    }
  };

  getAllBanner = async () => {
    try {
      const collegeData = await collegeModel.find();
      return collegeData;
    } catch (exception) {
      throw exception;
    }
  };

  getById = async (id) => {
    try {
      const collegeData = await collegeModel.findOne({ _id: id });
      if (!collegeData) {
        throw {
          code: 404,
          message: "College not found with the provided id.",
          status: "NOT_FOUND",
        };
      }
      return collegeData;
    } catch (exception) {
      throw exception;
    }
  };

  deleteById = async (id) => {
    try {
      const data = await collegeModel.deleteOne({ _id: id });
      return data;
    } catch (exception) {
      throw exception;
    }
  };
}
const collegeSvc = new CollegeService();

module.exports = collegeSvc;
