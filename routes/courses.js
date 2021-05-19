const express = require("express");
const protect = require("../middlewares/protect");
const router = express.Router({ mergeParams: true });
const { check, validationResult } = require("express-validator");
const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
// @des create course
// @route POST /api/teachers/:teacherId/courses
router.post(
  "/",
  protect,
  [
    check("name", "name require").notEmpty(),
    check("duration", "duration require").notEmpty(),
    check("tuition", "tuition require").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      const teacher = await Teacher.findOne({
        user: req.user.id,
        _id: req.params.teacherId,
      });
      if (!teacher) {
        return res.status(404).json({
          msg: `can't find teacher with the id of ${req.params.teacherId}`,
        });
      }
      req.body.teacher = req.params.teacherId;
      req.body.user = req.user.id;
      let course = await Course.create(req.body);
      course = await course.populate("teacher").execPopulate();
      res.status(200).json({ course });
    } catch (err) {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .json({ msg: Object.values(err.errors).map((val) => val.message) });
      }
      res.status(500).send("server error");
    }
  }
);
// @des get courses
// @route GET /api/courses
router.get("/", protect, async (req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).populate(
      "teacher"
    );
    res.status(200).json({ count: courses.length, courses });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc get course by id
// @route GET /api/courses/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("teacher")
      .populate("students");
    if (course.user.toString() !== req.user.id || !course) {
      return res
        .status(404)
        .json({ msg: `cant find course with the id of ${req.params.id}` });
    }
    res.status(200).json({ course });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});

// @desc update course
// @route /api/courses/:id
router.put("/:id", protect, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (course.user.toString() !== req.user.id || !course) {
      return res
        .status(404)
        .json({ msg: `cant find course with the id of ${req.params.id}` });
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("teacher")
      .populate("students");
    res.status(200).json({ course });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc delete course
// @route DELETE /api/courses/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);
    if (course.user.toString() !== req.user.id || !course) {
      return res
        .status(404)
        .json({ msg: `cant find course with the id of ${req.params.id}` });
    }
    await course.remove();
    res.status(200).json({ msg: "success deleting user" });
  } catch (err) {
    res.status(500).send("server error");
  }
});
module.exports = router;
