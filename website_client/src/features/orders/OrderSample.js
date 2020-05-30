import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { cartOperations } from '../cart/ducks';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValueSelector } from 'redux-form';
const printOn = ['Front', 'Back', 'Left', 'Right'];
const OrderSample = (props) => {
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const renderSelect = ({ input, label, meta }) => {
    return (
      <React.Fragment>
        <label>{label}</label>
        <br />
        <select {...input} className="form-control w-75 border-info">
          <option value="">--Products--</option>
          {props.products.map((val) => (
            <option value={[val.cateName, val.pricePerUnit]} key={val.cateName}>
              {val.cateName}
            </option>
          ))}
        </select>
        {renderError(meta)}
      </React.Fragment>
    );
  };
  const renderInput = ({ input, label, meta, type, element }) => {
    return (
      <div className="p-2" style={{ display: 'inline' }}>
        <label>{element}</label>
        {'   '}
        <input {...input} type={type} />
      </div>
    );
  };
  const onSubmit = async (formValues) => {
    console.log(formValues);
    const obj = { sizes: {} };
    obj.orderName = 'Sample Order';
    obj.cateName = props.cateName;
    obj.sizes.S = props.S;
    obj.sizes.M = props.M;
    obj.sizes.L = props.L;
    obj.sizes.XL = props.XL;
    obj.sizes.XXL = props.XXL;
    obj.totalQuantity =
      obj.sizes.S + obj.sizes.M + obj.sizes.L + obj.sizes.XL + obj.sizes.XXL;
    obj.pricePerUnit = props.pricePerUnit;
    obj.totalPriceInfo = [
      props.pricePerUnit * obj.totalQuantity,
      props.pricePerUnit * obj.totalQuantity,
    ];
    obj.printingOn = props.printingOn;
    await props.addToCart(obj);
  };
  const renderError = ({ error, visited }) => {
    if (visited && error) {
      return (
        <div
          className="alert alert-danger alert-dismissible"
          style={{
            fontSize: '10px',
            lineHeight: '2px',
            verticalAlign: 'middle',
            display: 'inline-block',
          }}
        >
          {' '}
          {error}
        </div>
      );
    }
  };
  return (
    <div className="container-fluid p-3">
      <h2>
        <u style={{ textDecorationSkipInk: 'none' }}>Order Sample</u>
      </h2>

      <form onSubmit={props.handleSubmit(onSubmit)}>
        <Field
          name="selectCategory"
          label="Select Product"
          component={renderSelect}
        />
        <br />
        <label>
          <strong>Select Sizes: </strong>
        </label>{' '}
        {sizes.map((val) => (
          <Field
            name={val}
            component={renderInput}
            type="checkbox"
            element={val}
          />
        ))}
        <br />
        <label>
          <strong>Printing On: </strong>
        </label>{' '}
        {printOn.map((val) => (
          <Field
            name={val}
            label="Select Sizes :       "
            component={renderInput}
            type="checkbox"
            element={val}
          />
        ))}
        <br />
        Total Quantity : {props.totalQuantity || 0}
        <br />
        Price per unit of Sample : <i className="fas fa-rupee-sign"></i>{' '}
        {props.pricePerUnit || 0}
        <br />
        Total Price : <i className="fas fa-rupee-sign"></i>{' '}
        {props.pricePerUnit * props.totalQuantity || 0}
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Place Sample Order
        </button>
      </form>
    </div>
  );
};
const validate = (formValues) => {
  const errors = {};
  if (!formValues.selectCategory) {
    errors.Email = 'Field cannot be empty';
  }
  if (!formValues.selectSizes) {
    errors.mobileNumber = 'Field cannot be empty';
  }
  return errors;
};
const mapStateToProps = (state) => {
  const selector = formValueSelector('orderSample');
  if (state.form.orderSample) {
    const strArray = selector(state, 'selectCategory')
      ? selector(state, 'selectCategory').split(',')
      : ['', ''];
    const S = selector(state, 'S') ? 1 : 0;
    const M = selector(state, 'M') ? 1 : 0;
    const L = selector(state, 'L') ? 1 : 0;
    const XL = selector(state, 'XL') ? 1 : 0;
    const XXL = selector(state, 'XXL') ? 1 : 0;
    const totalQuantity = S + M + L + XL + XXL;
    const pOn = [];
    printOn.forEach((element) => {
      if (selector(state, element) == true) {
        pOn.push(element);
      }
    });
    return {
      fetchError: state.fetchError.error,
      products: Object.values(state.products),
      cateName: strArray[0],
      pricePerUnit: parseInt(strArray[1], 10) + 300,
      S,
      M,
      L,
      XL,
      XXL,
      totalQuantity,
      printingOn: pOn,
    };
  } else {
    return {
      fetchError: state.fetchError.error,
      products: Object.values(state.products),
    };
  }
};
const mapDispatchToProps = (dispatch) => {
  const login = JSON.parse(localStorage.getItem('login'));
  if (login) {
    return bindActionCreators(
      {
        addToCart: cartOperations.addToCart,
      },
      dispatch
    );
  } else {
    return bindActionCreators(
      {
        addToCart: cartOperations.addToCartLS,
      },
      dispatch
    );
  }
};

const OrderSampleForm = reduxForm({
  form: 'orderSample',
  destroyOnUnmount: false,
  validate,
})(OrderSample);
export default connect(mapStateToProps, mapDispatchToProps)(OrderSampleForm);
