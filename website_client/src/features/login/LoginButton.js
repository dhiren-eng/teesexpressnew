import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginOperations } from './ducks';
import _ from 'lodash';
import './LoginButton.css';
class LoginButton extends React.Component {
  async componentDidMount() {
    const loginLS = await JSON.parse(localStorage.getItem('login'));
    if (!_.isEmpty(loginLS) && _.isEmpty(this.props.userInfo)) {
      await this.props.fetchUser();
    }
  }
  signedIn = () => {
    return (
      <div className="dropdown">
        <Link
          to="#"
          data-letters={this.props.initials}
          className="dropdown-toggle this"
          data-toggle="dropdown"
        ></Link>
        <ul className="dropdown-menu dropdown-menu-right">
          <li>
            <Link to="/profile" className="loginlink">
              My Profile
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to="/myOrders" className="loginlink">
              My Orders
            </Link>
          </li>
          <li className="divider"></li>
          <li>
            <button
              className="btn btn-link loginbutton"
              onClick={() => {
                this.props.logout();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    );
  };
  notSignedIn = () => {
    return (
      <Link
        to="/loginModal"
        style={{
          margin: '17px 10px',
        }}
      >
        <i class="fas fa-user" style={{ color: 'white', fontSize: '20px' }}></i>
      </Link>
    );
  };
  listenToLS = () => {
    window.addEventListener('storage', async () => {
      console.log('Token Listener called');
      const loginLS = localStorage.getItem('login');
      console.log(loginLS);
      await this.props.fetchUser();
    });
  };
  render() {
    return _.isEmpty(this.props.userInfo)
      ? this.notSignedIn()
      : this.signedIn();
  }
  componentDidUpdate() {
    this.listenToLS();
  }
}
const mapStateToProps = (state) => {
  var initialss = '';
  if (!_.isEmpty(state.login.userInfo)) {
    var item = state.login.userInfo.usrName.split(' ');
    item.forEach((element) => (initialss += element.charAt(0).toUpperCase()));
  }

  return {
    userInfo: state.login.userInfo,
    initials: initialss,
  };
};
export default connect(mapStateToProps, {
  fetchUser: loginOperations.fetchUserInfo,
  logout: loginOperations.logout,
})(LoginButton);
