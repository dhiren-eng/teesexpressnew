import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axiosInstance from '../../backendApiCall/axiosInstance';
import SetCustomerPasswordForm from './SetCustomerPasswordForm';
import calTotalPrice from '../../utilities/calTotalPrice';
import history from '../../history';
class RegisterCustomerForm extends React.Component {
  renderError = ({ error, touched, visited }) => {
    if (visited && error) {
      return (
        <div
          className="alert alert-danger alert-dismissible"
          style={{
            fontSize: '10px',
            lineHeight: '2px',
            verticalAlign: 'middle',
            display: 'inline-block',
          }}
        >
          {' '}
          {error}
        </div>
      );
    }
  };
  renderInputt = ({ input, label, meta, type, disabled }) => {
    return (
      <React.Fragment>
        <label>
          <strong>{label}</strong>
        </label>
        {type === 'radio' ? (
          <input
            {...input}
            autoComplete="off"
            type={type}
            disabled={disabled}
          />
        ) : (
          <input
            {...input}
            autoComplete="off"
            type={type}
            disabled={disabled}
            className="form-control w-75 border-info"
          />
        )}
        {type === 'radio' ? <React.Fragment></React.Fragment> : <br />}
        {this.renderError(meta)}
      </React.Fragment>
    );
  };
  onSubmitt = async (formValues) => {
    if (
      this.props.mode === 'orderAsGuest' ||
      this.props.mode === 'selectAddress'
    ) {
      var obj = {
        items: this.props.cart,
        fullName: formValues.fullName,
        phone: formValues.mobileNumber,
        email: formValues.Email,
        address: formValues.deliveryAddress,
        priceInfo: calTotalPrice(this.props.cart),
      };
      await this.props.addOrder(obj, this.props.cart);
      history.push('/orderSuccess');
    } else {
      var addressArray = [];
      formValues.address = addressArray;
      await this.props.registerCustomerAction(formValues);
      await this.props.userLogin(formValues.Email, formValues.password);
    }
  };
  render() {
    if (this.props.getFieldOnChange) {
      this.props.getFieldOnChange(this.renderInputt);
    }
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmitt)}>
        <Field
          name="Email"
          component={this.renderInputt}
          label="Email: "
          type="text"
          disabled={
            this.props.mode === 'editProfile' ||
            this.props.mode === 'selectAddress'
          }
        />
        <Field
          name="mobileNumber"
          component={this.renderInputt}
          label="Mobile Number: "
          type="number"
          disabled={this.props.mode === 'editProfile'}
        />
        <Field
          name="fullName"
          component={this.renderInputt}
          type="text"
          label="Full Name: "
        />
        {this.props.mode === 'orderAsGuest' && (
          <Field
            name="deliveryAddress"
            component={this.renderInputt}
            type="text"
            label="Delivery Address: "
          />
        )}
        {this.props.mode === 'selectAddress' && (
          <div>
            <strong>SELECT ADDRESS :</strong>
            <br />
            <br />
            {this.props.children}
          </div>
        )}
        {this.props.mode === 'editProfile' && (
          <div>
            <br />
            <br />
            <strong>SAVED ADDRESSES</strong> <br />
            <br />
            {this.props.children}
          </div>
        )}
        {this.props.addAddress && this.props.addAddress()}
        {this.props.mode ? (
          <React.Fragment></React.Fragment>
        ) : (
          <SetCustomerPasswordForm renderInput={this.renderInputt} />
        )}
        {this.props.paymentDetailsForm && this.props.paymentDetailsForm()}
        {this.props.renderButton ? (
          this.props.renderButton()
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.Email) {
    errors.Email = 'Field cannot be empty';
  }
  if (!formValues.mobileNumber) {
    errors.mobileNumber = 'Field cannot be empty';
  }
  if (!formValues.fullName) {
    errors.fullName = 'Field cannot be empty';
  }
  if (!formValues.deliveryAddress) {
    errors.deliveryAddress = 'Field cannot be empty';
  }
  if (!formValues.password) {
    errors.password = 'Field cannot be empty';
  }
  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'Field cannot be empty';
  }
  if (formValues.password && formValues.confirmPassword) {
    console.log(formValues.password.localeCompare(formValues.confirmPassword));
    if (formValues.password.localeCompare(formValues.confirmPassword) != 0) {
      console.log('inside if');
      errors.confirmPassword = 'Passwords do not match !';
    }
  }
  return errors;
};
export default reduxForm({
  form: 'registerPage',
  destroyOnUnmount: false,
  validate,
})(RegisterCustomerForm);
