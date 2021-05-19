const express = require("express");
const router = express.Router();
const protect = require("../middlewares/protect");
const Teacher = require("../models/Teacher");
const { check, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const courses = require("./courses");
router.use("/:teacherId/courses", courses);
// @desc create teacher
// @route POST /api/teachers
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
      const teacher = await Teacher.create(req.body);
      res.status(200).json({ teacher });
    } catch (err) {
      if (err.name === "ValidationError") {
        res
          .status(400)
          .send({ msg: Object.values(err.errors).map((val) => val.message) });
      } else {
        res.status(500).send("server error");
      }
    }
  }
);
// @desc get teachers
// @routes GET /api/teachers
router.get("/", protect, async (req, res) => {
  try {
    const teachers = await Teacher.find({ user: req.user.id }).populate({
      path: "courses",
      populate: {
        path: "teacher",
        select: "fullName",
      },
    });

    res.status(200).json({ count: teachers.length, teachers });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc get teacher by id
// @routes GET /api/teachers/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate({
      path: "courses",
      populate: {
        path: "teacher",
        select: "fullName",
      },
    });
    if (teacher.user.toString() !== req.user.id || !teacher) {
      return res
        .status(404)
        .json({ msg: `cant find teacher with the id of ${req.params.id}` });
    }
    res.status(200).json({ teacher });
  } catch (err) {
    res.status(500).send("server error");
  }
});

// @desc update teacher by id
// @route PUT /api/teachers/:id
router.put("/:id", protect, async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (teacher.user.toString() !== req.user.id || !teacher) {
      return res
        .status(404)
        .json({ msg: `cant find teacher with the id of ${req.params.id}` });
    }
    req.body.fullName = teacher.covertNameBeforeUpdate(
      req.body.firstName,
      req.body.lastName
    );
    teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("courses");
    res.status(200).json({ teacher });
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
// @desc delete teacher by id
// @route DELETE /api/teachers/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (teacher.user.toString() !== req.user.id || !teacher) {
      return res
        .status(404)
        .json({ msg: `cant find teacher with the id of ${req.params.id}` });
    }
    if (teacher.photo) {
      cloudinary.uploader.destroy(teacher.photo_id, function (result) {});
    }
    await teacher.remove();
    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).send("server error");
  }
});
// @desc upload photo for teacher by id
// @route POST /api/teachers/:id/photo
router.post("/:id/photo", protect, async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (teacher.user.toString() !== req.user.id || !teacher) {
      return res
        .status(404)
        .json({ msg: `cant find teacher with the id of ${req.params.id}` });
    }
    if (!req.files) {
      return res.status(400).json({ msg: `please upload a file` });
    }
    const file = req.files["file"];
    if (!file.mimetype.startsWith("image")) {
      return res.status(400).json({ msg: `please upload an image` });
    }
    if (teacher.photo) {
      cloudinary.uploader.destroy(teacher.photo_id, function (result) {});
    }
    cloudinary.uploader.upload(
      file.tempFilePath,
      async function (error, result) {
        if (error) {
          return res.status(500).send(error);
        }
        teacher = await Teacher.findByIdAndUpdate(
          req.params.id,
          { photo: result.url, photo_id: result.public_id },
          { new: true }
        ).populate("courses");
        res.status(200).json({ teacher });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
});
module.exports = router;
