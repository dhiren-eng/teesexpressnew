import React from 'react';
import CategoryListContainer from '../products/CategoryListContainer';
import Carousel from './Carousel';
import Routes from '../../Routes';
import history from '../../history';
class Homepage extends React.Component {
  render() {
    console.log(history);
    var displayHome =
      history.location.pathname.localeCompare('/') == 0 ? true : false;
    var style = displayHome ? 'inline' : 'none';

    return (
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
            <CategoryListContainer />
          </div>
        </div>
        <Routes />
      </div>
    );
  }
}
export default Homepage;
