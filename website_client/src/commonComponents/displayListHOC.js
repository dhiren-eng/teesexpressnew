import React from 'react';
const displayListHOC = (ItemComponent) => (props) => {
  return (
    <div>
      {props.itemList.map((element) => {
        return (
          <div key={element.id}>
            <ItemComponent item={element} itemButtons={props.listItemButtons} />
          </div>
        );
      })}
    </div>
  );
};

export default displayListHOC;
