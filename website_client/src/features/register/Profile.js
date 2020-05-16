import React from 'react';
import RegisterCustomerForm from './RegisterCustomerForm';
import { connect } from 'react-redux';
import _ from 'lodash';
import AddressItem from './AddressItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { customerOperations } from './ducks';
import { Link } from 'react-router-dom';
let AddressList = displayListHOC(AddressItem);
const Profile = (props) => {
  const listItemButtons = (address) => {
    console.log(address);
    return (
      <div className="float-right">
        <Link to={`/addressModal/${address}`} className="btn btn-primary">
          Edit
        </Link>
        <button
          type="button"
          class="card-link btn btn-danger"
          onClick={async () => {
            var arr = props.userInfo.shippingAddress;
            arr = arr.filter((element) => element != address);
            const newObj = props.form.values;
            newObj.address = arr;
            await props.updateCustomer(newObj);
          }}
        >
          Delete
        </button>
      </div>
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
    return (
      <div className="container-fluid p-3">
        <h2>
          <u style={{ textDecorationSkipInk: 'none' }}>My Profile</u>
        </h2>
        <br />
        <RegisterCustomerForm
          initialValues={obj}
          mode="edit"
          removePasswordForm="true"
        />
        <br />
        <br />
        <strong>SAVED ADDRESSES :</strong>
        <br />
        <br />
        <AddressList
          itemList={props.userInfo.shippingAddress}
          listItemButtons={(address) => listItemButtons(address)}
        />
        <br />
        <button type="button" className="btn btn-primary">
          Add Address
        </button>
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
