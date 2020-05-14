import actions from './actions';
import history from '../../../history';
import axiosInstance from '../../../backendApiCall/axiosInstance';
const initCartLS = () => async (dispatch) => {
  let contents = await JSON.parse(localStorage.getItem('cart') || '[]');
  dispatch(actions.initCartAc(contents));
  const cartContent = JSON.stringify(contents);
  localStorage.setItem('cart', cartContent);
};
const addToCartLS = (cartItem) => async (dispatch) => {
  let contents = await JSON.parse(localStorage.getItem('cart') || '[]');
  contents.push({ ...cartItem, id: Date.now() });
  dispatch(actions.addToCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
const updateCartItemLS = (cartItem) => async (dispatch) => {
  let contents = await JSON.parse(localStorage.getItem('cart') || '[]');
  Object.assign(
    contents.find((e) => e.id == cartItem.id),
    cartItem
  );
  dispatch(actions.updateCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
const deleteCartItemLS = (id) => async (dispatch) => {
  let contents = await JSON.parse(localStorage.getItem('cart') || '[]');
  contents = contents.filter((item) => item.id != id);
  dispatch(actions.deleteCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
const initCart = () => async (dispatch) => {
  const login = await JSON.parse(localStorage.getItem('login'));
  if (login) {
    axiosInstance.defaults.headers['authorization'] = login.token;
    const response = await axiosInstance.get(`/api/cart/${login.customerId}`);
    dispatch(actions.initCartAc(response.data));
  }
};
const addToCart = (obj) => async (dispatch) => {
  const login = await JSON.parse(localStorage.getItem('login'));
  if (login) {
    const cartObject = { ...obj, id: Date.now(), customerId: login.customerId };
    axiosInstance.defaults.headers['authorization'] = login.token;
    await axiosInstance.post('/api/cart/', cartObject);
    const response = await axiosInstance.get(`/api/cart/${login.customerId}`);
    dispatch(actions.initCartAc(response.data));
    history.push('/cart');
  }
};
const updateCartItem = (obj) => async (dispatch) => {
  const login = await JSON.parse(localStorage.getItem('login'));
  if (login) {
    axiosInstance.defaults.headers['authorization'] = login.token;
    await axiosInstance.put(`/api/cart/${login.customerId}`, obj);
    const response = await axiosInstance.get(`/api/cart/${login.customerId}`);
    dispatch(actions.initCartAc(response.data));
    history.push('/cart');
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  console.log(id);
  const login = await JSON.parse(localStorage.getItem('login'));
  if (login) {
    axiosInstance.defaults.headers['authorization'] = login.token;
    await axiosInstance.delete(`/api/cart/${login.customerId}/${id}`);
    const response = await axiosInstance.get(`/api/cart/${login.customerId}`);
    console.log(response);
    dispatch(actions.initCartAc(response.data));
    history.push('/cart');
  }
};
export default {
  initCartLS,
  addToCartLS,
  updateCartItemLS,
  deleteCartItemLS,
  initCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
};
