import types from './types';
const searchReducer = (state, action) => {
  switch (action.type) {
    case types.SEARCH_PRODUCT:
      return { ...state, searchResult: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
