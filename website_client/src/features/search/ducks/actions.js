import types from './types';
const productSearch = (arr) => {
  return {
    type: types.SEARCH_PRODUCT,
    payload: arr,
  };
};
export default { productSearch };
