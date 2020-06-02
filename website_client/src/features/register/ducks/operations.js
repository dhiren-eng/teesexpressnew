import history from '../../../history';
import axios from '../../../backendApiCall/axiosInstance';
import actions from './actions';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
const registerCustomer = (obj) => async (dispatch) => {
  const newObj = {
    usrEmail: obj.Email,
    yrPass: obj.password,
    usrName: obj.fullName,
    address: obj.address,
    phone: obj.mobileNumber,
    status: 'Registered',
  };
  const response = await axios.post('/api/register', newObj).catch((error) => {
    dispatch(fetchErrorAction(error));
  });
  return response;
};
const updateCustomer = (obj) => async (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  const newObj = { usrName: '', shippingAddress: '' };
  newObj.usrName = obj.fullName;
  newObj.shippingAddress = obj.address;
  if (login) {
    await axios
      .put(`/api/customer/${login.usrEmail}`, newObj)
      .catch((error) => {
        dispatch(fetchErrorAction(error));
      });
    dispatch(actions.updateCust(newObj));
  }
};
export default { registerCustomer, updateCustomer };
