import React from 'react';
import RegisterCustomerForm from './RegisterCustomerForm';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddressItem from './AddressItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { customerOperations } from './ducks';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
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
            await props.updateCustomer(newObj);
          }}
        >
          Delete
        </button>
      </React.Fragment>
    );
  };
  const listItemButtons = (address, mode) => {
    console.log(fieldOnChange);
    console.log(address);
    return (
      <React.Fragment>
        {mode === 'selectAddress' ? (
          <React.Fragment>
            <Field
              name="selectedAddress"
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
    var newMode;
    if (props.mode) {
      newMode = 'selectAddress';
    } else {
      newMode = 'editProfile';
    }
    return (
      <div className="container-fluid p-3">
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
        >
          <AddressList
            itemList={props.userInfo.shippingAddress}
            listItemButtons={(address) => listItemButtons(address, newMode)}
          />
        </RegisterCustomerForm>
        <Link to="/addressModal" className="btn btn-primary">
          Add Address
        </Link>
      </div>
    );
  } else {
    return <div></div>;
  }
};
const mapStateToProps = (state) => {
  return {
    form: state.form.registerPage,
    userInfo: state.login.userInfo,
  };
};
export default connect(mapStateToProps, {
  updateCustomer: customerOperations.updateCustomer,
})(Profile);
