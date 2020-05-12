import React from 'react';
import { Field, reduxForm } from 'redux-form';
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
  renderInputt = ({ input, label, meta, type }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" type={type} />
        <br />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmitt = async (formValues) => {
    await this.props.registerCustomerAction(formValues);
    await this.props.userLogin(formValues.Email, formValues.password);
  };
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmitt)}>
        <Field
          name="Email"
          component={this.renderInputt}
          label="Email: "
          type="text"
        />
        <Field
          name="mobileNumber"
          component={this.renderInputt}
          label="Mobile Number: "
          type="number"
        />
        <Field
          name="fullName"
          component={this.renderInputt}
          type="text"
          label="Full Name: "
        />
        <Field
          name="address"
          component={this.renderInputt}
          type="text"
          label="Delivery Address: "
        />
        {this.props.removePasswordForm ? (
          <React.Fragment></React.Fragment>
        ) : (
          <SetCustomerPasswordForm renderInput={this.renderInputt} />
        )}
        <button>Submit</button>
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
export default reduxForm({ form: 'loginPage', validate })(RegisterCustomerForm);
