import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Input, Button } from "reactstrap";
import CourseContext from "../../context/course/CourseContext";
import TeacherContext from "../../context/teacher/TeacherContext";
import CreateCourse from "../layouts/CreateCourse";
import TablePart from "../layouts/TablePart";
function Courses() {
  // context
  const courseContext = useContext(CourseContext);
  const teacherContext = useContext(TeacherContext);
  const { courses, loading, filter } = courseContext;
  // state
  const [isForm, setIsForm] = useState(false);
  const onChange = (e) => {
    if (e.target.value === "") {
      courseContext.removeFilter();
    } else {
      courseContext.addFilter(e.target.value);
    }
  };
  useEffect(() => {
    courseContext.getCourses();
    teacherContext.getTeachers();
  }, []);

  return (
    <div>
      <div className="bg-warning py-2">
        <Container>
          <h1 className="fw-bold text-white">Courses</h1>
        </Container>
      </div>
      <Container>
        {!loading && <TablePart fields={courses} fieldTitle="courses" />}
        <Row>
          <Col sm>
            <Button onClick={() => setIsForm(true)} className="w-100 my-3">
              Add Course
            </Button>
          </Col>
          <Col lg>
            <Input
              onChange={onChange}
              className="my-3"
              placeholder="Search Course"
            />
          </Col>
        </Row>
        {filter.length > 0 && (
          <TablePart fields={filter} fieldTitle="courses" />
        )}
      </Container>
      <CreateCourse
        setIsForm={setIsForm}
        title="Create Course"
        isForm={isForm}
      />
    </div>
  );
}
export default Courses;
