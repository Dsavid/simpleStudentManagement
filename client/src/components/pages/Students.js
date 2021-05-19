import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Input, Row, Col } from "reactstrap";
import DetailContext from "../../context/Detail/DetailContext";
import StudentContext from "../../context/student/StudentContext";
import Create from "../layouts/Create";
import TablePart from "../layouts/TablePart";
import spinner from "../../img/spinner.gif";
function Students() {
  // context
  const studentContext = useContext(StudentContext);
  const detailContext = useContext(DetailContext);
  const [isForm, setIsForm] = useState(false);
  const { students, studentLoading, filter } = studentContext;
  // filter search for user
  const onChange = (e) => {
    if (e.target.value === "") {
      studentContext.removeFilter();
    } else {
      studentContext.addFilter(e.target.value);
    }
  };
  useEffect(() => {
    studentContext.getStudents();
    detailContext.addLoading(true);
  }, []);

  return !studentLoading ? (
    <div>
      <div className="bg-warning py-2">
        <Container>
          <h1 className="fw-bold text-white">Students {students.length}</h1>
        </Container>
      </div>
      <Container>
        {!studentLoading && (
          <TablePart fields={students} fieldTitle={"students"} />
        )}
        <Row>
          <Col sm>
            <Button onClick={() => setIsForm(true)} className="w-100 my-3">
              Add Student
            </Button>
          </Col>
          <Col lg>
            <Input
              onChange={onChange}
              className="my-3"
              placeholder="Search Student"
            />
          </Col>
        </Row>
        {filter.length > 0 && (
          <TablePart fieldTitle={"students"} fields={filter} />
        )}
      </Container>
      <Create isForm={isForm} title={"Create Student"} setIsForm={setIsForm} />
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <img src={spinner} />
    </div>
  );
}

export default Students;
