import React from 'react';
import { connect } from 'react-redux';
import { orderOperations } from './ducks';
import { formValueSelector } from 'redux-form';
class OrderSuccessPage extends React.Component {
  componentDidMount = async () => {
    if (this.props.orders.length == 0) {
      await this.props.fetchOrders();
    }
  };
  render() {
    if (this.props.orders.length !== 0) {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          <h2>Order Successfully Placed</h2>
          <br />
          <h3>
            Order Id : {this.props.orders[this.props.orders.length - 1].orderId}
          </h3>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state) => {
  const selector = formValueSelector('registerPage');
  const email = selector(state, 'Email');
  return {
    orders: state.orders,
    email,
  };
};
export default connect(mapStateToProps, {
  fetchOrders: orderOperations.fetchOrders,
})(OrderSuccessPage);
