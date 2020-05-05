import actions from './actions';
import history from '../../../history';
const initCartLS = () => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  dispatch(actions.initCartAc(contents));
  const cartContent = JSON.stringify(contents);
  localStorage.setItem('cart', cartContent);
};
const addToCartLS = (cartItem) => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  contents.push({ ...cartItem, id: Date.now() });
  dispatch(actions.addToCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
const updateCartItemLS = (id, cartItem) => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  Object.assign(
    contents.find((e) => e.id == id),
    cartItem
  );
  dispatch(actions.updateCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
const deleteCartItemLS = (id) => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  contents = contents.filter((item) => item.id != id);
  dispatch(actions.deleteCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
  history.push('/cart');
};
export default { initCartLS, addToCartLS, updateCartItemLS, deleteCartItemLS };
