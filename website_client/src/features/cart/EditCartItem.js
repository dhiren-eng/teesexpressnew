import React from 'react';
import { connect } from 'react-redux';
import CategoryDetailsComponent from '../products/CategoryDetailsComponent';
import { cartOperations } from './ducks';
import { bindActionCreators } from 'redux';
const EditCartItem = (props) => {
  const updateCartItemButton = (obj) => {
    return (
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          props.updateCartItem(obj);
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
        button={(obj) => updateCartItemButton(obj)}
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

const mapDispatchToProps = (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      { updateCartItem: cartOperations.updateCartItem },
      dispatch
    );
  } else {
    return bindActionCreators(
      { updateCartItem: cartOperations.updateCartItemLS },
      dispatch
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCartItem);
