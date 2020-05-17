import React from 'react';

const AddressItem = (props) => {
  return (
    <div>
      <div class="card w-75 border-info">
        <div class="card-body">{props.itemButtons(props.item)}</div>
      </div>
      <br />
    </div>
  );
};
export default AddressItem;
