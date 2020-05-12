import React from 'react';
import { connect } from 'react-redux';
import { registerCustomerOps } from './ducks';
import { loginOperations } from '../login/ducks';
import RegisterCustomerForm from './RegisterCustomerForm';
const RegisterCustomerContainer = (props) => {
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
    <div>
      {fetchErrorMessage()}
      <RegisterCustomerForm
        registerCustomerAction={props.registerCustomer}
        userLogin={props.userLogin}
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
  registerCustomer: registerCustomerOps.registerCustomer,
  userLogin: loginOperations.userLogin,
})(RegisterCustomerContainer);
