import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import axios from "axios";
import authReducer from "./authReducer";
const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    loading: true,
    error: null,
    authorization: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);
  // register user
  const registerUser = async (userInput) => {
    try {
      const result = await axios.post("/api/users", userInput);
      dispatch({ type: "authorization", payload: result.data.token });
      getUser();
    } catch (err) {
      dispatch({ type: "error", payload: err.response.data.msg });
    }
  };
  // login user
  const loginUser = async (userInput) => {
    try {
      const result = await axios.post("/api/auth/login", userInput);
      dispatch({ type: "authorization", payload: result.data.token });
      getUser();
    } catch (err) {
      dispatch({ type: "error", payload: err.response.data.msg });
    }
  };
  // get user
  const getUser = async () => {
    try {
      const result = await axios.get("/api/auth/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "getUser", payload: result.data.user });
    } catch (err) {
      dispatch({ type: "error", payload: err.response.data.msg });
    }
  };
  // clear error
  const removeError = () => {
    dispatch({ type: "removeError" });
  };
  // logout user
  const logoutUser = () => {
    dispatch({ type: "logoutUser" });
  };
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        error: state.error,
        removeError,
        loginUser,
        getUser,
        user: state.user,
        logoutUser,
        loading: state.loading,
        authorization: state.authorization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
