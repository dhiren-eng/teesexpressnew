import React from 'react';
import { Field, reduxForm, unregisterField } from 'redux-form';
import axiosInstance from '../../backendApiCall/axiosInstance';
import SetCustomerPasswordForm from './SetCustomerPasswordForm';

class RegisterCustomerForm extends React.Component {
  renderError = ({ error, touched, visited }) => {
    if (visited && error) {
      return (
        <div
          class="alert alert-danger alert-dismissible"
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
    console.log(input);
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} disabled={disabled} />
        <br />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmitt = async (formValues) => {
    var addressArray = [];
    addressArray.push(formValues.address);
    formValues.address = addressArray;
    console.log(formValues);
    await this.props.registerCustomerAction(formValues);
    await this.props.userLogin(formValues.Email, formValues.password);
  };
  render() {
    console.log(this.props.mode === 'edit');
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmitt)}>
        <Field
          name="Email"
          component={this.renderInputt}
          label="Email: "
          type="text"
          disabled={this.props.mode === 'edit'}
        />
        <Field
          name="mobileNumber"
          component={this.renderInputt}
          label="Mobile Number: "
          type="number"
          disabled={this.props.mode === 'edit'}
        />
        <Field
          name="fullName"
          component={this.renderInputt}
          type="text"
          label="Full Name: "
        />
        {this.props.removePasswordForm ? (
          <React.Fragment></React.Fragment>
        ) : (
          <SetCustomerPasswordForm renderInput={this.renderInputt} />
        )}
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
  console.log(formValues);
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
  if (!formValues.address) {
    errors.address = 'Field cannot be empty';
  }
  if (!formValues.password) {
    errors.password = 'Field cannot be empty';
  }
  if (!formValues.confirmPassword) {
    errors.confirmPassword = 'Field cannot be empty';
  }
  console.log(formValues.password && formValues.confirmPassword);
  if (formValues.password && formValues.confirmPassword) {
    console.log(formValues.password.localeCompare(formValues.confirmPassword));
    if (formValues.password.localeCompare(formValues.confirmPassword) != 0) {
      console.log('inside if');
      errors.confirmPassword = 'Passwords do not match !';
    }
  }

  return errors;
};
export default reduxForm({ form: 'registerPage', validate })(
  RegisterCustomerForm
);
