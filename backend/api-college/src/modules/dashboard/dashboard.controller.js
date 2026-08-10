const collegeModel = require("../colleges/college.model");
const courseModel = require("../courses/course.model");
const facultyModel = require("../faculty/faculty.model");
const messageModel = require("../message/message.model");
const UserModel = require("../user/user.model");

class DashboardController {
  async getDashboardStats(req, res, next) {
    try {
        const totalColleges = await collegeModel.countDocuments();
        const totalCourses = await courseModel.countDocuments();
        const totalFaculties = await facultyModel.countDocuments();
        const totalMessages = await messageModel.countDocuments();
        res.status(200).json({
            totalColleges,
            totalCourses,
            totalFaculties,
            totalMessages
        });
    } catch (exception) {
        next(exception);
    }
}
async getAllUsers(req, res, next) {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (exception) {
        next(exception);
    }
}
}

const dashboardController = new DashboardController();
module.exports = dashboardController;