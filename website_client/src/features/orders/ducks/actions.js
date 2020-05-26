import types from './types';
const fetchOrders = (arr) => {
  console.log(arr);
  return {
    type: types.FETCH_ORDERS,
    payload: arr,
  };
};
const addOrder = (obj) => {
  return {
    type: types.ADD_ORDER,
    payload: obj,
  };
};
export default { fetchOrders, addOrder };
