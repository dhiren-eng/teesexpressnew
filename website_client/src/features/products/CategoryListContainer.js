import React from 'react';
import { categoryOperations } from './ducks';
import { connect } from 'react-redux';
import displayListHOC from '../../commonComponents/displayListHOC';
import CategoryItem from './CategoryItem';
import { loader } from '../loadFeature/ducks';
import _ from 'lodash';
let Column1 = displayListHOC(CategoryItem);
let Column2 = displayListHOC(CategoryItem);
let Column3 = displayListHOC(CategoryItem);
class CategoryListContainer extends React.Component {
  async componentDidMount() {
    if (
      _.isEmpty(this.props.products) ||
      Object.keys(this.props.products).length == 1
    ) {
      this.props.startLoader(true);
      await this.props.fetchCategories();
      this.props.startLoader(false);
    }
    console.log(this.props.products1);
  }
  render() {
    if (this.props.fetchError === null && this.props.products) {
      return (
        <div className="row no-gutters">
          <div className="col-sm-4">
            <Column1 itemList={this.props.products1} />
          </div>
          <div className="col-sm-4">
            <Column2 itemList={this.props.products2} />
          </div>
          <div className="col-sm-4">
            <Column3 itemList={this.props.products3} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
          <h4>
            <strong>{this.props.fetchError.message}</strong>
          </h4>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const products = Object.values(state.products);
  const products1 = products.slice(0, 3);
  const products2 = products.slice(3, 6);
  const products3 = products.slice(6, 8);
  return {
    fetchError: state.fetchError.error,
    products: Object.values(state.products),
    products1,
    products2,
    products3,
  };
};

export default connect(mapStateToProps, {
  fetchCategories: categoryOperations.fetchCategories,
  startLoader: loader.startLoader,
})(CategoryListContainer);
