export default (state, action) => {
  switch (action.type) {
    case "addCourse":
      return {
        ...state,
        loading: false,
        courses: [...state.courses, action.payload],
      };
    case "courseDetail":
      return {
        ...state,
        loading: false,
        courseDetail: action.payload,
      };
    case "updateCourseDetail":
      return {
        ...state,
        loading: false,
        courseDetail: action.payload,
      };
    case "getCourses":
      return {
        ...state,
        courses: action.payload,
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
        filter: state.courses.filter((course) => {
          const reg = new RegExp(action.payload, "gi");
          return course.name.match(reg);
        }),
      };
    case "removeFilter":
      return {
        ...state,
        filter: [],
      };
    case "removeCourse":
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case "addLoading":
      return {
        ...state,
        loading: true,
      };
    case "addCurrent":
      return {
        ...state,
        current: state.courseDetail,
      };
    default:
      return {
        ...state,
      };
  }
};
