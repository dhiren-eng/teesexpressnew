import React from 'react';
import { connect } from 'react-redux';
import { customerOperations } from './ducks';
import { loginOperations } from '../login/ducks';
import RegisterCustomerForm from './RegisterCustomerForm';
import { Field } from 'redux-form';
const RegisterCustomerContainer = (props) => {
  const renderButton = () => {
    return (
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    );
  };
  const fetchErrorMessage = () => {
    if (props.fetchError) {
      var message;
      const statuscode = parseInt(
        props.fetchError.message.split(' ').pop(),
        10
      );
      console.log(statuscode);
      if (statuscode == 410) {
        message =
          'A customer is already registered with the entered Email ID. Please enter a different email ID';
      }
      return (
        <div
          class="alert alert-danger alert-dismissible"
          style={{ fontSize: '10px' }}
        >
          {' '}
          {message}
        </div>
      );
    }
  };
  return (
    <div class="container-fluid p-3">
      <h3>
        <u style={{ textDecorationSkipInk: 'none' }}>Sign Up in TeesExpress</u>
      </h3>
      <br />
      {fetchErrorMessage()}
      <RegisterCustomerForm
        registerCustomerAction={props.registerCustomer}
        userLogin={props.userLogin}
        renderButton={renderButton}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    fetchError: state.fetchError.error,
  };
};
export default connect(mapStateToProps, {
  registerCustomer: customerOperations.registerCustomer,
  userLogin: loginOperations.userLogin,
})(RegisterCustomerContainer);
