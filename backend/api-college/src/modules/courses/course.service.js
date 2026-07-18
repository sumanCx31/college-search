const Course = require("./course.model");

class CourseService {
  store = async (data) => {
    return await Course.create(data);
  };

  getAll = async () => {
    return await Course.find().populate("faculty");
  };

  getById = async (id) => {
    return await Course.findById(id).populate("faculty");
  };

  getByFaculty = async (facultyId) => {
    return await Course.find({
      faculty: facultyId,
    });
  };

  update = async (id, data) => {
    return await Course.findByIdAndUpdate(id, data, {
      new: true,
    });
  };

  delete = async (id) => {
    return await Course.findByIdAndDelete(id);
  };
}

module.exports = new CourseService();