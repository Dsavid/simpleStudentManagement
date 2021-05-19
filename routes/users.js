const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
// @desc create user
// @route POST /api/users
// @access PUBLIC
router.post(
  "/",
  [
    check("name", "please provide name").not().isEmpty(),
    check("email", "please provide a valid email address").isEmail(),
    check("password", "password must be atleast 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const user = await User.create(req.body);
      const token = user.getToken();
      res.status(200).json({ token });
    } catch (err) {
      console.log();
      if (err.name === "MongoError") {
        res.status(401).json({ msg: "user is already exist" });
      } else {
        res.status(500).send("server error");
      }
    }
  }
);
module.exports = router;
