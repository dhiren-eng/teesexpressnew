import React from 'react';

const AddressItem = (props) => {
  return (
    <div class="card w-75">
      <div class="card-body">
        {props.item}
        {props.itemButtons(props.item)}
      </div>
    </div>
  );
};
export default AddressItem;
