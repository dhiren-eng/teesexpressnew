import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoryOperations } from './ducks';
import { cartOperations } from '../cart/ducks';
import CategoryDetailsComponent from './CategoryDetailsComponent';
class CategoryDetailsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }
  renderButton = (obj) => {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          this.props.addToCartLS(obj);
        }}
      >
        {' '}
        Add To Cart{' '}
      </button>
    );
  };
  render() {
    console.log(this.props);
    if (this.props.fetchError === null && this.props.product) {
      return (
        <div>
          <CategoryDetailsComponent
            item={this.props.product}
            button={(obj) => this.renderButton(obj)}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    fetchError: state.fetchError.error,
    product: state.products[ownProps.match.params.id],
  };
};
export default connect(mapStateToProps, {
  fetchCategory: categoryOperations.fetchCategory,
  addToCartLS: cartOperations.addToCartLS,
})(CategoryDetailsContainer);
