export default (state, action) => {
  switch (action.type) {
    case "addAlert":
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case "removeAlert":
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};
