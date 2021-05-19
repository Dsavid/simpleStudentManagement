import axios from "axios";
import React, { useReducer } from "react";
import TeacherContext from "./TeacherContext";
import teacherReducer from "./teacherReducer";
function TeacherState({ children }) {
  const initialState = {
    teachers: [],
    loading: true,
    createResult: null,
    filter: [],
  };
  const [state, dispatch] = useReducer(teacherReducer, initialState);
  /// add teacher to database
  const addTeacher = async (userInput) => {
    try {
      addLoading();
      let data = await axios.post("/api/teachers", userInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (userInput.file) {
        // data.data.teacher.id
        let formData = new FormData();
        formData.append("file", userInput.file);
        data = await axios.post(
          `/api/teachers/${data.data.teacher.id}/photo`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      dispatch({
        type: "addTeacher",
        payload: data.data.teacher,
      });
      dispatch({
        type: "createResult",
        payload: { msg: "success creating teacher", color: "bg-success" },
      });
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: "createResult",
        payload: {
          msg: error.response.data.msg,
          color: "bg-danger",
        },
      });
    }
  };
  /// get teachers from database
  const getTeachers = async () => {
    try {
      addLoading();
      const data = await axios.get("/api/teachers", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({
        type: "getTeachers",
        payload: data.data.teachers,
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
  // remove teacher from teachers
  const removeTeacher = async (id) => {
    try {
      const result = await axios.delete(`/api/teachers/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "removeTeacher", payload: id });
    } catch (error) {
      console.log(error.response);
    }
  };
  // update teacher
  const updateTeacher = async (userInput, id) => {
    try {
      const result = await axios.put(`/api/teachers/${id}`, userInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
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
  const addLoading = () => {
    dispatch({ type: "addLoading" });
  };
  return (
    <TeacherContext.Provider
      value={{
        removeTeacher,
        addTeacher,
        getTeachers,
        teachers: state.teachers,
        createResult: state.createResult,
        removeCreateResult,
        loading: state.loading,
        addFilter,
        filter: state.filter,
        removeFilter,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
}

export default TeacherState;
