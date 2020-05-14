import history from '../../../history';
import axios from '../../../backendApiCall/axiosInstance';
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
  console.log(response);
  history.push('/');
};
export default { registerCustomer };
