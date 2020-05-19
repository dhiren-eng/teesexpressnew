import React from 'react';
import Modal11 from '../../Modal11';
import { customerOperations } from './ducks';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import history from '../../history';
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
        <label htmlFor="editAddress" style={{ display: 'block' }}>
          {this.props.match.params.address
            ? 'Edit Address : '
            : 'New Address : '}
        </label>
        <textarea
          rows="7"
          columns="50"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
          style={{ display: 'block' }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={async () => {
            var arr = this.props.userInfo.shippingAddress;
            if (this.props.match.params.address) {
              arr = arr.filter(
                (element) => element != this.props.match.params.address
              );
              arr.push(this.state.address);
            } else {
              arr.push(this.state.address);
            }
            await this.props.updateCustomer({
              fullName: this.state.fullName,
              address: arr,
            });
            history.goBack();
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
