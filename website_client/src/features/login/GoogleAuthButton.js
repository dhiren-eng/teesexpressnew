import React from 'react';
import { loginActions } from './ducks';
import { connect } from 'react-redux';
class GoogleAuthButton extends React.Component {
  componentDidMount = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '981179991873-5vk2e1hhn3esqq2491i0keiva4ebvdsg.apps.googleusercontent.com',
          scope: 'email',
          prompt: 'select_account',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  };
  onAuthChange = (isSignedIn) => {
    console.log(isSignedIn);
    if (!isSignedIn) {
      this.props.googleSignIn();
    } else if (isSignedIn) {
      this.props.googleSignOut();
    }
  };
  signIn = () => {
    this.auth.signIn();
  };
  signOut = () => {
    this.auth.signOut();
  };
  render() {
    if (this.props.isSignedIn === null) {
      return <div></div>;
    } else if (this.props.isSignedIn === false) {
      return <button onClick={this.signIn}>Sign In</button>;
    } else if (this.props.isSignedIn === true) {
      return <button onClick={this.signOut}>Sign Out</button>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.signInStatus.isSignedIn,
  };
};
export default connect(mapStateToProps, {
  googleSignIn: loginActions.googleSignIn,
  googleSignOut: loginActions.googleSignOut,
})(GoogleAuthButton);
