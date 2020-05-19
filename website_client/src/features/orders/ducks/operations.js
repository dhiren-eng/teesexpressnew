import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import history from '../../../history';
import { cartActions } from '../../cart/ducks';
import actions from './actions';
const addOrder = (obj, cart) => async (dispatch) => {
  const login = await JSON.parse(localStorage.getItem('login'));
  var newObj, customerId;
  if (login) {
    customerId = login.customerId;
    newObj = { ...obj, customerId };
  } else {
    var arr = [];
    arr.push(obj.address);
    const newCustomer = {
      usrEmail: obj.email,
      usrName: obj.fullName,
      address: arr,
      phone: obj.phone,
      status: 'Guest',
    };
    const customer = await axiosInstance
      .post('/api/register', newCustomer)
      .catch((error) => {
        dispatch(fetchErrorAction(error));
      });
    console.log(customer);
    if (customer) {
      customerId = customer.data.cId;
      newObj = { ...obj, customerId: customerId };
    } else {
      console.log('Inside else');
      const response = await axiosInstance
        .get(`/api/customer/${obj.email}`)
        .catch((error) => {
          dispatch(fetchErrorAction(error));
        });
      customerId = response.data._id;
      newObj = { ...obj, customerId };
    }
  }
  await axiosInstance.post('/api/order', newObj);
  const response = await axiosInstance.get(`/api/order/${newObj.email}`);
  if (login) {
    cart.forEach(async (element) => {
      await axiosInstance
        .delete(`/api/cart/${customerId}/${element.id}`)
        .catch((error) => {
          dispatch(fetchErrorAction(error));
        });
    });
  } else {
    localStorage.removeItem('cart');
  }
  dispatch(actions.fetchOrders(response.data));
  dispatch(cartActions.initCartAc([]));
};
const fetchOrders = (email) => async (dispatch) => {
  console.log(email);
  const response = await axiosInstance.get(`/api/order/${email}`);
  console.log(typeof response.data);
  console.log(response);
  if (response) {
    dispatch(actions.fetchOrders(response.data));
  }
};
export default { addOrder, fetchOrders };
