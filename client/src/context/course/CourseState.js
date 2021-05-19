import axios from "axios";
import React, { useReducer } from "react";

import CourseContext from "./CourseContext";
import courseReducer from "./courseReducer";
function CourseState({ children }) {
  const initialState = {
    courses: [],
    loading: true,
    createResult: null,
    filter: [],
    courseDetail: null,
    current: null,
  };
  const [state, dispatch] = useReducer(courseReducer, initialState);
  /// add course to database
  const addCourse = async (userInput) => {
    const input = {
      name: userInput.name,
      tuition: userInput.tuition,
      duration: userInput.duration,
    };
    try {
      let data = await axios.post(
        `/api/teachers/${userInput.teacherId}/courses`,
        input,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: "addCourse",
        payload: data.data.course,
      });
      dispatch({
        type: "createResult",
        payload: { msg: "success creating course", color: "bg-success" },
      });
    } catch (error) {
      dispatch({
        type: "createResult",
        payload: {
          msg: error.response.data.msg,
          color: "bg-danger",
        },
      });
    }
  };
  /// get courses from database
  const getCourses = async () => {
    try {
      addLoading();
      let data = await axios.get("/api/courses", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      data = data.data.courses;
      dispatch({
        type: "getCourses",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "createResult",
        payload: {
          msg: error.response.data.msg,
          color: "bg-danger",
        },
      });
    }
  };
  // remove create result
  const removeCreateResult = async () => {
    dispatch({
      type: "removeResult",
    });
  };
  // filter user search
  const addFilter = (name) => {
    dispatch({
      type: "addFilter",
      payload: name,
    });
  };
  // remove filter user search
  const removeFilter = () => {
    dispatch({
      type: "removeFilter",
    });
  };
  // delete course from database
  const removeCourse = async (id) => {
    try {
      const result = await axios.delete(`/api/courses/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "removeCourse", payload: id });
    } catch (error) {
      console.log(error.response);
    }
  };
  // add course detail
  const getCourseDetail = async (id) => {
    try {
      addLoading();
      const result = await axios.get(`/api/courses/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "courseDetail", payload: result.data.course });
    } catch (error) {
      console.log(error.response);
    }
  };

  // update course detail
  const updateCourseDetail = async (id, userInput) => {
    try {
      console.log(userInput);
      let input = { ...userInput };
      input.teacher = userInput.teacherId;
      delete input.teacherId;
      addLoading();
      const result = await axios.put(`/api/courses/${id}`, input, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      dispatch({ type: "updateCourseDetail", payload: result.data.course });
      dispatch({
        type: "createResult",
        payload: { msg: "success updating course", color: "bg-success" },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // add loading
  const addLoading = () => {
    dispatch({ type: "addLoading" });
  };
  // add current for update
  const addCurrent = () => {
    dispatch({ type: "addCurrent" });
  };
  return (
    <CourseContext.Provider
      value={{
        updateCourseDetail,
        addCurrent,
        current: state.current,
        getCourseDetail,
        removeCourse,
        addCourse,
        getCourses,
        courses: state.courses,
        courseCreateResult: state.createResult,
        removeCreateResult,
        courseLoading: state.loading,
        addFilter,
        filter: state.filter,
        removeFilter,
        courseDetail: state.courseDetail,
        addLoading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export default CourseState;
