import types from './types';
import CartItem from '../CartItem';
const initCartAc = (cart) => {
  return {
    type: types.INIT_CART,
    payload: cart,
  };
};
const addToCartAc = (cart) => ({
  type: types.ADD_TO_CART,
  payload: cart,
});
const updateCartAc = (cart) => ({
  type: types.UPDATE_CART,
  payload: cart,
});
export default { initCartAc, addToCartAc, updateCartAc };
