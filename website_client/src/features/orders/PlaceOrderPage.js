import React from 'react';
import Profile from '../register/Profile';
import RegisterCustomerForm from '../register/RegisterCustomerForm';
import calTotalPrice from '../../utilities/calTotalPrice';
import { formValueSelector } from 'redux-form';
import { orderOperations } from './ducks';
import { connect } from 'react-redux';

const PlaceOrderPage = (props) => {
  const login = JSON.parse(localStorage.getItem('login'));
  return (
    <div style={{ marginTop: '5px' }}>
      {login ? (
        <Profile mode="selectAddress" />
      ) : (
        <div class="container-fluid p-3">
          <h2>
            <u style={{ textDecorationSkipInk: 'none' }}>Place Order</u>
          </h2>
          <br />
          <RegisterCustomerForm mode="orderAsGuest" />
        </div>
      )}
      <div className="container-fluid p-3">
        <h2>
          <u style={{ textDecorationSkipInk: 'none' }}>Payment Details</u>
        </h2>
      </div>
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-danger"
          onClick={async () => {
            await props.addOrder(props.orderObj, props.cart);
          }}
        >
          Pay advance and place order
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  var obj = {};
  obj.items = state.cart;
  obj.fullName = selector(state, 'fullName');
  obj.phone = selector(state, 'mobileNumber');
  obj.email = selector(state, 'Email');
  obj.address = selector(state, 'selectedAddress');
  obj.priceInfo = calTotalPrice(state.cart);
  console.log(obj);
  return {
    orderObj: obj,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addOrder: orderOperations.addOrder })(
  PlaceOrderPage
);
