import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axiosInstance from '../../backendApiCall/axiosInstance';
import GoogleAuthButton from './GoogleAuthButton';

class LoginPage extends React.Component {
  async componentDidMount() {
    const response = await axiosInstance.get('/api/category/all');
    console.log(response);
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return <div>{error}</div>;
    }
  }
  renderInputt = ({ input, label, meta }) => {
    console.log(meta);
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  onSubmitt(formValues) {
    console.log(formValues);
  }
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmitt)}>
        <Field name="Email" component={this.renderInputt} label="Email:" />
        <Field
          name="Password"
          component={this.renderInputt}
          label="Password:"
        />
        <button>Submit</button>
      </form>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.Email) {
    errors.Email = 'Email field cannot be empty';
  }
  if (!formValues.Password) {
    errors.Password = 'Password field cannot be empty';
  }
  return errors;
};
export default reduxForm({ form: 'loginPage', validate })(LoginPage);
