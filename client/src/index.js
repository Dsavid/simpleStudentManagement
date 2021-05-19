import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AlertState from "./context/alert/AlertState";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import TeacherState from "./context/teacher/TeacherState";
import DetailState from "./context/Detail/DetailState";
import StudentState from "./context/student/StudentState";
import CourseState from "./context/course/CourseState";
ReactDOM.render(
  <React.Fragment>
    <DetailState>
      <CourseState>
        <StudentState>
          <TeacherState>
            <AuthState>
              <AlertState>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </AlertState>
            </AuthState>
          </TeacherState>
        </StudentState>
      </CourseState>
    </DetailState>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
