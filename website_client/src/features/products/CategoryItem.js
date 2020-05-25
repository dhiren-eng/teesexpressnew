import React from 'react';
import { Link } from 'react-router-dom';
const CategoryItem = (props) => {
  return (
    <div>
      <Link to={`/products/${props.item._id}`}>
        <img
          src={`public${props.item.url}`}
          className="d-flex img-fluid"
          alt={props.item.cateName}
        />
      </Link>
    </div>
  );
};
export default CategoryItem;
