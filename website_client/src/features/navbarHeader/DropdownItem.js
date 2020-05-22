import React from 'react';
import { Link } from 'react-router-dom';

const DropdownItem = (props) => {
  return (
    <li>
      <Link
        to={`/products/${props.item._id}`}
        className="loginlink"
        style={{ display: 'block' }}
      >
        {props.item.cateName}
      </Link>
      <div className="dropdown-divider"></div>
    </li>
  );
};

export default DropdownItem;
