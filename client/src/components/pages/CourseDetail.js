import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CardText, Col, Container, Row, Card, Button } from "reactstrap";
import Spinner from "../../img/spinner.gif";
import CourseContext from "../../context/course/CourseContext";
import profile from "../../img/profile.png";
import TablePart from "../layouts/TablePart";
import CreateCourse from "../layouts/CreateCourse";
function CourseDetail() {
  //state
  const [isForm, setIsForm] = useState(false);

  // context
  const courseContext = useContext(CourseContext);
  const { courseDetail, loading } = courseContext;
  const history = useHistory();
  const paths = history.location.pathname.split("/");

  useEffect(() => {
    courseContext.getCourseDetail(paths[2]);
  }, []);

  return !loading && courseDetail ? (
    <div>
      <div className="bg-warning py-2">
        <Container className="d-flex align-items-center justify-content-between">
          <h1 className="fw-bold text-white">Course Detail</h1>
          <Button
            onClick={() => {
              history.push(`/courses`);
            }}
          >
            Back
          </Button>
        </Container>
      </div>
      <Container>
        <Row>
          <Col lg>
            <Card className="p-3 my-3">
              <CardText>Name : {courseDetail.name}</CardText>
              <CardText>Duration : {courseDetail.duration}</CardText>
              <CardText>Tuition : {courseDetail.tuition} $</CardText>
              <div>
                <Button
                  onClick={() => {
                    setIsForm(true);
                    courseContext.addCurrent();
                  }}
                  className="bg-success border-0 me-3"
                >
                  Update
                </Button>
                <Button
                  onClick={() => {
                    courseContext.removeCourse(courseDetail._id);
                    history.push("/courses");
                  }}
                  className="bg-danger border-0"
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
          {/* teacher part */}
          <Col lg>
            {courseDetail.teacher && (
              <Card className="p-3 my-3">
                <h1>Teacher</h1>
                <Row>
                  <Col>
                    <img
                      style={{ height: "300px", width: "300px" }}
                      src={
                        courseDetail.teacher.photo
                          ? courseDetail.teacher.photo
                          : profile
                      }
                      alt="teacher photo"
                    />
                  </Col>
                  <Col>
                    <p>Name : {courseDetail.teacher.fullName}</p>
                    <p>Sex : {courseDetail.teacher.sex} </p>
                    <p>Phone : {courseDetail.teacher.phone} </p>
                  </Col>
                </Row>
              </Card>
            )}
          </Col>
          {courseDetail.students.length > 0 && (
            <React.Fragment>
              <h1>Students</h1>
              <TablePart fields={courseDetail.students} fieldTitle="students" />
            </React.Fragment>
          )}
        </Row>
      </Container>
      <CreateCourse
        setIsForm={setIsForm}
        title="Update Course"
        isForm={isForm}
      />
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <img src={Spinner} alt="loading" />
    </div>
  );
}

export default CourseDetail;
