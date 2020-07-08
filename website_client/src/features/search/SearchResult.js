import React, { useEffect, useState, useContext, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Storage from '@aws-amplify/storage';
import { searchOperations } from './ducks';
import { loader } from '../loadFeature/ducks';
import LoadingOverlay from 'react-loading-overlay';
import { contextObject } from '../../Context/Store';
const SearchResult = (props) => {
  var [state, updateState] = useState({ urlArr: [] });
  var { search } = useContext(contextObject);
  var [searchResult, searchDispatch] = search;
  const prevResultRef = useRef();
  useEffect(() => {
    const fetchImages = async () => {
      if (searchResult.length != 0 && searchResult != prevResultRef.current) {
        var arr = [];
        for (const element of searchResult) {
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
        updateState((prevState) => ({
          ...prevState,
          urlArr: arr,
        }));
      }
    };
    fetchImages();
    prevResultRef.current = searchResult;
  }, [searchResult]);
  useEffect(() => {
    searchOperations.searchProduct(
      props.match.params.searchTerm,
      searchDispatch
    );
  }, [props.match.params.searchTerm]);
  if (searchResult.length != 0 && state.urlArr.length != 0) {
    var count = -1;
    return (
      <div className="container-fluid p-3">
        <h5>
          Search results for keyword :{'  '}
          <strong>{props.match.params.searchTerm}</strong>
        </h5>
        Found {searchResult.length} results: <br />
        <br />
        {searchResult.map((element) => {
          ++count;
          return (
            <Link to={`/products/${element._id}`}>
              <img
                src={state.urlArr[count]}
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
    );
  } else {
    return <div></div>;
  }
};
export default SearchResult;
