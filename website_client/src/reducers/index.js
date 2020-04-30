import { combineReducers } from 'redux';
import authReducer from '../features/login/ducks';
import { reducer as formReducer } from 'redux-form';
import productReducer from '../features/products/ducks';
import cartReducer from '../features/cart/ducks';
import fetchErrorReducer from './fetchErrorReducer';
export default combineReducers({
  fetchError: fetchErrorReducer,
  signInStatus: authReducer,
  form: formReducer,
  products: productReducer,
  cart: cartReducer,
});
