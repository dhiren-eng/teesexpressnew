import React, { useReducer, createContext, useMemo } from 'react';
import productReducer from '../features/products/ducks';
import searchReducer from '../features/search/ducks';
var contextObject = createContext();
const { Provider } = contextObject;
const StateProvider = (props) => {
  var [productState, productDispatch] = useReducer(productReducer, {});
  var [search, searchDispatch] = useReducer(searchReducer, {
    searchResult: [],
  });
  var store = {
    products: [productState, productDispatch],
    search: [search.searchResult, searchDispatch],
  };
  console.log('StateProvider called');
  return <Provider value={store}>{props.children}</Provider>;
};
export default StateProvider;
export { contextObject };
