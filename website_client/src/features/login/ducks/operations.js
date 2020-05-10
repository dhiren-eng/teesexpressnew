import actions from './actions';
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
    dispatch(actions.fetchUser(response.data.userInfo));
    objLS.usrEmail = response.data.usrInfo.usrEmail;
    objLS.token = response.data.token;
    const loginLS = JSON.stringify(objLS);
    await localStorage.setItem('login', loginLS);
  }
};
const fetchUserInfo = () => async (dispatch) => {
  const loginLS = await JSON.parse(localStorage.getItem('login'));
  if (loginLS) {
    const response = await axi osInstance
      .get(`api/customer/${loginLS.usrEmail}`)
      .catch((error) => {
        dispatch(fetchErrorAction(error));
      });
    if (response) {
      dispatch(fetchErrorAction(null));
      dispatch(actions.fetchUser(response.data));
    }
  } else {
    dispatch(actions.fetchUser(null));
  }
};
export default { userLogin, fetchUserInfo };
