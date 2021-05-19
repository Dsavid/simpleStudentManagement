import React, { useContext, useEffect } from "react";
import {
  CardBody,
  CardText,
  Container,
  Card,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import TeacherContext from "../../context/teacher/TeacherContext";
import StudentContext from "../../context/student/StudentContext";
import CourseContext from "../../context/course/CourseContext";
import BarChart from "../layouts/BarChart";
function Dasboard() {
  // context
  const teacherContext = useContext(TeacherContext);
  const studentContext = useContext(StudentContext);
  const courseContext = useContext(CourseContext);
  const { teachers, loading } = teacherContext;
  const { students, studentLoading } = studentContext;
  const { courses, courseLoading } = courseContext;
  useEffect(() => {
    teacherContext.getTeachers();
    studentContext.getStudents();
    courseContext.getCourses();
  }, []);
  return (
    <div>
      <div className="bg-warning py-2">
        <Container>
          <h1 className="fw-bold text-white">Dash Board</h1>
        </Container>
      </div>
      <Container>
        <Row>
          <Col md>
            <Card className="text-center my-3">
              <CardBody>
                <CardText className="fw-bold display-6">
                  <i className="fas fa-user-graduate me-3"></i>Students
                </CardText>
                <CardText className="">
                  {!studentLoading && students.length}
                </CardText>
                <Link to="/students">
                  <Button>Detail</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col md>
            <Card className="text-center my-3">
              <CardBody>
                <CardText className="fw-bold display-6">
                  <i className="fas fa-chalkboard-teacher me-3"></i>Teachers
                </CardText>
                <CardText className="">{!loading && teachers.length}</CardText>
                <Link to="/teachers">
                  <Button>Detail</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
          <Col md>
            <Card className="text-center my-3">
              <CardBody>
                <CardText className="fw-bold display-6">
                  <i className="fas fa-university me-3"></i>Courses
                </CardText>
                <CardText className="">
                  {!courseLoading && courses.length}
                </CardText>
                <Link to="/courses">
                  <Button>Detail</Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {!loading && !courseLoading && !studentLoading && (
          <BarChart
            students={students.length}
            teachers={teachers.length}
            courses={courses.length}
          />
        )}
      </Container>
    </div>
  );
}
export default Dasboard;
