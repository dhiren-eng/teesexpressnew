import React, { useEffect, useContext } from 'react';
import { categoryOperations } from './ducks';
import CategoryDetailsComponent from './CategoryDetailsComponent';
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
    return (
      <React.Fragment>
        <button
          className="btn btn-primary"
          style={{ pointerEvents: 'none' }}
          disabled
        >
          {' '}
          Add To Cart{' '}
        </button>
      </React.Fragment>
    );
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
