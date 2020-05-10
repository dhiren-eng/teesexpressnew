import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginOperations } from './ducks';
import './LoginButton.css';
class LoginButton extends React.Component {
  async componentDidMount() {
    const loginLS = await JSON.parse(localStorage.getItem('usrEmail'));
    if (loginLS != null && this.props.userInfo == null) {
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
            <Link to="#">My Profile</Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to="#">My Orders</Link>
          </li>
          <li className="divider"></li>
          <li>
            <Link to="#">Logout</Link>
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
    window.addEventListener('storage', () => {
      console.log('Token Listener called');
      const loginLS = localStorage.getItem('login');
      console.log(loginLS);
      this.props.fetchUser();
    });
  };
  render() {
    return this.props.userInfo == null ? this.notSignedIn() : this.signedIn();
  }
  componentDidUpdate() {
    console.log('component did update');
    this.listenToLS();
  }
}
const mapStateToProps = (state) => {
  var initialss = '';
  if (state.login.userInfo) {
    var item = state.login.userInfo.fullName.split(' ');
    var initialss =
      item[0].charAt(0).toUpperCase() + item[1].charAt(0).toUpperCase();
  }

  return {
    userInfo: state.login.userInfo,
    initials: initialss,
  };
};
export default connect(mapStateToProps, {
  fetchUser: loginOperations.fetchUserInfo,
})(LoginButton);
