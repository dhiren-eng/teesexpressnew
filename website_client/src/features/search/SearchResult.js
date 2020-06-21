import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Storage from '@aws-amplify/storage';
import { searchOperations } from './ducks';
import { loader } from '../loadFeature/ducks';
import LoadingOverlay from 'react-loading-overlay';
class SearchResult extends React.Component {
  state = { urlArr: [] };
  componentDidMount = async () => {
    this.props.startLoader(true);
    await this.props.searchProduct(this.props.match.params.searchTerm);
    this.props.startLoader(false);
    console.log('CDM search');
  };
  render() {
    console.log('render');
    if (
      this.props.fetchError === null &&
      this.props.result.length != 0 &&
      this.state.urlArr.length != 0
    ) {
      var count = -1;
      return (
        <LoadingOverlay
          active={this.props.isLoading}
          spinner
          text="Loading your content..."
        >
          <div className="container-fluid p-3">
            <h5>
              Search results for keyword :{'  '}
              <strong>{this.props.match.params.searchTerm}</strong>
            </h5>
            Found {this.props.result.length} results: <br />
            <br />
            {this.props.result.map((element) => {
              ++count;
              return (
                <Link to={`/products/${element._id}`}>
                  <img
                    src={this.state.urlArr[count]}
                    alt={element}
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      verticalAlign: 'center',
                      display: 'block',
                      width: '500px',
                      borderColor: 'lightgrey',
                      borderStyle: 'solid',
                      borderWidth: 'thin',
                      padding: '5px',
                    }}
                  />
                  <br />
                </Link>
              );
            })}
          </div>
        </LoadingOverlay>
      );
    } else if (this.props.fetchError) {
      return <div>{this.props.fetchError.message}</div>;
    } else {
      return <div></div>;
    }
  }
  componentDidUpdate = async (prevProps) => {
    console.log('CDU');
    if (
      this.props.match.params.searchTerm != prevProps.match.params.searchTerm ||
      this.state.urlArr.length == 0
    ) {
      console.log(
        this.props.match.params.searchTerm != prevProps.match.params.searchTerm
      );
      if (
        this.props.match.params.searchTerm !=
          prevProps.match.params.searchTerm ||
        (this.props.fetchError == null && this.props.result.length == 0)
      ) {
        this.props.startLoader(true);
        await this.props.searchProduct(this.props.match.params.searchTerm);
        this.props.startLoader(false);
      }
      var arr = [];
      for (const element of this.props.result) {
        const subString = element.url.substr(9, element.url.length - 1);
        await Storage.get(subString)
          .then((result) => {
            console.log('hi');
            element.url = result;
            console.log(element.url);
            console.log(typeof result);
            arr.push(result);
          })
          .catch((err) => console.log(err));
      }
      this.setState((prevState) => ({
        ...prevState,
        urlArr: arr,
      }));
    }
  };
}
const mapStateToProps = (state) => {
  console.log(state.search.searchResult);
  console.log('mapStateToprops');
  return {
    result: state.search.searchResult,
    fetchError: state.fetchError.error,
  };
};
export default connect(mapStateToProps, {
  searchProduct: searchOperations.searchProduct,
  startLoader: loader.startLoader,
})(SearchResult);
