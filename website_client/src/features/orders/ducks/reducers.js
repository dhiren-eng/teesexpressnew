import types from './types';
const INITIAL_STATE = {
  orders: [],
  currentOrder: {},
};
const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS:
      return { ...state, orders: action.payload };
    case types.ADD_ORDER:
      return { ...state, currentOrder: action.payload };
    default:
      return state;
  }
};
export default orderReducer;
