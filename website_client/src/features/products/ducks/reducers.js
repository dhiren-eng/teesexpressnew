import types from './types';
import _ from 'lodash';
const initialState = {};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.RESPONSE_CTGLIST:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    case types.RESPONSE_CTG:
      return { ...state, [action.payload._id]: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
