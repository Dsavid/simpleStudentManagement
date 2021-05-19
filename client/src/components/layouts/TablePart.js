import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import TeacherContext from "../../context/teacher/TeacherContext";
function TablePart({ fields, fieldTitle }) {
  // context
  const teacherContext = useContext(TeacherContext);
  /// pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [fieldPerPage, setTeacherPerPage] = useState(10);
  const lastIndex = currentPage * fieldPerPage;
  const startIndex = lastIndex - fieldPerPage;
  const displayfields = fields.slice(startIndex, lastIndex);
  const allPage = Math.ceil(fields.length / fieldPerPage);
  // remove filter
  const removeFilter = () => {
    if (fieldTitle === "teachers") {
      teacherContext.removeFilter();
    }
  };

  return (
    <div>
      <Table className="my-3">
        <thead>
          <tr>
            <th>#</th>
            <th>{fieldTitle === "courses" ? "Course Name" : "Full Name"}</th>
            <th>{fieldTitle === "courses" ? "Duration" : "Sex"}</th>
            <th>{fieldTitle === "courses" ? "Teacher" : "Phone"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayfields.map((field, index) => {
            return (
              <tr key={field._id}>
                <td>{startIndex + index + 1}</td>
                <td>
                  {fieldTitle === "courses" ? field.name : field.fullName}
                </td>
                <td>{fieldTitle === "courses" ? field.duration : field.sex}</td>
                <td>
                  {fieldTitle === "courses" && field.teacher
                    ? field.teacher.fullName
                    : field.phone}
                </td>
                <td>
                  <Link to={`/${fieldTitle}/${field._id}`}>
                    <Button onClick={removeFilter} className="btn-sm">
                      Detail
                    </Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination aria-label="Page navigation example">
        {Array(allPage)
          .fill()
          .map((page, index) => (
            <PaginationItem key={index + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(index + 1)}
                className={
                  currentPage - 1 === index ? "bg-primary text-white" : ""
                }
                href="#"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
      </Pagination>
    </div>
  );
}
export default TablePart;
