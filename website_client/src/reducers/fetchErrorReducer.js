import { FETCH_ERROR } from '../commonActions/fetchErrorAction';
const initialState = {
  error: null,
};
const fetchErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
export default fetchErrorReducer;
