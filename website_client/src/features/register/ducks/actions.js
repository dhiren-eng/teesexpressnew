import types from './types';
const updateCust = (obj) => {
  return {
    type: types.UPDATE_CUSTOMER,
    payload: obj,
  };
};

export default { updateCust };
