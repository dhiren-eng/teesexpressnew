import React from 'react';
import CategoryListContainer from '../products/CategoryListContainer';
import Carousel from './Carousel';
import ProductsGrid from './ProductsGrid';
class Homepage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div class="container-fluid" style={{ padding: '5px' }}>
          <Carousel />
        </div>
        <br />
        <div style={{ textAlign: 'center' }} className="p-3">
          <h2>
            <u style={{ textDecorationSkipInk: 'none' }}>Products</u>
          </h2>
        </div>
        <div style={{ padding: '10px' }}>
          <ProductsGrid />
        </div>
        <CategoryListContainer />
      </div>
    );
  }
}
export default Homepage;
