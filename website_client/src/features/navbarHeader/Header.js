import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import displayListHOC from '../../commonComponents/displayListHOC';
import './Header.css';
import DropdownItem from './DropdownItem';
import SearchInput from '../search/SearchInput';
import { contextObject } from '../../Context/Store';
const DropdownList = displayListHOC(DropdownItem);
const Header = () => {
  var { products } = useContext(contextObject);
  console.log(products);
  if (products) {
    var productList = Object.values(products[0]);
  }
  return (
    <nav
      className="navbar navbar-expand-md sticky-top navbar-dark navbar-custom"
      style={{ padding: '0px' }}
    >
      <div className="container-fluid d-flex flex-row">
        <Link
          to="#"
          type="button"
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          style={{ padding: '10px' }}
        >
          <i class="fas fa-bars" style={{ color: 'white' }}></i>
        </Link>
        <Link
          to="/"
          href="#"
          className="navbar-brand flex-md-grow-0 flex-grow-1"
          style={{ textAlign: 'center', padding: '0px' }}
        >
          merchexpress
        </Link>

        <div
          className="collapse navbar-collapse toggler-expandd order-3 order-md-2"
          id="navbarResponsive"
        >
          <div className="navbar-nav">
            <div className="nav-item dropdown" style={{ margin: '0px' }}>
              <Link
                to="/shop"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                data-target="#shop"
              >
                SHOP
                <span className="caret"></span>
              </Link>
              <ul className="dropdown-menu" aria-labelled-by="shop">
                {productList ? (
                  <DropdownList itemList={productList} />
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
            <div className="container-4 nav-item ml-auto">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
