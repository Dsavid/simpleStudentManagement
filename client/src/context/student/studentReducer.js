export default (state, action) => {
  switch (action.type) {
    case "addStudent":
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case "getStudents":
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case "createResult":
      return {
        ...state,
        createResult: action.payload,
        loading: false,
      };
    case "removeResult":
      return {
        ...state,
        createResult: null,
        loading: false,
      };
    case "addFilter":
      return {
        ...state,
        filter: state.students.filter((student) => {
          const reg = new RegExp(action.payload, "gi");
          return student.fullName.match(reg);
        }),
      };
    case "removeFilter":
      return {
        ...state,
        filter: [],
      };
    case "removeStudent":
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };
    case "addLoading":
      return {
        ...state,
        loading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
