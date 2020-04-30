import React from 'react';
import { connect } from 'react-redux';
import CategoryDetailsComponent from '../products/CategoryDetailsComponent';
import { cartOperations } from './ducks';
const EditCartItem = (props) => {
  const updateCartItemButton = (id, obj) => {
    console.log(id);
    console.log(obj);
    return (
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          props.updateCartItem(id, obj);
        }}
      >
        Update Cart Item
      </button>
    );
  };
  if (props.cartItem) {
    return (
      <CategoryDetailsComponent
        item={props.cartItem}
        button={(obj) => updateCartItemButton(props.match.params.id, obj)}
        editCartItem="true"
      />
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  console.log(id);
  const itemArr = state.cart.filter((item) => item.id == id);
  const item = itemArr[0];
  console.log(item);
  return {
    cartItem: item,
  };
};
export default connect(mapStateToProps, {
  updateCartItem: cartOperations.updateCartItemLS,
})(EditCartItem);
