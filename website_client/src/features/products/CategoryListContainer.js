import React from 'react';
import { categoryOperations } from './ducks';
import { connect } from 'react-redux';
import displayListHOC from '../../commonComponents/displayListHOC';
import CategoryItem from './CategoryItem';
let NewComponent = displayListHOC(CategoryItem);
class CategoryListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  render() {
    if (this.props.fetchError === null && this.props.products) {
      return <NewComponent itemList={this.props.products} />;
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    fetchError: state.fetchError.error,
    products: Object.values(state.products),
  };
};

export default connect(mapStateToProps, {
  fetchCategories: categoryOperations.fetchCategories,
})(CategoryListContainer);
