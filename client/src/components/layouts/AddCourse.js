import React, { useContext, useEffect, useState } from "react";
import { Form, Input, Button } from "reactstrap";
import CourseContext from "../../context/course/CourseContext";
import AlertContext from "../../context/alert/AlertContext";
import DetailContext from "../../context/Detail/DetailContext";
function AddCourse({ isForm, setIsForm, title }) {
  // component for add or remove course for student
  // context
  const detailContext = useContext(DetailContext);
  const courseContext = useContext(CourseContext);
  const alertContext = useContext(AlertContext);
  const { courses, loading } = courseContext;
  const { detail } = detailContext;
  useEffect(() => {
    courseContext.getCourses();
  }, []);
  // user select course for student to add or remove
  const [courseSelect, setCourseSelect] = useState("");
  // add course for student
  const addCourse = () => {
    if (courseSelect === "") {
      alertContext.addAlert({
        msg: "please Select Course to add",
        color: "bg-danger",
      });
    } else {
      detailContext.addCourseForStudent(detail._id, courseSelect);
    }
  };
  //  remove course for student
  const removeCourse = () => {
    if (courseSelect === "") {
      alertContext.addAlert({
        msg: "please Select Course to remove",
        color: "bg-danger",
      });
    } else {
      //remove course
      detailContext.removeCourseForStudent(detail._id, courseSelect);
    }
  };
  return (
    isForm && (
      <div
        style={{ background: "rgba(0,0,0,0.3)" }}
        className="position-fixed d-flex align-items-center top-0
      left-0 w-100 h-100"
      >
        <Form
          style={{ overflow: "scroll" }}
          className="col-lg-4  bg-white p-3 mx-auto my-5 teacher-form"
        >
          <p
            onClick={() => setIsForm(false)}
            className="float-end d-inline btn btn-danger"
          >
            X
          </p>
          <h1>{title}</h1>
          <Input
            required
            onChange={(e) => setCourseSelect(e.target.value)}
            value={courseSelect}
            className="my-3"
            type="select"
            name="course"
          >
            <option>
              {courses.length == 0
                ? "No course to add"
                : "Please Select course"}
            </option>
            {/* loading option to select or remove course for student */}
            {!loading && title === "Add course for Student"
              ? courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))
              : detail.courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
          </Input>
          <Button
            onClick={() => {
              if (title === "Add course for Student") {
                addCourse();
              } else {
                removeCourse();
              }
              setIsForm(false);
            }}
            className={`form-control my-3 ${
              title === "Add course for Student" ? "bg-success" : "bg-danger"
            }`}
          >
            {title}
          </Button>
        </Form>
      </div>
    )
  );
}
export default AddCourse;
