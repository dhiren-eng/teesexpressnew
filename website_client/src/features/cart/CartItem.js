import React from 'react';
const CartItem = (props) => {
  const itemId = props.item.id;
  console.log(itemId);
  return (
    <div className="card w-75">
      <div className="card-header">CartItem #{props.item.id}</div>
      <div className="card-body">
        <div className="card-title">{props.item.category}</div>
        {props.itemButtons(itemId)}
      </div>
    </div>
  );
};
export default CartItem;
