import types from './types';

const INITIAL_STATE = {
  isSignedIn: null,
  id: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GOOGLE_SIGN_IN:
      return { ...state, isSignedIn: true, id: action.payload };

    case types.GOOGLE_SIGN_OUT:
      return { ...state, isSignedIn: false, id: null };

    default:
      return state;
  }
};
