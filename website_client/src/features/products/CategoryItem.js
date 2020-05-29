import React from 'react';
import { Link } from 'react-router-dom';
import { configureAmplify, SetS3Config } from '../../services';
import Storage from '@aws-amplify/storage';
class CategoryItem extends React.Component {
  state = {
    url: '',
  };
  componentDidMount = () => {
    const url = this.props.item.url.substr(9, this.props.item.url.length - 1);
    console.log(url);
    Storage.get(url)
      .then((result) => {
        console.log(result);
        this.setState({ url: result });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <Link to={`/products/${this.props.item._id}`}>
          <img
            src={this.state.url}
            className="d-flex img-fluid"
            alt={this.props.item.cateName}
            style={{ padding: '2px' }}
          />
        </Link>
      </div>
    );
  }
}

export default CategoryItem;
