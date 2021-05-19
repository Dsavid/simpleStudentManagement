const mongoose = require("mongoose");
const TeacherSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    sex: {
      type: String,
      default: "male",
      enum: ["Male", "Female"],
    },
    age: {
      type: Number,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    photo: String,
    photo_id: String,
    phone: {
      type: String,
      match: [/^[0-9]+$/, "phone can only contains number"],
      required: true,
    },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email address",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
TeacherSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "teacher",
  justOne: false,
});
const covertName = (name) => {
  let first = name.charAt(0).toUpperCase();
  let nameToConvert = name;
  nameToConvert = nameToConvert.substring(1);
  nameToConvert = first + nameToConvert;
  return nameToConvert;
};
TeacherSchema.pre("save", function () {
  this.firstName = covertName(this.firstName);
  this.lastName = covertName(this.lastName);
  this.fullName = this.lastName + " " + this.firstName;
});
TeacherSchema.methods.covertNameBeforeUpdate = (firstName, lastName) => {
  firstName = covertName(firstName);
  lastName = covertName(lastName);
  const fullName = lastName + " " + firstName;
  return fullName;
};
module.exports = mongoose.model("Teacher", TeacherSchema);
