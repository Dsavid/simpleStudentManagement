import React, { useReducer } from "react";
import DetailContext from "./DetailContext";
import detailReducer from "./detailReducer";
import axios from "axios";
function DetailState({ children }) {
  const initialState = {
    detail: null,
    loading: true,
    current: null,
    updateResult: null,
  };
  const [state, dispatch] = useReducer(detailReducer, initialState);
  // add detail
  const addDetail = async (field, id) => {
    try {
      const result = await axios.get(`/api/${field}/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });
      dispatch({
        type: "addDetail",
        payload: result.data[field === "teachers" ? "teacher" : "student"],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // clear loading
  const clearLoading = () => {
    dispatch({ type: "clearLoading" });
  };
  // add current
  const addCurrent = () => {
    dispatch({
      type: "addCurrent",
    });
  };
  // remove current
  const removeCurrent = () => {
    dispatch({ type: "removeCurrent" });
  };
  // update field
  const updateDetail = async (userInput, field, id) => {
    try {
      addLoading(true);
      let result = await axios.put(`/api/${field}/${id}`, userInput, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (userInput.file) {
        const formData = new FormData();
        formData.append("file", userInput.file);
        result = await axios.post(`/api/${field}/${id}/photo`, formData, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      }
      addLoading(false);
      dispatch({
        type: "updateDetail",
        payload: result.data[field === "teachers" ? "teacher" : "student"],
      });
      dispatch({
        type: "updateResult",
        payload: {
          msg: "success updating field",
          color: "bg-success",
        },
      });
    } catch (error) {
      addLoading(false);
      dispatch({
        type: "updateResult",
        payload: {
          msg: error.response.data.msg,
          color: "bg-danger",
        },
      });
    }
  };
  // remove updateResult
  const removeUpdateResult = () => {
    dispatch({ type: "removeUpdateResult" });
  };
  // const add loading
  const addLoading = (flag) => dispatch({ type: "addLoading", payload: flag });
  /// add course for student
  const addCourseForStudent = async (id, courseId) => {
    try {
      addLoading(true);
      // filter to find if the course is already in student course list or not
      const flag = state.detail.courses.filter((course) => {
        return course._id === courseId;
      });
      if (flag.length > 0) {
        dispatch({
          type: "updateResult",
          payload: {
            msg: "course already exist",
            color: "bg-danger",
          },
        });
      } else {
        const result = await axios.put(
          `/api/students/${id}/addCourse`,
          { courseId },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        dispatch({
          type: "updateCourseForStudent",
          payload: result.data.student.courses,
        });
        dispatch({
          type: "updateResult",
          payload: {
            msg: "course added",
            color: "bg-success",
          },
        });
      }
      addLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  /// remove course for student
  const removeCourseForStudent = async (id, courseId) => {
    try {
      addLoading(true);
      const result = await axios.put(
        `/api/students/${id}/removeCourse`,
        { courseId },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch({
        type: "updateCourseForStudent",
        payload: result.data.student.courses,
      });
      dispatch({
        type: "updateResult",
        payload: {
          msg: "course deleted",
          color: "bg-success",
        },
      });
      addLoading(false);
    } catch (error) {
      addLoading(false);
      dispatch({
        type: "updateResult",
        payload: {
          msg: error.response.data.msg,
          color: "bg-danger",
        },
      });
    }
  };
  return (
    <DetailContext.Provider
      value={{
        removeCourseForStudent,
        addCourseForStudent,
        addDetail,
        clearLoading,
        detail: state.detail,
        loading: state.loading,
        current: state.current,
        addCurrent,
        removeCurrent,
        updateDetail,
        removeUpdateResult,
        updateResult: state.updateResult,
        addLoading,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}

export default DetailState;
