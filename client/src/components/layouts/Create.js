import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import DetailContext from "../../context/Detail/DetailContext";
import StudentContext from "../../context/student/StudentContext";
import TeacherContext from "../../context/teacher/TeacherContext";
function Create({ isForm, setIsForm, title }) {
  // context
  const teacherContext = useContext(TeacherContext);
  const detailContext = useContext(DetailContext);
  const studentContext = useContext(StudentContext);
  const { current } = detailContext;
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    sex: "Male",
    age: 18,
    phone: "",
    email: "",
    file: null,
  });
  useEffect(() => {
    if (current) {
      setData(current);
    }
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
    if (title === "Create Teacher") {
      teacherContext.addTeacher(data);
    } else if (title === "Update Teacher") {
      detailContext.updateDetail(data, "teachers", current.id);
    } else if (title === "Create Student") {
      studentContext.addStudent(data);
    } else {
      detailContext.updateDetail(data, "students", current._id);
    }
    setIsForm(false);
  };
  return (
    isForm && (
      <div
        style={{ background: "rgba(0,0,0,0.3)" }}
        className="position-fixed d-flex align-items-center top-0
      left-0 w-100 h-100"
      >
        <Form
          onSubmit={onSubmit}
          style={{ overflow: "scroll" }}
          className="col-lg-4 h-75 bg-white p-3 mx-auto my-5 teacher-form"
        >
          <p
            onClick={() => setIsForm(false)}
            className="float-end d-inline btn btn-danger"
          >
            X
          </p>
          <h1>{title}</h1>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              value={data.firstName}
              onChange={onChange}
              required
              type="text"
              name="firstName"
              placeholder="test"
              className="my-2"
            />
          </FormGroup>
          <FormGroup>
            <Label required for="lastName">
              Last Name
            </Label>
            <Input
              value={data.lastName}
              onChange={onChange}
              required
              className="my-2"
              type="text"
              name="lastName"
              placeholder="test"
            />
          </FormGroup>
          {/* sex */}
          <FormGroup tag="fieldset">
            <legend>Sex</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  onChange={onChange}
                  name="sex"
                  value="Male"
                  checked={data.sex == "Male" && true}
                />
                Male
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  onChange={onChange}
                  value="Female"
                  name="sex"
                  checked={data.sex == "Female" && true}
                />
                Female
              </Label>
            </FormGroup>
          </FormGroup>

          {/* age */}
          <FormGroup>
            <legend>Age</legend>
            <Input
              onChange={onChange}
              value={data.age}
              className="my-2"
              type="number"
              name="age"
              placeholder="Age"
              min="1"
              max="100"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone</Label>
            <Input
              onChange={onChange}
              value={data.phone}
              className="my-2"
              type="text"
              name="phone"
              placeholder="Phone Number"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label required for="email">
              Email
            </Label>
            <Input
              onChange={onChange}
              value={data?.email}
              className="my-2"
              type="email"
              name="email"
              placeholder="test@gmail.com"
            />
          </FormGroup>
          {/* photo */}
          <FormGroup className="my-3">
            <Label for="exampleFile">Photo</Label>
            <Input
              type="file"
              name="file"
              onChange={onChange}
              id="exampleFile"
            />
          </FormGroup>
          <Button className="form-control my-2">Submit</Button>
        </Form>
      </div>
    )
  );
}

export default Create;
