import types from './types';
const googleSignIn = (id) => {
  return {
    type: types.GOOGLE_SIGN_IN,
    payload: id,
  };
};
const googleSignOut = () => {
  return {
    type: types.GOOGLE_SIGN_OUT,
    payload: null,
  };
};
export default { googleSignIn, googleSignOut };
