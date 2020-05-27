import React from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
class Carousel extends React.Component {
  state = { url1: '', url2: '', url3: '' };
  componentDidMount = () => {
    Storage.get('customize-tshirts-almamaterstore.gif')
      .then((result) => {
        console.log(result);
        this.setState({ url1: result });
      })
      .catch((err) => console.log(err));
    Storage.get('20191203004502.jpg')
      .then((result) => {
        console.log(result);
        this.setState({ url2: result });
      })
      .catch((err) => console.log(err));
    Storage.get('20200518211128.jpg')
      .then((result) => {
        console.log(result);
        this.setState({ url3: result });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="row">
        <div id="carousel-container">
          <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li
                data-target="#myCarousel"
                data-slide-to="0"
                className="active"
              ></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={this.state.url1}
                  alt="Los Angeles"
                  className="d-block img-fluid"
                />
              </div>

              <div className="carousel-item">
                <img
                  src={this.state.url2}
                  alt="Chicago"
                  className="d-block img-fluid"
                />
              </div>

              <div className="carousel-item">
                <img
                  src={this.state.url3}
                  alt="Los Angeles"
                  className="d-block img-fluid"
                />
              </div>
            </div>

            <a
              href="#myCarousel"
              className="carousel-control-prev"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#myCarousel"
              data-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Carousel;
