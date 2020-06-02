import React from 'react';
import RegisterCustomerForm from './RegisterCustomerForm';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddressItem from './AddressItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { customerOperations } from './ducks';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import LoadingOverlay from 'react-loading-overlay';
import { loader } from '../loadFeature/ducks';
import { formValueSelector } from 'redux-form';
import { change } from 'redux-form';
let AddressList = displayListHOC(AddressItem);
var fieldOnChange;
const Profile = (props) => {
  const getFieldOnChange = (method) => {
    fieldOnChange = method;
  };
  const editAddress = (address) => {
    return (
      <React.Fragment>
        {address}
        <br />
        <br />
        <Link
          to={`/addressModal/${address}`}
          className="btn btn-primary card-link"
        >
          Edit
        </Link>
        <button
          type="button"
          class="card-link btn btn-danger"
          onClick={async () => {
            var arr = props.userInfo.shippingAddress;
            arr = arr.filter((element) => element != address);
            var newObj = props.form.values;
            newObj.address = arr;
            props.startLoader(true);
            await props.updateCustomer(newObj);
            await props.changeRegisterFormValue(
              'registerPage',
              'deliveryAddress',
              ''
            );
            props.startLoader(false);
          }}
        >
          Delete
        </button>
      </React.Fragment>
    );
  };
  const listItemButtons = (address, mode) => {
    return (
      <React.Fragment>
        {mode === 'selectAddress' ? (
          <React.Fragment>
            <Field
              name="deliveryAddress"
              type="radio"
              value={address}
              component={fieldOnChange}
            />{' '}
            <label htmlFor={address}>{address}</label>
          </React.Fragment>
        ) : (
          <div></div>
        )}
        {mode === 'editProfile' ? editAddress(address) : <div></div>}
      </React.Fragment>
    );
  };
  const addAddress = () => {
    return (
      <Link to="/addressModal" className="btn btn-primary">
        Add Address
      </Link>
    );
  };
  if (!_.isEmpty(props.userInfo)) {
    var obj = {
      Email: '',
      mobileNumber: '',
      fullName: '',
      address: [],
    };
    obj.Email = props.userInfo.logName;
    obj.mobileNumber = props.userInfo.phone;
    obj.fullName = props.userInfo.usrName;
    obj.deliveryAddress = props.deliveryAddress1;
    var newMode;
    if (props.mode) {
      newMode = 'selectAddress';
    } else {
      newMode = 'editProfile';
    }
    return (
      <LoadingOverlay
        active={props.isLoading}
        spinner
        text="Loading your content..."
      >
        <div className="container-fluid p-4">
          <h2>
            <u style={{ textDecorationSkipInk: 'none' }}>
              {newMode === 'selectAddress' ? 'Shipping Details' : 'My Profile'}
            </u>
          </h2>
          <br />
          <RegisterCustomerForm
            initialValues={obj}
            mode={newMode}
            getFieldOnChange={getFieldOnChange}
            renderButton={props.renderButton}
            cart={props.cart}
            addOrder={props.addOrder}
            paymentDetailsForm={props.paymentDetailsForm}
            addAddress={addAddress}
          >
            <AddressList
              itemList={props.userInfo.shippingAddress}
              listItemButtons={(address) => listItemButtons(address, newMode)}
            />
          </RegisterCustomerForm>
        </div>
      </LoadingOverlay>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  const deliveryAddress1 = selector(state, 'deliveryAddress');
  return {
    form: state.form.registerPage,
    userInfo: state.login.userInfo,
    isLoading: state.isLoading.startLoad,
    deliveryAddress1,
  };
};
export default connect(mapStateToProps, {
  updateCustomer: customerOperations.updateCustomer,
  startLoader: loader.startLoader,
  changeRegisterFormValue: (formName, field, value) => async (dispatch) => {
    const response = await change(formName, field, value);
    console.log(response);
    dispatch(response);
  },
})(Profile);
