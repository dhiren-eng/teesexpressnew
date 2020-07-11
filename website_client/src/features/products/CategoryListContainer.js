import React, { useEffect, useContext } from 'react';
import { categoryOperations } from './ducks';
import displayListHOC from '../../commonComponents/displayListHOC';
import CategoryItem from './CategoryItem';
import { contextObject } from '../../Context/Store';
import _ from 'lodash';
let Column1 = displayListHOC(CategoryItem);
let Column2 = displayListHOC(CategoryItem);
let Column3 = displayListHOC(CategoryItem);
const CategoryListContainer = () => {
  var { products } = useContext(contextObject);
  var productList = Object.values(products[0]);
  const dispatch = products[1];
  useEffect(() => {
    if (productList.length == 0 || productList.length == 1) {
      categoryOperations.fetchCategories(dispatch);
    }
  }, [productList]);
  console.log('CLContainer');
  const products1 = productList.slice(0, 3);
  const products2 = productList.slice(3, 6);
  const products3 = productList.slice(6, 8);

  if (productList) {
    return (
      <div className="row no-gutters">
        <div className="col-sm-4">
          <Column1 itemList={products1} />
        </div>
        <div className="col-sm-4">
          <Column2 itemList={products2} />
        </div>
        <div className="col-sm-4">
          <Column3 itemList={products3} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid p-4" style={{ textAlign: 'center' }}>
        Error
      </div>
    );
  }
};
export default CategoryListContainer;
