import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { categoryOperations } from './ducks';
import { cartOperations } from '../cart/ducks';
import CategoryDetailsComponent from './CategoryDetailsComponent';
import { bindActionCreators } from 'redux';
import LoadingOverlay from 'react-loading-overlay';
import { loader } from '../loadFeature/ducks';
import { contextObject } from '../../Context/Store';
const CategoryDetailsContainer = (props) => {
  var { products } = useContext(contextObject);
  var productList = Object.values(products[0]);
  const product = products[0][props.match.params.id];
  console.log(product);
  const dispatch = products[1];
  useEffect(() => {
    if (!product) {
      categoryOperations.fetchCategory(props.match.params.id, dispatch);
    }
  }, [product]);
  const renderButton = (obj) => {
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
  if (product) {
    return (
      <div>
        <CategoryDetailsComponent
          item={product}
          button={(obj) => renderButton(obj)}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default CategoryDetailsContainer;
