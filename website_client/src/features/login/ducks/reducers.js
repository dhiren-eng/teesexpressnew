import types from './types';

const INITIAL_STATE = {
  isSignedIn: null,
  userIdGoogle: null,
  userInfo: {},
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GOOGLE_SIGN_IN:
      return { ...state, isSignedIn: true, userIdGoogle: action.payload };

    case types.GOOGLE_SIGN_OUT:
      return { ...state, isSignedIn: false, userIdGoogle: null };

    case types.FETCH_USER:
      return { ...state, userInfo: action.payload };

    default:
      return state;
  }
};
export default loginReducer;
