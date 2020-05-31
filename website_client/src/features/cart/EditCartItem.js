import React from 'react';
import { connect } from 'react-redux';
import CategoryDetailsComponent from '../products/CategoryDetailsComponent';
import { cartOperations } from './ducks';
import { bindActionCreators } from 'redux';
import LoadingOverlay from 'react-loading-overlay';
import { loader } from '../loadFeature/ducks';
const EditCartItem = (props) => {
  const updateCartItemButton = (obj) => {
    return (
      <button
        className="btn btn-primary"
        onClick={async (e) => {
          e.preventDefault();
          props.startLoader(true);
          await props.updateCartItem(obj);
          props.startLoader(false);
        }}
      >
        Update Cart Item
      </button>
    );
  };
  if (props.cartItem) {
    return (
      <LoadingOverlay
        active={props.isLoading}
        spinner
        text="Loading your content..."
      >
        <CategoryDetailsComponent
          item={props.cartItem}
          button={(obj) => updateCartItemButton(obj)}
          editCartItem="true"
        />
      </LoadingOverlay>
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
    isLoading: state.isLoading.startLoad,
  };
};

const mapDispatchToProps = (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      {
        updateCartItem: cartOperations.updateCartItem,
        startLoader: loader.startLoader,
      },
      dispatch
    );
  } else {
    return bindActionCreators(
      {
        updateCartItem: cartOperations.updateCartItemLS,
        startLoader: loader.startLoader,
      },
      dispatch
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCartItem);
