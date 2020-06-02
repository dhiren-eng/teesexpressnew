import axiosInstance from '../../../backendApiCall/axiosInstance';
import fetchErrorAction from '../../../commonActions/fetchErrorAction';
import history from '../../../history';
import { cartActions } from '../../cart/ducks';
import { loginOperations } from '../../login/ducks';
import actions from './actions';
import { reset } from 'redux-form';
const addOrder = (obj, cart) => async (dispatch) => {
  try {
    const login = await JSON.parse(localStorage.getItem('login'));
    var newObj, customerId, customer;
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
      customer = await axiosInstance
        .post('/api/register', newCustomer)
        .catch((err) => {
          console.log(err);
        });
      if (customer) {
        customerId = customer.data.cId;
        newObj = { ...obj, customerId };
      } else {
        console.log('Inside else');
        const response = await axiosInstance.get(`/api/customer/${obj.email}`);
        if (!response) {
          dispatch(fetchErrorAction(504));
        } else {
          dispatch(fetchErrorAction(null));
          customerId = response.data._id;
          newObj = { ...obj, customerId };
        }
      }
    }
    const orderResponse = await axiosInstance.post('/api/order', newObj);
    if (orderResponse) {
      dispatch(fetchErrorAction(null));
    }
    const response = await axiosInstance.get(`/api/order/${newObj.email}`);
    if (response) {
      dispatch(fetchErrorAction(null));
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
      dispatch(actions.addOrder(response.data[response.data.length - 1]));
      dispatch(actions.fetchOrders(response.data));
      dispatch(cartActions.initCartAc([]));
    }
    dispatch(reset('orderSample'));
  } catch (error) {
    dispatch(fetchErrorAction(error));
    if (error.message.split(' ').pop() == 504) {
      dispatch(fetchErrorAction(504));
    }
  }
  return customer;
};
const fetchOrders = (email) => async (dispatch) => {
  try {
    const response = await axiosInstance.get(`/api/order/${email}`);
    console.log(response);
    if (response) {
      console.log('In elseeee');
      dispatch(fetchErrorAction(null));
      dispatch(actions.fetchOrders(response.data));
    } else {
      dispatch(fetchErrorAction(504));
    }
  } catch (err) {
    console.log(err);
  }
};
const registerGuest = (email, obj) => async (dispatch) => {
  console.log(obj);
  const response = await axiosInstance.put(`/api/customer/${email}`, obj);
  await dispatch(loginOperations.userLogin(email, obj.yrPass));
  return response;
};
export default { addOrder, fetchOrders, registerGuest };
