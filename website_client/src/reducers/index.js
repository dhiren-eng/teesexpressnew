import { combineReducers } from 'redux';
import loginReducer from '../features/login/ducks';
import { reducer as formReducer } from 'redux-form';
import productReducer from '../features/products/ducks';
import cartReducer from '../features/cart/ducks';
import fetchErrorReducer from './fetchErrorReducer';
import orderReducer from '../features/orders/ducks';
export default combineReducers({
  fetchError: fetchErrorReducer,
  login: loginReducer,
  form: formReducer,
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});
