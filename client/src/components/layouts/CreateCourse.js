import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import CourseContext from "../../context/course/CourseContext";
import DetailContext from "../../context/Detail/DetailContext";
import TeacherContext from "../../context/teacher/TeacherContext";
function CreateCourse({ isForm, setIsForm, title }) {
  // context
  const teacherContext = useContext(TeacherContext);
  const detailContext = useContext(DetailContext);
  const courseContext = useContext(CourseContext);
  const { current } = courseContext;
  const { teachers, loading } = teacherContext;
  const [data, setData] = useState({
    name: "",
    tuition: "5000",
    duration: "7:00am-10:00am",
    teacherId: "",
  });
  useEffect(() => {
    if (current) {
      setData(current);
    }
    teacherContext.getTeachers();
  }, [current]);
  // change data
  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };
  // create or update data
  const onSubmit = (e) => {
    e.preventDefault();
    // create course
    if (title === "Create Course") {
      courseContext.addCourse(data);
    } else {
      courseContext.updateCourseDetail(current._id, data);
    }
    setIsForm(false);
  };
  return (
    isForm &&
    !loading && (
      <div
        style={{ background: "rgba(0,0,0,0.3)" }}
        className="position-fixed d-flex align-items-center top-0
      left-0 w-100 h-100"
      >
        <Form
          onSubmit={onSubmit}
          style={{ overflow: "scroll" }}
          className="col-lg-4 h-50 bg-white p-3 mx-auto my-5 teacher-form"
        >
          <p
            onClick={() => setIsForm(false)}
            className="float-end d-inline btn btn-danger"
          >
            X
          </p>
          <h1>{title}</h1>
          <FormGroup className="my-2">
            <Label for="name">Course Name</Label>
            <Input
              value={data.name}
              onChange={onChange}
              required
              type="text"
              name="name"
              placeholder="test"
              className="my-2"
              required
            />
          </FormGroup>
          <FormGroup className="my-2">
            <Label required for="tuition">
              Tuition
            </Label>
            <InputGroup>
              <Input
                value={data.tuition}
                onChange={onChange}
                required
                type="number"
                name="tuition"
                placeholder="price"
                min="0"
                required
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>

          <FormGroup className="my-2">
            <Label for="duration">Select Duration</Label>

            <Input
              onChange={onChange}
              type="select"
              value={data.duration}
              name="duration"
            >
              <option value="7:00am-10:00am">7:00am-10:00am</option>
              <option value="10:30am-1:30pm">10:30am-1:30pm</option>
              <option value="2:00pm-5:00pm">2:00pm-5:00pm</option>
              <option value="5:30:pm-8:30pm">5:30:pm-8:30pm</option>
            </Input>
          </FormGroup>
          <FormGroup className="my-2">
            <Label for="teacherId">Select Teacher</Label>
            <Input required onChange={onChange} type="select" name="teacherId">
              <option
                value={
                  title === "Update Course" && current.teacher
                    ? current.teacher._id
                    : ""
                }
              >
                {title === "Update Course" && current.teacher
                  ? current.teacher.fullName
                  : "Select teacher"}
              </option>
              {teachers.map((teacher) => {
                if (current && current.teacher) {
                  if (current.teacher._id !== teacher._id) {
                    return (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.fullName}
                      </option>
                    );
                  }
                } else {
                  return (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.fullName}
                    </option>
                  );
                }
              })}
            </Input>
          </FormGroup>
          <Button className="form-control my-2">Submit</Button>
        </Form>
      </div>
    )
  );
}
export default CreateCourse;
