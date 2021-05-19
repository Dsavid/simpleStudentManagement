import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
function PrivateRoute({ children }) {
  const authContext = useContext(AuthContext);
  const { authorization, loading } = authContext;
  return !authorization && !loading ? <Redirect to="/login" /> : children;
}
export default PrivateRoute;
