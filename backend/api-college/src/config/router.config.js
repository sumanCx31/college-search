const router = require("express").Router()
const authRouter = require("../modules/auth/auth.router");
const collegeRouter = require("../modules/colleges/college.route");
const courseRouter = require("../modules/courses/course.route");
const facultyRouter = require("../modules/faculty/faculty.route");
router.get("/", (req, res, next) => {
    res.json({
        data: "Welcome to College Finding Application",
        message: "This is a REST API for College Finding Application",
        status: "Success",
        options: null
    })
})

router.use("/auth", authRouter);
router.use("/college", collegeRouter);
router.use("/course", courseRouter);
router.use("/faculty", facultyRouter);

module.exports = router;
