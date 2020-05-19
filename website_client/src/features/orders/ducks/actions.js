import types from './types';
const fetchOrders = (obj) => {
  return {
    type: types.FETCH_ORDERS,
    payload: obj,
  };
};
export default { fetchOrders };
