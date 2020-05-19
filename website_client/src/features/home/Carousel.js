import React from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
const Carousel = () => {
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
                src="http://localhost:8000/uploads/customize-tshirts-almamaterstore.gif"
                alt="Los Angeles"
                className="d-block img-fluid"
              />
            </div>

            <div className="carousel-item">
              <img
                src="http://localhost:8000/uploads/20191203004502.jpg"
                alt="Chicago"
                className="d-block img-fluid"
              />
            </div>

            <div className="carousel-item">
              <img
                src="http://localhost:8000/uploads/20200518211128.jpg"
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
};
export default Carousel;
