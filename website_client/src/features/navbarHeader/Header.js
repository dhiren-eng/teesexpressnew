import React from 'react';
import GoogleAuthButton from '../login/GoogleAuthButton';
import CartIcon from './CartIcon';
import { Link } from 'react-router-dom';
import './Header.css';
class Header extends React.Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-md sticky-top navbar-dark navbar-custom"
        style={{ padding: '0px' }}
      >
        <div className="container-fluid d-flex flex-row">
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            style={{ padding: '10px' }}
          >
            <i className="material-icons md-light" style={{ color: 'white' }}>
              dehaze
            </i>
          </button>
          <Link
            to="/"
            href="#"
            className="navbar-brand flex-md-grow-0 flex-grow-1"
            style={{ textAlign: 'center', padding: '0px' }}
          >
            teesexpress
          </Link>

          <div
            className="collapse navbar-collapse toggler-expandd order-3 order-md-2"
            id="navbarResponsive"
          >
            <div className="navbar-nav">
              <Link
                to="/shop"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                data-target="#shop"
              >
                SHOP
                <span className="caret"></span>
              </Link>

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
              <input type="search" id="search" placeholder="Search..." />
              <button type="button" className="btn d-flex search-button">
                <i className="material-icons">search</i>
              </button>
            </div>
          </div>

          <div className="d-flex ml-auto navi-rightt order-2 order-md-3">
            <Link to="/cart">
              <CartIcon />
            </Link>
            <Link
              to="/login"
              style={{
                margin: '15px 10px',
              }}
            >
              <i className="material-icons user-login">person</i>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}
export default Header;
