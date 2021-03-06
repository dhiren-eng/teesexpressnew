import React from 'react';
import './CartIcon.css';
import { connect } from 'react-redux';
import { cartOperations } from './ducks';
import _ from 'lodash';
import { loader } from '../loadFeature/ducks';
class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.propState = [0, 0];
  }
  componentDidMount = () => {
    this.props.startLoader(true);
    this.props.initCartLS();
    this.props.startLoader(false);
  };
  listenToLS = () => {
    window.addEventListener('storage', () => {
      const contents = JSON.parse(localStorage.getItem('cart') || '[]');
      if (
        JSON.stringify(this.props.cart).localeCompare(
          JSON.stringify(contents)
        ) != 0
      ) {
        console.log('comparison done');
        this.props.startLoader(true);
        this.props.initCartLS();
        this.props.startLoader(false);
      }
    });
  };
  render() {
    return (
      <span
        className="fa-stack fa-1.5x has-badge"
        style={{ margin: '10px' }}
        data-count={this.props.cart.length.toString()}
      >
        <i className="fa fa-circle fa-stack-1x fa-inverse"></i>
        <i className="fa fa-shopping-cart fa-stack-1x red-cart"></i>
      </span>
    );
  }
  componentDidUpdate = async (prevProps) => {
    this.listenToLS();
    if (
      !_.isEmpty(this.props.userInfo) &&
      JSON.stringify(this.props.userInfo) !== JSON.stringify(prevProps.userInfo)
    ) {
      this.props.startLoader(true);
      await this.props.initCart();
      this.props.startLoader(false);
      this.propState.push(1);
      this.propState.shift();
    } else if (
      !_.isEmpty(this.props.userInfo) &&
      this.props.cart.length !== prevProps.cart.length &&
      this.propState[0] == 1
    ) {
      this.props.startLoader(true);
      await this.props.initCart();
      this.props.startLoader(false);
      this.propState.push(1);
      this.propState.shift();
    } else if (
      _.isEmpty(this.props.userInfo) &&
      JSON.stringify(this.props.userInfo) !== JSON.stringify(prevProps.userInfo)
    ) {
      this.props.startLoader(true);
      await this.props.initCartLS();
      this.props.startLoader(false);
      this.propState = [0, 0];
    }
    console.log(this.propState);
  };
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    userInfo: state.login.userInfo,
  };
};
export default connect(mapStateToProps, {
  initCartLS: cartOperations.initCartLS,
  initCart: cartOperations.initCart,
  startLoader: loader.startLoader,
})(CartIcon);
