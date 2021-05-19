export default (state, action) => {
  switch (action.type) {
    case "addDetail":
      return { ...state, detail: action.payload, loading: false };
    case "clearLoading":
      return { ...state, loading: true };
    case "addCurrent":
      return { ...state, current: state.detail };
    case "removeCurrent":
      return { ...state, current: null };
    case "updateDetail":
      return { ...state, detail: action.payload };
    case "updateResult":
      return { ...state, updateResult: action.payload };
    case "removeUpdateResult":
      return { ...state, updateResult: null };
    case "addLoading":
      return { ...state, loading: action.payload };
    case "updateCourseForStudent":
      return { ...state, detail: { ...state.detail, courses: action.payload } };
    default:
      return { ...state };
  }
};
