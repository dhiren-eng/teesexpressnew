import React from 'react';
import Profile from '../register/Profile';
import RegisterCustomerForm from '../register/RegisterCustomerForm';
import calTotalPrice from '../../utilities/calTotalPrice';
import { formValueSelector } from 'redux-form';
import { orderOperations } from './ducks';
import { connect } from 'react-redux';

const PlaceOrderPage = (props) => {
  const login = JSON.parse(localStorage.getItem('login'));
  const renderButton = () => {
    if (props.cart.length !== 0) {
      return (
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-danger">
            Pay advance and place order
          </button>
        </div>
      );
    } else {
      return (
        <div
          class="alert alert-danger alert-dismissible"
          style={{
            fontSize: '15px',
            textAlign: 'center',
            verticalAlign: 'middle',
            display: 'inline-block',
          }}
        >
          Cart is empty ! Please select a product to place order
        </div>
      );
    }
  };
  const paymentDetailsForm = () => {
    return (
      <div className="container-fluid p-3">
        <h2>
          <u style={{ textDecorationSkipInk: 'none' }}>Payment Details</u>
        </h2>
      </div>
    );
  };
  return (
    <div style={{ marginTop: '5px' }}>
      {login ? (
        <Profile
          mode="selectAddress"
          renderButton={renderButton}
          cart={props.cart}
          addOrder={props.addOrder}
          paymentDetailsForm={paymentDetailsForm}
        />
      ) : (
        <div class="container-fluid p-3">
          <h2>
            <u style={{ textDecorationSkipInk: 'none' }}>Place Order</u>
          </h2>
          <br />
          <RegisterCustomerForm
            mode="orderAsGuest"
            renderButton={renderButton}
            cart={props.cart}
            addOrder={props.addOrder}
            paymentDetailsForm={paymentDetailsForm}
          />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, { addOrder: orderOperations.addOrder })(
  PlaceOrderPage
);
