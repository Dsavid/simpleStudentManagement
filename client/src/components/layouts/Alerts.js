import React, { useContext, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import CourseContext from "../../context/course/CourseContext";
import DetailContext from "../../context/Detail/DetailContext";
import StudentContext from "../../context/student/StudentContext";
import TeacherContext from "../../context/teacher/TeacherContext";
function Alerts() {
  // context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const teacherContext = useContext(TeacherContext);
  const detailContext = useContext(DetailContext);
  const studentContext = useContext(StudentContext);
  const courseContext = useContext(CourseContext);
  const { alerts } = alertContext;
  const { error } = authContext;
  const { createResult } = teacherContext;
  const { updateResult } = detailContext;
  const { studentCreateResult } = studentContext;
  const { courseCreateResult } = courseContext;
  useEffect(() => {
    if (error) {
      alertContext.addAlert({ msg: error, color: "bg-danger" });
      authContext.removeError();
    }
    if (createResult) {
      alertContext.addAlert({
        msg: createResult.msg,
        color: createResult.color,
      });
      teacherContext.removeCreateResult();
    }
    if (studentCreateResult) {
      alertContext.addAlert({
        msg: studentCreateResult.msg,
        color: studentCreateResult.color,
      });
      studentContext.removeCreateResult();
    }
    if (updateResult) {
      alertContext.addAlert({
        msg: updateResult.msg,
        color: updateResult.color,
      });
      detailContext.removeUpdateResult();
    }
    if (courseCreateResult) {
      alertContext.addAlert({
        msg: courseCreateResult.msg,
        color: courseCreateResult.color,
      });
      courseContext.removeCreateResult();
    }
  }, [
    error,
    createResult,
    updateResult,
    studentCreateResult,
    courseCreateResult,
  ]);
  return (
    <div
      style={{
        zIndex: "1",
        position: "fixed",
        width: "50%",
        top: "10%",
        right: "50%",
        transform: "translate(50%,-10%)",
      }}
    >
      {alerts.map((alert) => (
        <p key={alert.id} className={`${alert.color} afs-6 text-white ps-2`}>
          <i className="fas fa-exclamation pe-2"></i>
          {alert.msg}
        </p>
      ))}
    </div>
  );
}

export default Alerts;
