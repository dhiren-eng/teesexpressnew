import React from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import displayListHOC from '../../commonComponents/displayListHOC';
import { Link } from 'react-router-dom';
const CartListComponent = displayListHOC(CartItem);
const CartListContainer = (props) => {
  const listItemButtons = (id) => {
    console.log(id);
    return (
      <div>
        <Link to={`/cart/edit/${id}`} className="btn btn-primary">
          Edit Item
        </Link>
        <Link to={`/cart/delete/${id}`} className="btn btn-danger">
          Delete Item
        </Link>
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
export default connect(mapStateToProps, null)(CartListContainer);
