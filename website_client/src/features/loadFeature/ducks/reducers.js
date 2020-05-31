const INITIAL_STATE = {
  startLoad: false,
};
const loaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case true:
      return { ...state, startLoad: action.type };
    case false:
      return { ...state, startLoad: action.type };
    default:
      return state;
  }
};
export default loaderReducer;
