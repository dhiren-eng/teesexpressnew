import React from 'react';
import { connect } from 'react-redux';
import { cartOperations } from './ducks';
const DeleteCartItem = (props) => {
  props.deleteCartItemLS(props.match.params.id);
  return <div>Delete Successful</div>;
};
export default connect(null, {
  deleteCartItemLS: cartOperations.deleteCartItemLS,
})(DeleteCartItem);
