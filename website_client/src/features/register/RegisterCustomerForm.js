import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SetCustomerPasswordForm from './SetCustomerPasswordForm';
import calTotalPrice from '../../utilities/calTotalPrice';
import history from '../../history';
import { loader } from '../loadFeature/ducks';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
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
      if (formValues.deliveryAddress) {
        this.props.startLoader(true);
        const response = await this.props.addOrder(obj, this.props.cart);
        this.props.startLoader(false);
        console.log(response);
        if (response) {
          history.push(`/orderSuccess/`);
        } else {
          const registerStatus = 'registered';
          history.push(`/orderSuccess/${registerStatus}`);
        }
      }
    } else {
      var addressArray = [];
      formValues.address = addressArray;
      console.log(formValues);
      this.props.startLoader(true);
      const response = await this.props.registerCustomerAction(formValues);
      console.log(response);
      if (response) {
        console.log('inside if');
        await this.props.userLogin(formValues.Email, formValues.password);
        history.push('/');
      }
      this.props.startLoader(false);
    }
  };
  addressMissingError = () => {
    return (
      <React.Fragment>
        {this.props.deliveryAddress1 || this.props.mode === 'editProfile' ? (
          <React.Fragment></React.Fragment>
        ) : (
          <div
            class="alert alert-danger alert-dismissible"
            style={{ fontSize: '10px', display: 'inline-block' }}
          >
            {' '}
            Delivery Address required ! Please select an address
          </div>
        )}
        <br />
        {this.props.addAddress()}
      </React.Fragment>
    );
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
        {this.props.addAddress && this.addressMissingError()}
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
  console.log(errors);
  return errors;
};
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  const deliveryAddress1 = selector(state, 'deliveryAddress');
  return {
    deliveryAddress1,
  };
};
const rcf = reduxForm({
  form: 'registerPage',
  destroyOnUnmount: false,
  validate,
})(RegisterCustomerForm);
export default connect(mapStateToProps, {
  startLoader: loader.startLoader,
})(rcf);
