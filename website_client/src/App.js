import React from 'react';
import Header from './features/navbarHeader/Header';
import { Router, Route } from 'react-router-dom';
import history from './history';
import LoginForm from './features/login/LoginForm';
import Homepage from './features/home/Homepage';
import CartListContainer from './features/cart/CartListContainer';
import CategoryDetailsContainer from './features/products/CategoryDetailsContainer';
import EditCartItem from './features/cart/EditCartItem';
import DeleteCartItem from './features/cart/DeleteCartItem';
class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={LoginForm} />
          <Route
            path="/products/:id"
            exact
            component={CategoryDetailsContainer}
          />
          <Route path="/cart" exact component={CartListContainer} />
          <Route path="/cart/edit/:id" exact component={EditCartItem} />
          <Route path="/cart/delete/:id" exact component={DeleteCartItem} />
        </div>
      </Router>
    );
  }
}
export default App;
