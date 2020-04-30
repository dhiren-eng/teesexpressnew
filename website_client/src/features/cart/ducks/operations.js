import actions from './actions';
const initCartLS = () => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  dispatch(actions.initCartAc(contents));
  const cartContent = JSON.stringify(contents);
  localStorage.setItem('cart', cartContent);
};
const addToCartLS = (cartItem) => async (dispatch) => {
  let contents = JSON.parse(localStorage.getItem('cart') || '[]');
  contents.push({ ...cartItem, id: contents.length });
  dispatch(actions.addToCartAc(contents));
  const cartContent = JSON.stringify(contents);
  await localStorage.setItem('cart', cartContent);
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
};
export default { initCartLS, addToCartLS, updateCartItemLS };
