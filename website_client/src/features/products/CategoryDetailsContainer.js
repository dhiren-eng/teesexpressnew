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
    if (obj.totalQuantity < 20 || obj.totalQuantity <= 0 || !obj.orderName) {
      return (
        <React.Fragment>
          <span
            style={{ display: 'inline-block' }}
            tabindex="0"
            data-toggle="tooltip"
            data-placement="top"
            title="Total quantity needs to be >= 20 and Order name compulsary"
          >
            <button
              className="btn btn-primary"
              style={{ pointerEvents: 'none' }}
              disabled
            >
              {' '}
              Add To Cart{' '}
            </button>
          </span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <button
            onClick={async (e) => {
              e.preventDefault();
              if (obj.totalQuantity >= 20) {
                await this.props.addToCart(obj);
              }
            }}
            className="btn btn-primary"
          >
            {' '}
            Add To Cart{' '}
          </button>
        </React.Fragment>
      );
    }
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
    } else if (this.props.fetchError) {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          Request failed. Please retry by clicking refresh
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
