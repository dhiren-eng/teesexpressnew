import React from 'react';
import CategoryDetailsContainer from './features/products/CategoryDetailsContainer';
import SearchResult from './features/search/SearchResult';
import { Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Switch>
      <Route path="/products/:id" exact component={CategoryDetailsContainer} />
      <Route path="/searchResult/:searchTerm?" exact component={SearchResult} />
    </Switch>
  );
};
export default Routes;
