import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Input, Row, Col } from "reactstrap";
import DetailContext from "../../context/Detail/DetailContext";
import TeacherContext from "../../context/teacher/TeacherContext";
import Create from "../layouts/Create";
import TablePart from "../layouts/TablePart";
import spinner from "../../img/spinner.gif";
function Teachers() {
  // context
  const teacherContext = useContext(TeacherContext);
  const detailContext = useContext(DetailContext);
  const [isForm, setIsForm] = useState(false);
  const { teachers, loading, filter } = teacherContext;
  // filter search for user
  const onChange = (e) => {
    if (e.target.value === "") {
      teacherContext.removeFilter();
    } else {
      teacherContext.addFilter(e.target.value);
    }
  };
  useEffect(() => {
    teacherContext.getTeachers();
    detailContext.addLoading(true);
  }, []);
  return !loading ? (
    <div>
      <div className="bg-warning py-2">
        <Container>
          <h1 className="fw-bold text-white">Teachers {teachers.length}</h1>
        </Container>
      </div>
      <Container>
        {!loading && <TablePart fields={teachers} fieldTitle={"teachers"} />}
        <Row>
          <Col sm>
            <Button onClick={() => setIsForm(true)} className="w-100 my-3">
              Add Teacher
            </Button>
          </Col>
          <Col lg>
            <Input
              onChange={onChange}
              className="my-3"
              placeholder="Search Teacher"
            />
          </Col>
        </Row>
        {filter.length > 0 && (
          <TablePart fieldTitle={"teachers"} fields={filter} />
        )}
      </Container>
      <Create isForm={isForm} title={"Create Teacher"} setIsForm={setIsForm} />
    </div>
  ) : (
    <div className="d-flex justify-content-center">
      <img src={spinner} alt="" />
    </div>
  );
}

export default Teachers;
