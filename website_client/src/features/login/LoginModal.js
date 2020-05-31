import React from 'react';
import Modal1 from '../../Modal1';
import Input from '../../commonComponents/formComponents/Input';
import GoogleAuthButton from '../login/GoogleAuthButton';
import history from '../../history';
import { connect } from 'react-redux';
import { loginOperations } from './ducks';
import { Link } from 'react-router-dom';
import { loader } from '../loadFeature/ducks';
import LoadingOverlay from 'react-loading-overlay';
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
        {this.props.match.params.orderOption ? (
          <p
            class="alert alert-info alert-dismissible"
            style={{
              fontSize: '12px',
              lineHeight: '2px',
              textAlign: 'center',
              verticalAlign: 'middle',
              display: 'inline-block',
            }}
          >
            Sign in will save your effort by automatically loading your shipping
            information
          </p>
        ) : (
          <React.Fragment></React.Fragment>
        )}
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
            this.props.startLoader(true);
            await this.props.userLogin(this.state.email, this.state.password);
            this.props.startLoader(false);
            if (this.props.fetchError === null) {
              this.props.match.params.orderOption
                ? history.push('/placeOrderPage')
                : history.goBack();
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
          className="btn btn-primary"
        >
          Sign In
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
              textAlign: 'center',
              verticalAlign: 'middle',
              display: 'inline-block',
            }}
          >
            {this.state.loginError}
          </div>
        ) : null}
        {this.props.isLoading == true ? (
          <div style={{ fontSize: '12px', color: 'green' }}>
            Signing In User.....
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </div>
    );
  };
  lowerPart = () => {
    if (this.props.match.params.orderOption) {
      return (
        <React.Fragment>
          <button
            className="btn btn-danger"
            onClick={() => history.push('/placeOrderPage')}
          >
            Continue placing order without registering
          </button>
          <br />
          <br />
          <br />
          <p
            class="alert alert-info alert-dismissible"
            style={{
              fontSize: '12px',
              verticalAlign: 'middle',
              textAlign: 'center',
              display: 'inline-block',
            }}
          >
            You can place order as a guest without registering and register
            later using your customer ID generated after placing order. A
            dedicated assistant will be assigned for your order and will contact
            you shortly after your order is placed{' '}
          </p>
        </React.Fragment>
      );
    } else {
      return (
        <Link to="/registerCustomer" className="btn btn-primary">
          Register
        </Link>
      );
    }
  };
  render() {
    return (
      <LoadingOverlay
        active={this.props.isLoading}
        spinner
        text="Loading your content..."
      >
        <Modal1
          upperPart={() => this.upperPart()}
          lowerPart={() => this.lowerPart()}
          domNode="#modal"
        />
      </LoadingOverlay>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    fetchError: state.fetchError.error,
    isLoading: state.isLoading.startLoad,
  };
};
export default connect(mapStateToProps, {
  userLogin: loginOperations.userLogin,
  startLoader: loader.startLoader,
})(LoginModal);
