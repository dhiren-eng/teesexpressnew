import actions from './actions';
import cartActions from '../../cart/ducks/actions';
import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
const userLogin = (usrName, yrPass) => async (dispatch) => {
  const obj = { usrName, yrPass };
  let objLS = { usrEmail: '', token: '' };
  const response = await axiosInstance
    .post('/api/login', obj)
    .catch((error) => {
      dispatch(fetchErrorAction(error));
    });
  console.log(response);
  if (response) {
    dispatch(fetchErrorAction(null));
    dispatch(actions.fetchUser(response.data.usrInfo));
    objLS.usrEmail = response.data.usrInfo.logName;
    objLS.token = response.data.token;
    const loginLS = JSON.stringify(objLS);
    await localStorage.setItem('login', loginLS);

    let contents = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log(axiosInstance.defaults.headers);
    axiosInstance.defaults.headers['authorization'] = response.data.token;
    console.log(axiosInstance.defaults.headers);
    contents.forEach(async (element) => {
      var newObj = { ...element, customerId: response.data.usrInfo._id };
      await axiosInstance.post('/api/cart', newObj).catch((error) => {
        dispatch(fetchErrorAction(error));
      });
    });
    await localStorage.removeItem('cart');
    let newContents = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch(cartActions.initCartAc(newContents));
  }
};
const fetchUserInfo = () => async (dispatch) => {
  const loginLS = await JSON.parse(localStorage.getItem('login'));
  if (loginLS) {
    const response = await axiosInstance
      .get(`api/customer/${loginLS.usrEmail}`)
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
export default { userLogin, fetchUserInfo };
