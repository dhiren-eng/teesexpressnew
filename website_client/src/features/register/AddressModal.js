import React from 'react';
import Modal11 from '../../Modal11';
import { customerOperations } from './ducks';
import { connect } from 'react-redux';
class AddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.match.params.address,
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
          onClick={async () => {
            var arr = this.props.userInfo.shippingAddress;
            arr = arr.filter(
              (element) => element != this.props.match.params.address
            );
            arr.push(this.state.address);
            await this.props.updateCustomer({ address: arr });
          }}
        >
          Save Changes
        </button>
      </div>
    );
  };
  render() {
    console.log(this.props.match.params.address);
    return <Modal11 modalContent={() => this.modalContent()} />;
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.login.userInfo,
  };
};
export default connect(mapStateToProps, {
  updateCustomer: customerOperations.updateCustomer,
})(AddressModal);
