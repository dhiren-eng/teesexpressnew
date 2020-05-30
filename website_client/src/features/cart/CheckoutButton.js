import React from 'react';
import { Link } from 'react-router-dom';
const CheckoutButton = () => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return (
      <Link to="/placeOrderPage" className="btn btn-danger">
        Place order with advance payment
      </Link>
    );
  } else {
    return (
      <React.Fragment>
        <Link to="/loginModal/showOrderOptions" className="btn btn-danger">
          Place order with advance payment
        </Link>
        <br />
        <br />
        <Link to="/" className="btn btn-info">
          Continue Shopping
        </Link>
      </React.Fragment>
    );
  }
};
export default CheckoutButton;
