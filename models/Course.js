const mongoose = require("mongoose");
const CourseSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    teacher: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Teacher",
    },
    duration: {
      type: String,
    },
    tuition: {
      type: Number,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CourseSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "courses",
  justOne: false,
});
module.exports = mongoose.model("Course", CourseSchema);
