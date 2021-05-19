const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return res.status(400).json({ msg: "token required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send("server error");
  }
};
module.exports = protect;
