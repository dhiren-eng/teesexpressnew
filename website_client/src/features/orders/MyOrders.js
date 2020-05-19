import React from 'react';
import displayListHOC from '../../commonComponents/displayListHOC';
import OrderItem from './OrderItem';
import { connect } from 'react-redux';
import { orderOperations } from './ducks';
let OrderList = displayListHOC(OrderItem);
class MyOrders extends React.Component {
  componentDidMount = async () => {
    const login = JSON.parse(localStorage.getItem('login'));
    if (login) {
      await this.props.fetchOrders(login.usrEmail);
    }
  };
  render() {
    console.log(this.props.orders);
    if (this.props.orders) {
      return (
        <div className="container-fluid p-3">
          <OrderList itemList={this.props.orders} />
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};
export default connect(mapStateToProps, {
  fetchOrders: orderOperations.fetchOrders,
})(MyOrders);
