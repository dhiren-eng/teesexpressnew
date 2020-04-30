import types from './types';
const initialState = [];
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_CART:
      return [...action.payload];
    case types.ADD_TO_CART:
      return [...action.payload];
    case types.UPDATE_CART:
      return [...action.payload];
    default:
      return state;
  }
};
export default cartReducer;
