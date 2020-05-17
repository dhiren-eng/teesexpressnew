import React from 'react';
import Header from './features/navbarHeader/Header';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Homepage from './features/home/Homepage';
import CartListContainer from './features/cart/CartListContainer';
import CategoryDetailsContainer from './features/products/CategoryDetailsContainer';
import EditCartItem from './features/cart/EditCartItem';
import LoginModal from './features/login/LoginModal';
import RegisterCustomerContainer from './features/register/RegisterCustomerContainer';
import Profile from './features/register/Profile';
import PlaceOrderPage from './features/orders/PlaceOrderPage';
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
          <Route path="/loginModal" exact component={LoginModal} />
          <Route
            path="/registerCustomer"
            exact
            component={RegisterCustomerContainer}
          />
          <Route path="/profile" exact component={Profile} />
          <Route path="/placeOrderPage" exact component={PlaceOrderPage} />
        </div>
      </Router>
    );
  }
}
export default App;
