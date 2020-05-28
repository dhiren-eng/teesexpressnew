import types from './types';
const INITIAL_STATE = {
  searchResult: [],
};
const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEARCH_PRODUCT:
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
