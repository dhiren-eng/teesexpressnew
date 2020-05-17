import React from 'react';
import Profile from '../register/Profile';
const PlaceOrderPage = () => {
  return (
    <div style={{ marginTop: '5px' }}>
      <Profile mode="selectAddress" />
      <div className="container-fluid p-3">
        <h2>
          <u style={{ textDecorationSkipInk: 'none' }}>Payment Details</u>
        </h2>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="btn btn-danger">Pay advance and place order</button>
      </div>
    </div>
  );
};
export default PlaceOrderPage;
