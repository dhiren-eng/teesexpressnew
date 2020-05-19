import types from './types';
const fetchOrders = (arr) => {
  return {
    type: types.FETCH_ORDERS,
    payload: arr,
  };
};
export default { fetchOrders };
