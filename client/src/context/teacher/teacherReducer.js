export default (state, action) => {
  switch (action.type) {
    case "addTeacher":
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case "getTeachers":
      return {
        ...state,
        teachers: action.payload,
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
        filter: state.teachers.filter((teacher) => {
          const reg = new RegExp(action.payload, "gi");
          return teacher.fullName.match(reg);
        }),
      };
    case "removeFilter":
      return {
        ...state,
        filter: [],
      };
    case "removeTeacher":
      return {
        ...state,
        teachers: state.teachers.map(
          (teacher) => teacher.id !== action.payload
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
