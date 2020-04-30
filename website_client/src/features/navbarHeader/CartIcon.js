import React from 'react';
import './CartIcon.css';
import { connect } from 'react-redux';
import { cartOperations } from '../cart/ducks';
class CartIcon extends React.Component {
  componentDidMount = () => {
    this.props.initCartLS();
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
        this.props.initCartLS();
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
        {this.listenToLS()}
      </span>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps, {
  initCartLS: cartOperations.initCartLS,
})(CartIcon);
