import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import alertReducer from "./alertReducer";
import { v4 } from "uuid";
const AlertState = ({ children }) => {
  const initialState = {
    alerts: [],
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);
  // add alert
  const addAlert = (alert) => {
    alert.id = v4();
    dispatch({
      type: "addAlert",
      payload: alert,
    });
    setTimeout(() => {
      removeAlert(alert.id);
    }, 5000);
  };
  // remove alert
  const removeAlert = (id) => {
    dispatch({
      type: "removeAlert",
      payload: id,
    });
  };
  return (
    <AlertContext.Provider
      value={{ alerts: state.alerts, addAlert, removeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
export default AlertState;
