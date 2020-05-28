import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Storage from '@aws-amplify/storage';
import { searchOperations } from './ducks';
class SearchResult extends React.Component {
  state = { urlArr: [] };
  componentDidMount = async () => {
    await this.props.searchProduct(this.props.match.params.searchTerm);
  };
  render() {
    console.log(this.state);
    console.log(this.props.fetchError === null);
    console.log(this.props.result.length);
    console.log('CDR');
    if (
      this.props.fetchError === null &&
      this.props.result.length != 0 &&
      this.state.urlArr.length != 0
    ) {
      console.log('inside render');
      var count = -1;
      return (
        <div className="container-fluid p-5">
          {this.props.result.map((element) => {
            ++count;
            console.log(count);
            console.log(this.state.urlArr[count]);
            return (
              <Link to={`/products/${element._id}`}>
                <img src={this.state.urlArr[count]} alt={element} />
              </Link>
            );
          })}
        </div>
      );
    } else if (this.props.fetchError) {
      return <div>{this.props.fetchError.message}</div>;
    } else {
      return <div></div>;
    }
  }
  componentDidUpdate = async (prevProps) => {
    if (
      this.props.match.params.searchTerm != prevProps.match.params.searchTerm ||
      this.state.urlArr.length == 0
    ) {
      if (
        this.props.match.params.searchTerm != prevProps.match.params.searchTerm
      ) {
        await this.props.searchProduct(this.props.match.params.searchTerm);
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
  return {
    result: state.search.searchResult,
    fetchError: state.fetchError.error,
  };
};
export default connect(mapStateToProps, {
  searchProduct: searchOperations.searchProduct,
})(SearchResult);
