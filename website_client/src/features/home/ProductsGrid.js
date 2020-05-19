import React from 'react';
import './ProductsGrid.css';
const ProductsGrid = () => {
  return (
    <div className="row no-gutters">
      <div className="col-sm-4">
        <img
          src="http://localhost:8000/uploads/Round_neck_tee.png"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/drop cut tees.png"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/"
          className="d-flex img-fluid"
        />
      </div>
      <div class="col-sm-4">
        <img
          src="http://localhost:8000/uploads/polo_tee.png"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/"
          className="d-flex img-fluid"
        />
      </div>
      <div class="col-sm-4">
        <img
          src="http://localhost:8000/uploads/T shirt dress.png"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/"
          className="d-flex img-fluid"
        />
        <img
          src="http://localhost:8000/uploads/"
          className="d-flex img-fluid"
        />
      </div>
    </div>
  );
};
export default ProductsGrid;
