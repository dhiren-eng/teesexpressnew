import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { Link } from 'react-router-dom';
import { cartOperations } from './ducks';
import { bindActionCreators } from 'redux';
import CheckoutButton from './CheckoutButton';
import calTotalPrice from '../../utilities/calTotalPrice';
const CartListComponent = displayListHOC(CartItem);
const CartListContainer = (props) => {
  const listItemButtons = (id) => {
    console.log(id);
    return (
      <div>
        <Link to={`/cart/edit/${id}`} className="btn btn-primary card-link">
          Edit Item
        </Link>
        <button
          className="btn btn-danger card-link"
          onClick={(e) => {
            e.preventDefault();
            props.deleteCartItem(id);
          }}
        >
          Delete Item
        </button>
      </div>
    );
  };

  const cartItemsSummary = (cart) => {
    var n = 0;
    const netPriceInfo = calTotalPrice(props.cart);
    return (
      <div className="table-responsive-md">
        <table className="table">
          <thead className="table-active">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cart Items</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((element) => {
              return (
                <tr>
                  <th scope="col">{++n}</th>
                  <th scope="col">{element.orderName}</th>
                  <th scope="col">{element.totalPriceInfo[0]}</th>
                </tr>
              );
            })}
            <tr className="table-warning">
              <th scope="col"></th>
              <th scope="col">Total Price</th>
              <th scope="col">{netPriceInfo[0]}</th>
            </tr>
            <tr className="table-warning">
              <th scope="col"></th>
              <th scope="col">Advance</th>
              <th scope="col">{netPriceInfo[1]}</th>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}>
          <CheckoutButton />
        </div>
      </div>
    );
  };
  if (props.cart.length != 0) {
    return (
      <div className="container-fluid p-3">
        <h2>
          <u style={{ textDecorationSkipInk: 'none' }}>Cart Summary</u>
        </h2>
        <div class="row p-3">
          <br />
          <div className="col-md-7 order-2 order-md-1">
            <CartListComponent
              itemList={props.cart}
              listItemButtons={(id) => listItemButtons(id)}
            />
          </div>
          <div className="col-md-5 order-1 order-md-2">
            <div className="card">
              <div className="card-header">
                <h5>Price Summary :</h5>
              </div>
              <div className="card-body">{cartItemsSummary(props.cart)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid p-5">
        <img
          src="public/uploads/empty-cart.png"
          alt="empty cart"
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            verticalAlign: 'center',
            display: 'block',
          }}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    fetchError: state.fetchError.error,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  let login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      { deleteCartItem: cartOperations.deleteCartItem },
      dispatch
    );
  } else {
    return bindActionCreators(
      { deleteCartItem: cartOperations.deleteCartItemLS },
      dispatch
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(CartListContainer);
