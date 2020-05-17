import React from 'react';
import Modal11 from '../../Modal11';
import { customerOperations } from './ducks';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
class AddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.match.params.address,
      fullName: props.name,
    };
  }
  handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  modalContent = () => {
    return (
      <div>
        <label htmlFor="editAddress">Edit Address : </label>
        <textarea
          rows="7"
          columns="50"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={async () => {
            var arr = this.props.userInfo.shippingAddress;
            arr = arr.filter(
              (element) => element != this.props.match.params.address
            );
            arr.push(this.state.address);
            console.log(this.state.fullName);
            await this.props.updateCustomer({
              fullName: this.state.fullName,
              address: arr,
            });
          }}
        >
          Save Changes
        </button>
      </div>
    );
  };
  render() {
    return <Modal11 modalContent={() => this.modalContent()} />;
  }
}
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  const fullName1 = selector(state, 'fullName');
  console.log(fullName1);
  return {
    name: fullName1,
    userInfo: state.login.userInfo,
  };
};
export default connect(mapStateToProps, {
  updateCustomer: customerOperations.updateCustomer,
})(AddressModal);
