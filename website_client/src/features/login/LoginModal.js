import React from 'react';
import Modal1 from '../../Modal1';
import Input from '../../commonComponents/formComponents/Input';
import GoogleAuthButton from '../login/GoogleAuthButton';
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onInputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({ ...prevState, [name]: value }));
  };
  upperPart = () => {
    return (
      <div>
        <Input
          title={'EMail '}
          name={'email'}
          inputType={'text'}
          handleChange={this.onInputChange}
          value={this.state.email}
        />
        <Input
          title={'Password '}
          name={'password'}
          inputType={'password'}
          handleChange={this.onInputChange}
          value={this.state.password}
        />
        <button>Login</button>
        <br />
        <br />
        <GoogleAuthButton />
      </div>
    );
  };
  lowerPart = () => {
    return <button>Register</button>;
  };
  render() {
    console.log(this.props);
    return (
      <Modal1
        upperPart={() => this.upperPart()}
        lowerPart={() => this.lowerPart()}
      />
    );
  }
}
export default LoginModal;
