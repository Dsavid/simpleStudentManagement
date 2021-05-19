import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
  CardText,
  Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import DetailContext from "../../context/Detail/DetailContext";
import profile from "../../img/profile.png";
import TeacherContext from "../../context/teacher/TeacherContext";
import Create from "../layouts/Create";
import Spinner from "../../img/spinner.gif";
import StudentContext from "../../context/student/StudentContext";
import CourseTable from "../layouts/CourseTable";
import AddCourse from "../layouts/AddCourse";
function FieldDetail() {
  // state
  const [isForm, setIsForm] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  // state  title for add course or remove for student
  const [title, setTitle] = useState("Add course for Student");
  // context
  const detailContext = useContext(DetailContext);
  const teacherContext = useContext(TeacherContext);
  const studentContext = useContext(StudentContext);
  const history = useHistory();
  const paths = history.location.pathname.split("/");
  const { detail, loading } = detailContext;

  const onDelete = () => {
    if (paths[1] === "teachers") {
      teacherContext.removeTeacher(detail.id);
    } else {
      // delete student
      studentContext.removeStudent(detail._id);
    }
    // clear loading
    detailContext.clearLoading();
    history.push(`/${paths[1]}`);
  };
  // get Detail when detail page load
  useEffect(() => {
    detailContext.addDetail(paths[1], paths[2]);
  }, []);
  return (
    <div>
      {!loading ? (
        <React.Fragment>
          <div className="bg-warning py-2">
            <Container className="d-flex align-items-center justify-content-between">
              <h1 className="fw-bold text-white">
                {paths[1] === "teachers"
                  ? `Teacher : ${detail.firstName} `
                  : `Student : ${detail.firstName}`}
              </h1>
              <Button
                onClick={() => {
                  detailContext.clearLoading();
                  detailContext.removeCurrent();
                  history.push(`/${paths[1]}`);
                }}
              >
                Back
              </Button>
            </Container>
          </div>
          <Container className="my-3">
            <Row>
              <Col lg>
                <Card>
                  <CardBody>
                    <CardText>Full Name : {detail.fullName}</CardText>
                    <CardText>First Name : {detail.firstName}</CardText>
                    <CardText>Last Name : {detail.lastName}</CardText>
                    <CardText>Sex : {detail.sex}</CardText>
                    <CardText>Age : {detail.age}</CardText>
                    <CardText>Phone : {detail.phone}</CardText>
                    <CardText>
                      Email : {detail.email ? detail.email : "none"}
                    </CardText>
                    <Button
                      onClick={() => {
                        setIsForm(true);
                        detailContext.addCurrent();
                      }}
                      className="bg-success border-0 me-3"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={onDelete}
                      className="bg-danger border-0 me-3"
                    >
                      Delete
                    </Button>
                    {paths[1] === "students" && (
                      <Button
                        onClick={() => {
                          setIsAdd(true);
                          setTitle("Add course for Student");
                        }}
                        className="bg-warning border-0 me-3"
                      >
                        Add Course
                      </Button>
                    )}
                    {paths[1] === "students" && (
                      <Button
                        onClick={() => {
                          setIsAdd(true);
                          setTitle("Remove course for Student");
                        }}
                        className="bg-danger border-0 my-3"
                      >
                        Remove Course
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Col lg>
                <Card className="h-100">
                  <CardBody className="d-flex justify-content-center">
                    <img
                      style={{ height: "300px", width: "300px" }}
                      src={detail.photo ? detail.photo : profile}
                      alt="photo"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
            {detail.courses.length > 0 && (
              <React.Fragment>
                <h1 className="my-2">Attend Courses</h1>
                <CourseTable fields={detail.courses} />
              </React.Fragment>
            )}
          </Container>
          {/* update teacher or student but using create form  */}
          <Create
            isForm={isForm}
            setIsForm={setIsForm}
            title={
              paths[1] === "teachers" ? "Update Teacher" : "Update Student"
            }
          />
          {/* add course or remove course for student */}
          <AddCourse isForm={isAdd} title={title} setIsForm={setIsAdd} />
        </React.Fragment>
      ) : (
        <div className=" d-flex align-items-center">
          <img className="mx-auto " src={Spinner} alt="loading" />
        </div>
      )}
    </div>
  );
}
export default FieldDetail;
