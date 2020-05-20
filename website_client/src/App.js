import React from 'react';
import Header from './features/navbarHeader/Header';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Homepage from './features/home/Homepage';
import CartListContainer from './features/cart/CartListContainer';
import CategoryDetailsContainer from './features/products/CategoryDetailsContainer';
import RegisterCustomerContainer from './features/register/RegisterCustomerContainer';
import Profile from './features/register/Profile';
import PlaceOrderPage from './features/orders/PlaceOrderPage';
import AddressModal from './features/register/AddressModal';
import LoginModal from './features/login/LoginModal';
import EditCartItem from './features/cart/EditCartItem';
import MyOrders from './features/orders/MyOrders';
import OrderSuccessPage from './features/orders/OrderSuccessPage';
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={Homepage} />
          <Route
            path="/products/:id"
            exact
            component={CategoryDetailsContainer}
          />
          <Route path="/cart" exact component={CartListContainer} />
          <Route path="/cart/edit/:id" exact component={EditCartItem} />
          <Route
            path="/loginModal/:orderOption?"
            exact
            component={LoginModal}
          />
          <Route
            path="/registerCustomer"
            exact
            component={RegisterCustomerContainer}
          />
          <Route path="/profile" exact component={Profile} />
          <Route
            path="/addressModal/:address?"
            exact
            component={AddressModal}
          />
          <Route path="/placeOrderPage" exact component={PlaceOrderPage} />
          <Route path="/myOrders" exact component={MyOrders} />
          <Route path="/orderSuccess" exact component={OrderSuccessPage} />
        </div>
      </Router>
    );
  }
}
export default App;
