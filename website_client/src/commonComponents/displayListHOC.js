import React from 'react';
const displayListHOC = (ItemComponent) => (props) => {
  console.log(props.listItemButtons);
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
