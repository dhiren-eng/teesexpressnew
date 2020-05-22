import React from 'react';
import { categoryOperations } from './ducks';
import { connect } from 'react-redux';
import displayListHOC from '../../commonComponents/displayListHOC';
import CategoryItem from './CategoryItem';
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
      await this.props.fetchCategories();
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
})(CategoryListContainer);
