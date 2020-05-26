import actions from './actions';
import cartActions from '../../cart/ducks/actions';
import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import { reset } from 'redux-form';
const userLogin = (usrName, yrPass) => async (dispatch) => {
  console.log('UserLogin called');
  const obj = { usrName, yrPass };
  let objLS = { usrEmail: '', token: '', customerId: '' };
  dispatch(reset('registerPage'));
  const response = await axiosInstance
    .post('/api/login', obj)
    .catch((error) => {
      dispatch(fetchErrorAction(error));
    });

  if (response) {
    dispatch(fetchErrorAction(null));

    objLS.usrEmail = response.data.usrInfo.logName;
    objLS.token = response.data.token;
    objLS.customerId = response.data.usrInfo._id;
    const loginLS = JSON.stringify(objLS);
    await localStorage.setItem('login', loginLS);

    let contents = JSON.parse(localStorage.getItem('cart') || '[]');
    if (contents.length != 0) {
      axiosInstance.defaults.headers['authorization'] = response.data.token;
      contents.forEach(async (element) => {
        var newObj = { ...element, customerId: response.data.usrInfo._id };
        await axiosInstance.post('/api/cart', newObj).catch((error) => {
          dispatch(fetchErrorAction(error));
        });
      });
      await localStorage.removeItem('cart');
    }

    dispatch(actions.fetchUser(response.data.usrInfo));
  }
};
const fetchUserInfo = () => async (dispatch) => {
  const loginLS = await JSON.parse(localStorage.getItem('login'));
  if (loginLS) {
    const response = await axiosInstance
      .get(`/api/customer/${loginLS.usrEmail}`)
      .catch((error) => {
        dispatch(fetchErrorAction(error));
      });
    if (response) {
      dispatch(fetchErrorAction(null));
      dispatch(actions.fetchUser(response.data));
    }
  } else {
    console.log('fetch user {} called');
    dispatch(actions.fetchUser({}));
  }
};

const logout = () => async (dispatch) => {
  await localStorage.removeItem('login');
  dispatch(actions.fetchUser({}));
  dispatch(reset('registerPage'));
};
export default { userLogin, fetchUserInfo, logout };
