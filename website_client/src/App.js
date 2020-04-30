import React from 'react';
import Header from './features/navbarHeader/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginForm from './features/login/LoginForm';
import Homepage from './features/home/Homepage';
import CartListContainer from './features/cart/CartListContainer';
import CategoryDetailsContainer from './features/products/CategoryDetailsContainer';
import EditCartItem from './features/cart/EditCartItem';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
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
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
