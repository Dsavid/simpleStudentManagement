import React, { useContext, useState } from "react";
import {
  Table,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import CourseContext from "../../context/course/CourseContext";

function CourseTable({ fields, fieldTitle }) {
  // context
  const courseContext = useContext(CourseContext);
  /// pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [fieldPerPage, setTeacherPerPage] = useState(10);
  const lastIndex = currentPage * fieldPerPage;
  const startIndex = lastIndex - fieldPerPage;
  const displayfields = fields.slice(startIndex, lastIndex);
  const allPage = Math.ceil(fields.length / fieldPerPage);
  // remove filter

  const removeFilter = () => {};
  return (
    <div>
      <Table className="my-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Course Name</th>
            <th>Duration</th>
            <th>Teacher</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayfields.map((field, index) => {
            return (
              <React.Fragment key={field.id}>
                <tr>
                  <td>{startIndex + index + 1}</td>
                  <td>{field.name}</td>
                  <td>{field.duration}</td>
                  <td>{field.teacher && field.teacher.fullName}</td>
                  <td>
                    <Link to={`/courses/${field._id}`}>
                      <Button
                        onClick={() => {
                          removeFilter();
                          courseContext.addLoading();
                        }}
                        className="btn-sm"
                      >
                        Detail
                      </Button>
                    </Link>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
      <Pagination aria-label="Page navigation example">
        {Array(allPage)
          .fill()
          .map((page, index) => (
            <React.Fragment key={index + 1}>
              <PaginationItem>
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
            </React.Fragment>
          ))}
      </Pagination>
    </div>
  );
}
export default CourseTable;
