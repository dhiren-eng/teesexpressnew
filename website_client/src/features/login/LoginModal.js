import React from 'react';
import Modal1 from '../../Modal1';
import Input from '../../commonComponents/formComponents/Input';
import GoogleAuthButton from '../login/GoogleAuthButton';
import history from '../../history';
import { connect } from 'react-redux';
import { loginOperations } from './ducks';
import { Link } from 'react-router-dom';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: '',
      change: 's',
    };
  }
  onInputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
      change: 's',
    }));
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
        <button
          onClick={async () => {
            await this.props.userLogin(this.state.email, this.state.password);
            if (this.props.fetchError === null) {
              history.goBack();
            } else {
              this.setState(
                (prevState) => ({
                  ...prevState,
                  loginError: 'Incorrect Username or Password !',
                  change: '',
                }),
                () => console.log(this.state)
              );
            }
          }}
          type="submit"
        >
          Login
        </button>
        <br />
        <br />
        <GoogleAuthButton />

        <br />
        <br />
        {this.state.loginError.localeCompare('') != 0 &&
        this.state.change.localeCompare('') == 0 ? (
          <div
            class="alert alert-danger alert-dismissible"
            style={{
              fontSize: '10px',
              lineHeight: '2px',
              verticalAlign: 'middle',
              display: 'inline-block',
            }}
          >
            {this.state.loginError}
          </div>
        ) : null}
      </div>
    );
  };
  lowerPart = () => {
    return (
      <Link to="/registerCustomer" className="btn btn-primary">
        Register
      </Link>
    );
  };
  render() {
    return (
      <Modal1
        upperPart={() => this.upperPart()}
        lowerPart={() => this.lowerPart()}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fetchError: state.fetchError.error,
  };
};
export default connect(mapStateToProps, {
  userLogin: loginOperations.userLogin,
})(LoginModal);
