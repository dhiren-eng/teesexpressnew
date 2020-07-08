import React, { useState, useEffect } from 'react';
import {
  Button,
  CheckBox,
  Input,
  Select,
  SizeInputs,
} from '../../commonComponents/formComponents';
import { Storage } from 'aws-amplify';
const CategoryDetailsComponent = (props) => {
  var [state, updateState] = useState({
    ordernameError: false,
    minQuantityError: false,
    orderName: '',
    cateName: props.item.cateName,
    color: 'Black',
    printingOn: [],
    sizes: {
      S: 0,
      M: 1,
      L: 0,
      XL: 0,
      XXL: 0,
    },
    totalQuantity: 0,
    pricePerUnit: 0,
    originalPricePerUnit: props.item.pricePerUnit,
    totalPriceInfo: [],
    url: props.item.url,
    awsURL: '',
  });
  console.log(state);
  const colorOptions = [
    'Black',
    'Red',
    'Navy Blue',
    'Grey Melange',
    'Yellow',
    'Green',
    'Royal Blue',
    'Maroon',
    'White',
    'Charcoal',
  ];
  const printingOptions = ['Front', 'Back', 'Left', 'Right'];
  useEffect(() => {
    updateState((prevState) => ({
      ...prevState,
      ordernameError: false,
      minQuantityError: false,
      orderName: '',
      cateName: props.item.cateName,
      color: 'Black',
      printingOn: [],
      sizes: {
        S: 0,
        M: 1,
        L: 0,
        XL: 0,
        XXL: 0,
      },
      totalQuantity: 0,
      pricePerUnit: 0,
      originalPricePerUnit: props.item.pricePerUnit,
      totalPriceInfo: [],
      url: props.item.url,
      awsURL: '',
    }));
  }, [props.item.url]);
  useEffect(() => {
    console.log('CDM called');
    console.log(state);
    const url = props.item.url.substr(9, props.item.url.length - 1);
    Storage.get(url)
      .then((result) => {
        updateState((prevState) => ({ ...prevState, awsURL: result }));
      })
      .catch((err) => console.log(err));

    updateState((prevState) => {
      console.log(state);
      const st = {
        ...prevState,
        totalQuantity: calculateTotalQuantity(prevState.sizes),
      };
      return st;
    });
    updateState((prevState) => {
      console.log(state);
      return {
        ...prevState,
        pricePerUnit: calPricePerUnit(
          prevState.printingOn,
          prevState.totalQuantity
        ),
      };
    });
    updateState((prevState) => {
      console.log(state);
      return {
        ...prevState,
        totalPriceInfo: calTotalPrice(
          prevState.totalQuantity,
          prevState.pricePerUnit
        ),
      };
    });
  }, [state.cateName]);
  const handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (e.target.value.localeCompare('') != 0) {
      updateState((prevState) => ({ ...prevState, ordernameError: false }));
    } else if (e.target.value.localeCompare('') == 0) {
      updateState((prevState) => ({ ...prevState, ordernameError: true }));
    }
    if (state.totalQuantity >= 20) {
      updateState((prevState) => ({
        ...prevState,
        minQuantityError: false,
      }));
    } else {
      updateState((prevState) => ({
        ...prevState,
        minQuantityError: true,
      }));
    }
    updateState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSizeInput = (e) => {
    var arr;
    e.preventDefault();
    let value = parseInt(e.target.value, 10);
    let name = e.target.name;
    for (let key in state.sizes) {
      if (key.localeCompare(name) == 0) {
        updateState((prevState) => ({
          ...prevState,
          sizes: { ...prevState.sizes, [name]: value },
        }));
      }
    }
    if (e.target.value >= 20) {
      updateState((prevState) => ({
        ...prevState,
        minQuantityError: false,
      }));
    } else {
      updateState((prevState) => ({
        ...prevState,
        minQuantityError: true,
      }));
    }
    updateState((prevState) => ({
      ...prevState,
      totalQuantity: calculateTotalQuantity(prevState.sizes),
    }));
    updateState((prevState) => {
      return {
        ...prevState,
        pricePerUnit: calPricePerUnit(
          prevState.printingOn,
          prevState.totalQuantity
        ),
      };
    });

    updateState((prevState) => ({
      ...prevState,
      totalPriceInfo: calTotalPrice(
        prevState.totalQuantity,
        prevState.pricePerUnit
      ),
    }));
  };
  const handleCheckBox = (e) => {
    var arr;
    const newSelection = e.target.value;
    let newSelectionArray;

    if (state.printingOn.indexOf(newSelection) > -1) {
      newSelectionArray = state.printingOn.filter((p) => p !== newSelection);
    } else {
      newSelectionArray = [...state.printingOn, newSelection];
    }

    updateState((prevState) => ({
      ...prevState,
      printingOn: newSelectionArray,
    }));
    updateState((prevState) => ({
      ...prevState,
      pricePerUnit: calPricePerUnit(
        prevState.printingOn,
        prevState.totalQuantity
      ),
    }));
    updateState((prevState) => ({
      ...prevState,
      totalPriceInfo: calTotalPrice(
        prevState.totalQuantity,
        prevState.pricePerUnit
      ),
    }));
  };
  const handleOnMouseUpp = (e) => {
    console.log(e.target.name);
    if (state.orderName.localeCompare('') == 0) {
      updateState((prevState) => ({ ...prevState, ordernameError: true }));
    }
    if (
      e.target.name == 'S' ||
      e.target.name == 'M' ||
      e.target.name == 'L' ||
      e.target.name == 'XL' ||
      e.target.name == 'XXL'
    ) {
      if (state.totalQuantity < 20) {
        updateState((prevState) => ({
          ...prevState,
          minQuantityError: true,
        }));
      }
    }
  };
  const calculateTotalQuantity = (obj) => {
    var arr = Object.values(obj);
    var c = 0;
    arr.forEach((element) => {
      element = parseInt(element, 10);
      if (!isNaN(element)) {
        c += element;
      }
    });
    console.log(c);
    return c;
  };
  const calPricePerUnit = (printingOnArr, totalQuantity) => {
    console.log(state.originalPricePerUnit);
    var price = props.item ? parseInt(state.originalPricePerUnit, 10) : 0;
    if (totalQuantity >= 500) {
      price -= 15;
    }
    console.log(printingOnArr);
    if (printingOnArr.length != 0) {
      printingOnArr.forEach((element) => {
        if (
          element.localeCompare('Front') == 0 ||
          element.localeCompare('Back') == 0
        ) {
          price += 30;
        }
        if (
          element.localeCompare('Left') == 0 ||
          element.localeCompare('Right') == 0
        ) {
          price += 10;
        }
      });
    }
    return price;
  };
  const calTotalPrice = (totalQuantity, pricePerUnit) => {
    var arr = [];
    var totalPrice = totalQuantity * pricePerUnit;
    arr.push(totalPrice);
    if (totalPrice <= 4000) {
      arr.push(totalPrice);
    } else {
      arr.push(totalPrice / 2);
    }

    return arr;
  };
  if (props.item) {
    return (
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-sm -3" style={{ textAlign: 'center' }}>
            <img
              src={state.awsURL}
              className="d-flex img-fluid"
              alt={props.item.cateName}
            />
            <br />
            <h4>Total quantity : {state.totalQuantity} </h4>
            <h4>
              Price per pc : <i className="fas fa-rupee-sign"></i>{' '}
              {state.pricePerUnit}{' '}
            </h4>
            <h4>
              Total Price : <i className="fas fa-rupee-sign"></i>{' '}
              {state.totalPriceInfo[0]}{' '}
            </h4>
          </div>
          <div className="col-sm-9">
            <form className="container-fluid">
              <h3>{props.item.cateName}</h3>
              {state.totalQuantity < 20 ? (
                <div
                  className="alert alert-primary"
                  style={{
                    fontSize: '10px',
                    display: 'inline-block',
                    lineHeight: '20px',
                    padding: '5px',
                  }}
                >
                  Minimum quantity for bulk order needs to be 20 pcs
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <Input
                title={'Order name* :'}
                name={'orderName'}
                inputType={'text'}
                handleChange={handleInput}
                placeholder={'Enter a relevant order name'}
                value={state.orderName}
              />
              {state.ordernameError == true ? (
                <div
                  className="alert alert-danger"
                  style={{
                    fontSize: '10px',
                    display: 'inline-block',
                    lineHeight: '20px',
                    padding: '5px',
                  }}
                >
                  Order Name Required !
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <Select
                title={'Select Color of item :'}
                name={'color'}
                options={colorOptions}
                value={state.color}
                placeholder={'None'}
                handleChange={handleInput}
                onMouseUpp={handleOnMouseUpp}
              />
              <SizeInputs
                title={'Size breakup :'}
                options={state.sizes}
                handleChange={handleSizeInput}
                onMouseUpp={handleOnMouseUpp}
              />
              {state.minQuantityError == true ? (
                <div
                  className="alert alert-danger"
                  style={{
                    fontSize: '10px',
                    display: 'inline-block',
                    lineHeight: '20px',
                    padding: '5px',
                  }}
                >
                  Minimum quantity for bulk orders needs to be 20 pcs
                </div>
              ) : (
                <React.Fragment></React.Fragment>
              )}
              <CheckBox
                title={'Printing On :'}
                name={'printingOn'}
                options={printingOptions}
                selectedOptions={state.printingOn}
                handleChange={handleCheckBox}
                onMouseUpp={handleOnMouseUpp}
              />
              Advance Required : {state.totalPriceInfo[1]} <br />
              <br />
              {props.button(state)}
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default CategoryDetailsComponent;
