import types from './types';
const receiveCtgList = (payload) => {
  return {
    type: types.RESPONSE_CTGLIST,
    payload,
  };
};
const receiveCtg = (payload) => {
  return {
    type: types.RESPONSE_CTG,
    payload,
  };
};
export default { receiveCtgList, receiveCtg };
