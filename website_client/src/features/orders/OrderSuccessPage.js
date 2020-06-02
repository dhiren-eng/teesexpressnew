import React from 'react';
import { connect } from 'react-redux';
import { orderOperations } from './ducks';
import { formValueSelector } from 'redux-form';
import _ from 'lodash';
import SetCustomerPasswordForm from '../register/SetCustomerPasswordForm';
import { reduxForm } from 'redux-form';
import history from '../../history';
import LoadingOverlay from 'react-loading-overlay';
import { loader } from '../loadFeature/ducks';
class OrderSuccessPage extends React.Component {
  renderError = ({ error, visited }) => {
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
  renderInput = ({ input, label, meta, type, disabled }) => {
    return (
      <React.Fragment>
        <label>
          <strong>{label}</strong>
        </label>
        <input
          {...input}
          autoComplete="off"
          type={type}
          disabled={disabled}
          className="form-control w-75 border-info"
        />
        {this.renderError(meta)}
      </React.Fragment>
    );
  };
  onSubmitt = async (formValues) => {
    var arr = [];
    arr.push(this.props.deliveryAddress);
    var obj = {
      usrName: this.props.fullName,
      yrPass: formValues.password,
      status: 'Registered',
      shippingAddress: arr,
    };
    this.props.startLoader(true);
    const response = await this.props.registerGuest(this.props.email, obj);
    console.log(response);
    this.props.startLoader(false);
    history.push('/');
  };
  render() {
    console.log(this.props.match.params.registerStatus);
    const login = localStorage.getItem('login');
    if (!_.isEmpty(this.props.currentOrder)) {
      return (
        <LoadingOverlay
          active={this.props.isLoading}
          spinner
          text="Loading your content..."
        >
          <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
            <h2>Order Successfully Placed</h2>
            <br />
            <h3>Order Id : {this.props.currentOrder.orderId}</h3>
            <br />
            Our customer support assigned for your order will get in touch with
            you shortly and remain in contact till you have received your
            consignment
            <br />
            <br />
            <br />
            <form onSubmit={this.props.handleSubmit(this.onSubmitt)}>
              {login || this.props.match.params.registerStatus ? (
                <div></div>
              ) : (
                <div>
                  <strong>
                    You may also register with the provided email, name and
                    phone number to earn points and avail special discounts on
                    further orders
                  </strong>
                  <SetCustomerPasswordForm renderInput={this.renderInput} />
                  <button type="btn btn-primary" type="submit">
                    Register
                  </button>
                </div>
              )}
            </form>
          </div>
        </LoadingOverlay>
      );
    } else if (this.props.fetchError) {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          <strong>
            There was a problem in placing the order ! If the advance has been
            debited from your account, you can contact our customer care
            executive in this number : 1234567890 to get the order manually
            added to our database
          </strong>
        </div>
      );
    } else {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          <strong>
            No new order placed. Please contact our customer care executive in :
            1234567890 if your order was not successfully placed
          </strong>
        </div>
      );
    }
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
  return errors;
};
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  const email = selector(state, 'Email');
  const fullName = selector(state, 'fullName');
  const deliveryAddress = selector(state, 'deliveryAddress');
  return {
    fetchError: state.fetchError.error,
    currentOrder: state.orders.currentOrder,
    email,
    deliveryAddress,
    fullName,
    isLoading: state.isLoading.startLoad,
  };
};
const OrderSuccessForm = reduxForm({
  form: 'OrderSuccessForm',
  validate,
})(OrderSuccessPage);
export default connect(mapStateToProps, {
  registerGuest: orderOperations.registerGuest,
  startLoader: loader.startLoader,
})(OrderSuccessForm);
