export default (state, action) => {
  switch (action.type) {
    case "authorization":
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        loading: false,
        error: null,
        authorization: true,
      };
    case "getUser":
      return {
        ...state,
        authorization: true,
        loading: false,
        error: null,
        user: action.payload,
      };
    case "logoutUser":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        error: null,
        user: null,
        authorization: false,
        loading: false,
      };
    case "error":
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: action.payload,
        authorization: false,
      };
    case "removeError":
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
