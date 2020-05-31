import React from 'react';
import CategoryListContainer from '../products/CategoryListContainer';
import Carousel from './Carousel';
import Routes from '../../Routes';
import history from '../../history';
import LoadingOverlay from 'react-loading-overlay';

import { connect } from 'react-redux';
class Homepage extends React.Component {
  render() {
    console.log(history);
    var displayHome =
      history.location.pathname.localeCompare('/') == 0 ? true : false;
    var style = displayHome ? 'inline' : 'none';

    return (
      <React.Fragment>
        <LoadingOverlay
          active={this.props.isLoading}
          spinner
          text="Loading your content..."
        >
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
          </div>
        </LoadingOverlay>
        <Routes />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading.startLoad,
  };
};
export default connect(mapStateToProps, null)(Homepage);
