const express = require("express");
const protect = require("../middlewares/protect");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student");
const cloudinary = require("cloudinary").v2;

// @desc create student
// @route POST /api/students
router.post(
  "/",
  protect,
  [
    check("firstName", "firstName cannot contains more than 20 characters")
      .isLength({ max: 20 })
      .notEmpty(),
    check("lastName", "lastName cannot contains more than 20 characters")
      .isLength({ max: 20 })
      .notEmpty(),
    check("age", "age must be a number between 1-100")
      .isInt({
        min: 1,
        max: 100,
      })
      .notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      req.body.user = req.user.id;
      let student = await Student.create(req.body);
      student = await student.populate("courses").execPopulate();
      res.status(200).json({ student });
    } catch (err) {
      if (err.name === "ValidationError") {
        res.status(400).send({
          msg: Object.values(err.errors).map((val) => val.message),
        });
      } else {
        console.log(err);
        res.status(500).send("server error");
      }
    }
  }
);
// @desc get students
// @route GET /api/students
router.get("/", protect, async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id }).populate(
      "courses"
    );
    res.status(200).json({ count: students.length, students });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc get student by id
// @routes GET /api/students/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate({
      path: "courses",
      populate: {
        path: "teacher",
        select: "fullName",
      },
    });
    if (student.user.toString() !== req.user.id || !student) {
      return res
        .status(404)
        .json({ msg: `cant find student with the id of ${req.params.id}` });
    }
    res.status(200).json({ student });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc update student by id
// @route PUT /api/students/:id
router.put("/:id", protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student.user.toString() !== req.user.id || !student) {
      return res
        .status(404)
        .json({ msg: `cant find student with the id of ${req.params.id}` });
    }
    req.body.fullName = student.covertNameBeforeUpdate(
      req.body.firstName,
      req.body.lastName
    );
    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("courses");
    res.status(200).json({ student });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({
        msg: Object.values(err.errors).map((val) => val.message),
      });
    } else {
      res.status(500).send("server error");
    }
  }
});

//
// @desc add course for student by id
// @route PUT /api/students/:id
router.put("/:id/addCourse", protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student.user.toString() !== req.user.id || !student) {
      return res
        .status(404)
        .json({ msg: `cant find student with the id of ${req.params.id}` });
    }
    student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          courses: req.body.courseId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "courses",
      populate: {
        path: "teacher",
        select: "fullName",
      },
    });
    res.status(200).json({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// @desc remove course for student by id
// @route PUT /api/students/:id
router.put("/:id/removeCourse", protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student.user.toString() !== req.user.id || !student) {
      return res
        .status(404)
        .json({ msg: `cant find student with the id of ${req.params.id}` });
    }
    student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          courses: req.body.courseId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate({
      path: "courses",
      populate: {
        path: "teacher",
        select: "fullName",
      },
    });
    res.status(200).json({ student });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
// @desc delete student by id
// @route DELETE /api/students/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student.user.toString() !== req.user.id || !student) {
      return res
        .status(404)
        .json({ msg: `cant find student with the id of ${req.params.id}` });
    }
    if (student.photo) {
      cloudinary.uploader.destroy(student.photo_id, function (result) {});
    }
    await student.remove();
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc upload photo for student
// @acess POST /api/students/:id/photo
router.post("/:id/photo", protect, async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student.user.toString() !== req.user.id || !student) {
      return res.status(404).json({
        msg: `cant find student with the id of ${req.params.id}`,
      });
    }
    if (!req.files) {
      return res.status(400).json({
        msg: `please upload a file `,
      });
    }
    const file = req.files["file"];
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({
        msg: `please upload an image`,
      });
    }
    if (student.photo) {
      cloudinary.uploader.destroy(student.photo_id, function (result) {});
    }
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (error) {
        return res.status(500).send("problem uploading file");
      }
      student = await Student.findByIdAndUpdate(
        req.params.id,
        { photo: result.url, photo_id: result.public_id },
        { new: true }
      ).populate("courses");
      res.status(200).json({ student });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
module.exports = router;
