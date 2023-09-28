export default (state, action) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return {
        ...state,
        isDarkTheme: !action.payload,
      };
    case "FETCH_DATA":
      return {
        ...state,
        jobListData: action.payload,
        headers: action.payload[0],
        error: false,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "STOP_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "UPDATE_ESTIMATOR":
      return {
        ...state,
        estimator: action.payload,
      };
    case "UPDATE_COMPANY":
      return {
        ...state,
        company: action.payload,
      };
    case "UPDATE_YEAR":
      return {
        ...state,
        year: action.payload,
      };
    default:
      return state;
  }
};
