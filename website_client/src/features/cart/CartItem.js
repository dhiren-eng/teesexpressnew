import React from 'react';
const CartItem = (props) => {
  const itemId = props.item.id;
  const printingOn = () => {
    if (props.item.printingOn.length != 0) {
      return (
        <React.Fragment>
          {props.item.printingOn.map((element) => {
            return <React.Fragment>{element} </React.Fragment>;
          })}
        </React.Fragment>
      );
    } else {
      return <React.Fragment>None</React.Fragment>;
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h5> # {props.item.orderName}</h5>
      </div>
      <div className="card-body">
        <div className="card-title">{props.item.category}</div>
        <div className="card-text">
          Product type : {props.item.cateName} <br />
          Product color : {props.item.color} <br />
          Sizes : S = {props.item.sizes.S}, M = {props.item.sizes.M}, L ={' '}
          {props.item.sizes.L}, XL = {props.item.sizes.XL}, XXL ={' '}
          {props.item.sizes.XXL} <br />
          Printing On : {printingOn()}
          <br />
          Total Quantity : {props.item.totalQuantity}
          <br />
          Price Per Pc : {props.item.pricePerUnit} INR
          <br />
          Total Price : {props.item.totalPriceInfo[0]} INR
          <br />
          <br />
        </div>
        {props.itemButtons && props.itemButtons(itemId)}
      </div>
    </div>
  );
};
export default CartItem;
