import React from 'react';
import {
  Button,
  CheckBox,
  Input,
  Select,
  SizeInputs,
} from '../../commonComponents/formComponents';
import { Storage } from 'aws-amplify';
class CategoryDetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      totalPriceInfo: [],
      url: '',
    };
    this.colorOptions = [
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
    this.printingOptions = ['Front', 'Back', 'Left', 'Right'];
  }
  componentDidMount = () => {
    const url = this.props.item.url.substr(9, this.props.item.url.length - 1);
    Storage.get(url)
      .then((result) => {
        this.setState({ url: result });
      })
      .catch((err) => console.log(err));
    if (this.props.editCartItem) {
      console.log('Inside if ');
      this.setState(
        (prevState) => ({ ...prevState, ...this.props.item }),
        () => console.log(this.state)
      );
    } else {
      this.setState((prevState) => ({
        ...prevState,
        totalQuantity: this.calculateTotalQuantity(prevState.sizes),
      }));
      this.setState((prevState) => ({
        ...prevState,
        pricePerUnit: this.calPricePerUnit(
          prevState.printingOn,
          prevState.totalQuantity
        ),
      }));

      this.setState((prevState) => ({
        ...prevState,
        totalPriceInfo: this.calTotalPrice(
          prevState.totalQuantity,
          prevState.pricePerUnit
        ),
      }));
    }
  };
  handleInput = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(
      (prevState) => ({ ...prevState, [name]: value }),
      () => console.log(this.state)
    );
  };
  handleSizeInput = (e) => {
    var arr;
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    for (let key in this.state.sizes) {
      if (key.localeCompare(name) == 0) {
        this.setState(
          (prevState) => ({
            sizes: { ...prevState.sizes, [name]: value },
          }),
          () => console.log(this.state)
        );
      }
    }
    this.setState((prevState) => ({
      ...prevState,
      totalQuantity: this.calculateTotalQuantity(prevState.sizes),
    }));
    this.setState((prevState) => ({
      ...prevState,
      pricePerUnit: this.calPricePerUnit(
        prevState.printingOn,
        prevState.totalQuantity
      ),
    }));

    this.setState((prevState) => ({
      ...prevState,
      totalPriceInfo: this.calTotalPrice(
        prevState.totalQuantity,
        prevState.pricePerUnit
      ),
    }));
  };
  handleCheckBox = (e) => {
    var arr;
    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.state.printingOn.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.printingOn.filter(
        (p) => p !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.printingOn, newSelection];
    }

    this.setState(
      (prevState) => ({ ...prevState, printingOn: newSelectionArray }),
      () => {
        console.log(this.state);
      }
    );
    this.setState((prevState) => ({
      ...prevState,
      pricePerUnit: this.calPricePerUnit(
        prevState.printingOn,
        prevState.totalQuantity
      ),
    }));
    this.setState((prevState) => ({
      ...prevState,
      totalPriceInfo: this.calTotalPrice(
        prevState.totalQuantity,
        prevState.pricePerUnit
      ),
    }));
  };
  calculateTotalQuantity = (obj) => {
    var arr = Object.values(obj);
    var c = 0;
    arr.forEach((element) => {
      element = parseInt(element, 10);
      if (!isNaN(element)) {
        c += element;
      }
    });
    return c;
  };
  calPricePerUnit = (printingOnArr, totalQuantity) => {
    var price = this.props.item
      ? parseInt(this.props.item.pricePerUnit, 10)
      : 0;
    if (totalQuantity >= 500) {
      price -= 15;
    }
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
  calTotalPrice = (totalQuantity, pricePerUnit) => {
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
  render() {
    if (this.props.item) {
      return (
        <div className="container-fluid p-3">
          <div className="row">
            <div className="col-sm -3" style={{ textAlign: 'center' }}>
              <img
                src={this.state.url}
                className="d-flex img-fluid"
                alt={this.props.item.cateName}
              />
              <br />
              <h4>Total quantity : {this.state.totalQuantity} </h4>
              <h4>
                Price per pc : <i className="fas fa-rupee-sign"></i>{' '}
                {this.state.pricePerUnit}{' '}
              </h4>
              <h4>
                Total Price : <i className="fas fa-rupee-sign"></i>{' '}
                {this.state.totalPriceInfo[0]}{' '}
              </h4>
            </div>
            <div className="col-sm-9">
              <form
                className="container-fluid"
                onSubmit={this.handleFormSubmit}
              >
                <h3>{this.props.item.cateName}</h3>
                {this.state.totalQuantity < 20 ? (
                  <div
                    className="alert alert-danger"
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
                  handleChange={this.handleInput}
                  placeholder={'Enter a relevant order name'}
                  value={this.state.orderName}
                />
                <Select
                  title={'Select Color of item :'}
                  name={'color'}
                  options={this.colorOptions}
                  value={this.state.color}
                  placeholder={'None'}
                  handleChange={this.handleInput}
                />
                <SizeInputs
                  title={'Sizes :'}
                  options={this.state.sizes}
                  handleChange={this.handleSizeInput}
                />
                <CheckBox
                  title={'Printing On :'}
                  name={'printingOn'}
                  options={this.printingOptions}
                  selectedOptions={this.state.printingOn}
                  handleChange={this.handleCheckBox}
                />
                Advance Required : {this.state.totalPriceInfo[1]} <br />
                <br />
                {this.props.button(this.state)}
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default CategoryDetailsComponent;
