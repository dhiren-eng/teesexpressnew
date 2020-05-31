import React from 'react';
import { connect } from 'react-redux';
import { categoryOperations } from './ducks';
import { cartOperations } from '../cart/ducks';
import CategoryDetailsComponent from './CategoryDetailsComponent';
import { bindActionCreators } from 'redux';
import LoadingOverlay from 'react-loading-overlay';
import { loader } from '../loadFeature/ducks';
class CategoryDetailsContainer extends React.Component {
  componentDidMount() {
    if (!this.props.product) {
      this.props.startLoader(true);
      this.props.fetchCategory(this.props.match.params.id);
      this.props.startLoader(false);
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
                this.props.startLoader(true);
                await this.props.addToCart(obj);
                this.props.startLoader(false);
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
          <LoadingOverlay
            active={this.props.isLoading}
            spinner
            text="Loading your content..."
          >
            <CategoryDetailsComponent
              item={this.props.product}
              button={(obj) => this.renderButton(obj)}
            />
          </LoadingOverlay>
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
    isLoading: state.isLoading.startLoad,
  };
};
const mapDispatchToProps = (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      {
        fetchCategory: categoryOperations.fetchCategory,
        addToCart: cartOperations.addToCart,
        startLoader: loader.startLoader,
      },
      dispatch
    );
  } else {
    return bindActionCreators(
      {
        fetchCategory: categoryOperations.fetchCategory,
        addToCart: cartOperations.addToCartLS,
        startLoader: loader.startLoader,
      },
      dispatch
    );
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetailsContainer);
