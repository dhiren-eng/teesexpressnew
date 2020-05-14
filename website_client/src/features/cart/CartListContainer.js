import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { Link } from 'react-router-dom';
import { cartOperations } from './ducks';
import { bindActionCreators } from 'redux';
const CartListComponent = displayListHOC(CartItem);
const CartListContainer = (props) => {
  const listItemButtons = (id) => {
    console.log(id);
    return (
      <div>
        <Link to={`/cart/edit/${id}`} className="btn btn-primary">
          Edit Item
        </Link>
        <button
          className="btn btn-danger"
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
  if (props.cart.length != 0) {
    return (
      <div>
        <CartListComponent
          itemList={props.cart}
          listItemButtons={(id) => listItemButtons(id)}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state) => {
  return {
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
