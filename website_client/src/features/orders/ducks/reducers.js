import types from './types';
const INITIAL_STATE = [];
const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default orderReducer;
