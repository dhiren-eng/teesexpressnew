import React, { useContext, useMemo } from 'react';
import CategoryListContainer from '../products/CategoryListContainer';
import Carousel from './Carousel';
import Routes from '../../Routes';
import history from '../../history';
import LoadingOverlay from 'react-loading-overlay';
import { contextObject } from '../../Context/Store';
import { connect } from 'react-redux';

const Homepage = () => {
  var { products } = useContext(contextObject);
  console.log(history);
  var displayHome =
    history.location.pathname.localeCompare('/') == 0 ? true : false;
  var style = displayHome ? 'inline' : 'none';

  return (
    <React.Fragment>
      <div className="container-fluid" style={{ padding: '10px' }}>
        <div style={{ display: style }}>
          <div className="container-fluid">
            <Carousel />
          </div>
          <br />
          <div style={{ textAlign: 'center' }} className="p-3">
            <h2>
              <u style={{ textDecorationSkipInk: 'none' }}>
                Bulk Order Products
              </u>
            </h2>
          </div>
          <div style={{ padding: '15px' }}>
            {useMemo(() => {
              return <CategoryListContainer />;
            }, [products])}
          </div>
        </div>
      </div>
      <Routes />
    </React.Fragment>
  );
};
export default Homepage;
