import types from './types';
import customerTypes from '../../register/ducks/types';
import _ from 'lodash';
import actions from '../../register/ducks/actions';
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
      if (_.isEmpty(action.payload)) {
        return { ...state, userInfo: {} };
      } else {
        return {
          ...state,
          userInfo: { ...state.userInfo, ...action.payload },
        };
      }

    case customerTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          shippingAddress: action.payload.shippingAddress,
          usrName: action.payload.usrName,
        },
      };

    default:
      return state;
  }
};
export default loginReducer;
