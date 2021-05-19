const express = require("express");
const morgan = require("morgan");
const env = require("dotenv").config({ path: "./configs/.env" });
const connectDB = require("./configs/connectDB");
const users = require("./routes/users");
const auth = require("./routes/auth");
const teachers = require("./routes/teachers");
const fileupload = require("express-fileupload");
const courses = require("./routes/courses");
const students = require("./routes/students");
const cloudinary = require("cloudinary").v2;
const path = require("path");
// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// create server

const app = express();
// connect database
connectDB();
// middle ware
app.use(express.json());
app.use(fileupload({ useTempFiles: true }));
app.use(morgan("dev"));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/teachers", teachers);
app.use("/api/courses", courses);
app.use("/api/students", students);
//
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
//start server
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);
// handle server error
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  server.close(() => process.exit(1));
});
