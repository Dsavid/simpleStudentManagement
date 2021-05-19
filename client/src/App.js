import React, { useEffect, useContext } from "react";
import Navigation from "./components/layouts/Navigation";
import Login from "./components/pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Alerts from "./components/layouts/Alerts";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/layouts/PrivateRoute";
import StudentMangement from "./components/pages/StudentMangement";
import AuthContext from "./context/auth/AuthContext";
import Teachers from "./components/pages/Teachers";
import Students from "./components/pages/Students";
import "./style.css";
import FieldDetail from "./components/pages/FieldDetail";
import Courses from "./components/pages/Courses";
import CourseDetail from "./components/pages/CourseDetail";

function App() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.getUser();
  }, []);
  return (
    <div className="App">
      <Alerts />
      <Switch>
        <PrivateRoute path="/" exact>
          <Navigation />
          <StudentMangement />
        </PrivateRoute>
        <Route path="/login" exact>
          <Login />
        </Route>
        <PrivateRoute path="/students" exact>
          <Navigation />
          <Students />
        </PrivateRoute>
        <PrivateRoute path="/teachers" exact>
          <Navigation />
          <Teachers />
        </PrivateRoute>
        <PrivateRoute path="/courses" exact>
          <Navigation />
          <Courses />
        </PrivateRoute>
        <PrivateRoute path="/courses/:id" exact>
          <Navigation />
          <CourseDetail />
        </PrivateRoute>
        <PrivateRoute path="/:id/:id" exact>
          <Navigation />
          <FieldDetail />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
