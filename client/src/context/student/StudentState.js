import axios from "axios";
import React, { useReducer } from "react";
import StudentContext from "./StudentContext";
import studentReducer from "./studentReducer";
function StudentState({ children }) {
  const initialState = {
    students: [],
    loading: true,
    createResult: null,
    filter: [],
  };
  const [state, dispatch] = useReducer(studentReducer, initialState);
  /// add student to database
  const addStudent = async (userInput) => {
    try {
      addLoading();
      let data = await axios.post("/api/students", userInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (userInput.file) {
        let formData = new FormData();
        formData.append("file", userInput.file);
        data = await axios.post(
          `/api/students/${data.data.student._id}/photo`,
          formData,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      dispatch({
        type: "addStudent",
        payload: data.data.student,
      });
      dispatch({
        type: "createResult",
        payload: { msg: "success creating teacher", color: "bg-success" },
      });
    } catch (error) {
      console.log(error.response);
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
  const getStudents = async () => {
    try {
      addLoading();
      const data = await axios.get("/api/students", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({
        type: "getStudents",
        payload: data.data.students,
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
  // delete student from database
  const removeStudent = async (id) => {
    try {
      const result = await axios.delete(`/api/students/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "removeStudent", payload: id });
    } catch (error) {
      console.log(error.response);
    }
  };
  const addLoading = () => {
    dispatch({ type: "addLoading" });
  };
  return (
    <StudentContext.Provider
      value={{
        removeStudent,
        addStudent,
        getStudents,
        students: state.students,
        studentCreateResult: state.createResult,
        removeCreateResult,
        studentLoading: state.loading,
        addFilter,
        filter: state.filter,
        removeFilter,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default StudentState;
