import React from 'react';
import CartIcon from '../cart/CartIcon';
import { Link } from 'react-router-dom';
import LoginButton from '../login/LoginButton';
import displayListHOC from '../../commonComponents/displayListHOC';
import './Header.css';
import DropdownItem from './DropdownItem';
import SearchInput from '../search/SearchInput';
import { connect } from 'react-redux';
const DropdownList = displayListHOC(DropdownItem);
class Header extends React.Component {
  render() {
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
                  {this.props.products ? (
                    <DropdownList itemList={this.props.products} />
                  ) : (
                    <div></div>
                  )}
                </ul>
              </div>
              <Link to="/aboutUs" className="nav-link">
                ABOUT US
              </Link>

              <Link to="/orderSample" className="nav-link">
                ORDER SAMPLE
              </Link>

              <Link to="/clearanceSale" className="nav-link">
                CLEARANCE SALE
              </Link>
            </div>
            <div className="container-4 nav-item ml-auto">
              <SearchInput />
            </div>
          </div>

          <div className="d-flex ml-auto navi-rightt order-2 order-md-3">
            <Link
              to="/cart"
              style={{
                width: '50px',
              }}
            >
              <CartIcon />
            </Link>
            <LoginButton />
          </div>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = (state) => {
  const products = Object.values(state.products);
  return {
    products,
  };
};
export default connect(mapStateToProps, null)(Header);
