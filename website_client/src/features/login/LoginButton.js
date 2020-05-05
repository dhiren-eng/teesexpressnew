import React from 'react';
import { Link } from 'react-router-dom';
class LoginButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: null };
  }

  async componentDidMount() {
    const token = await localStorage.getItem('loginToken');
    if (token != null) {
      this.setState({ token });
    }
  }
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
  render() {
    return this.state.token == null ? this.notSignedIn() : <div></div>;
  }
}
export default LoginButton;
