import { Field } from 'redux-form';
import React from 'react';
class SetCustomerPasswordForm extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Field
          name="password"
          label="Enter Password"
          component={this.props.renderInput}
          type="password"
        />
        <Field
          name="confirmPassword"
          label="Confirm Password"
          component={this.props.renderInput}
          type="password"
        />
      </React.Fragment>
    );
  }
}
export default SetCustomerPasswordForm;
