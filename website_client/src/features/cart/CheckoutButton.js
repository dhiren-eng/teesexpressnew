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
      <Link to="/loginModal/showOrderOptions" className="btn btn-danger">
        Place order with advance payment
      </Link>
    );
  }
};
export default CheckoutButton;
