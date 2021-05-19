const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const protect = require("../middlewares/protect");
// @desc login user
// @route POST /api/auth/login
// @access PRIVATE
router.post(
  "/login",
  [
    check("email", "please provide a valid email").isEmail(),
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
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ msg: "cant find user" });
      }
      const isCorrectPassword = await user.comparePassword(req.body.password);
      if (!isCorrectPassword) {
        return res.status(401).json({ msg: "invalid email or password" });
      }
      const token = await user.getToken();
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).send("server error");
    }
  }
);
// @desc get user
// @route GET /api/auth/me
// @access PRIVATE
router.get("/me", protect, async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).send("server errorr");
  }
});
module.exports = router;
