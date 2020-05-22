import React from 'react';
import { connect } from 'react-redux';
import { categoryOperations } from './ducks';
import { cartOperations } from '../cart/ducks';
import CategoryDetailsComponent from './CategoryDetailsComponent';
import { bindActionCreators } from 'redux';
class CategoryDetailsContainer extends React.Component {
  componentDidMount() {
    if (!this.props.product) {
      this.props.fetchCategory(this.props.match.params.id);
    }
  }
  renderButton = (obj) => {
    return (
      <button
        onClick={async (e) => {
          e.preventDefault();
          await this.props.addToCart(obj);
        }}
        className="btn btn-primary"
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
    } else if (this.props.fetchError === 504) {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          <h4>
            <strong>Response 504 ... Server needs to be restarted</strong>
          </h4>
        </div>
      );
    } else {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          Request failed. Please retry by clicking refresh
        </div>
      );
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    fetchError: state.fetchError.error,
    product: state.products[ownProps.match.params.id],
  };
};
const mapDispatchToProps = (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      {
        fetchCategory: categoryOperations.fetchCategory,
        addToCart: cartOperations.addToCart,
      },
      dispatch
    );
  } else {
    return bindActionCreators(
      {
        fetchCategory: categoryOperations.fetchCategory,
        addToCart: cartOperations.addToCartLS,
      },
      dispatch
    );
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetailsContainer);
