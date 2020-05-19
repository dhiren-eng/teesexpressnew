import React from 'react';
import displayListHOC from '../../commonComponents/displayListHOC';
import CartItem from '../cart/CartItem';
const ItemsInOrderItem = displayListHOC(CartItem);
const OrderItem = (props) => {
  console.log(props.item);
  return (
    <div>
      <h5>{props.item.orderId}</h5>
      <ItemsInOrderItem itemList={props.item.items} />
      <br />
    </div>
  );
};
export default OrderItem;
