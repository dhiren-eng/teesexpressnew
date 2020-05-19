import React from 'react';
const displayListHOC = (ItemComponent) => (props) => {
  console.log(props.itemList);
  return (
    <React.Fragment>
      {props.itemList.map((element) => {
        return (
          <React.Fragment key={element.id}>
            <ItemComponent item={element} itemButtons={props.listItemButtons} />
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default displayListHOC;
