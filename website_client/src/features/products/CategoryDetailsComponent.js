import React from 'react';
import {
  Button,
  CheckBox,
  Input,
  Select,
  SizeInputs,
} from '../../commonComponents/formComponents';
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
    var pricePerUnit = 0;
    var plainPrice;
    var price;
    switch (this.props.item.cateName) {
      case 'Dry fit Round Neck T shirt': {
        price = 115;
        break;
      }
      case 'Pure Cotton Round Neck T shirt': {
        price = 135;
        break;
      }
      default:
        price = 0;
    }
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
        <div>
          <form className="container-fluid" onSubmit={this.handleFormSubmit}>
            <h3>{this.props.item.cateName}</h3>
            <Input
              title={'Order name :'}
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
            <br />
            Total quantity : {this.state.totalQuantity} <br />
            Price per pc : {this.state.pricePerUnit} <br />
            Total Price : {this.state.totalPriceInfo[0]} <br />
            Advance Required : {this.state.totalPriceInfo[1]} <br />
            {this.props.button(this.state)}
          </form>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
export default CategoryDetailsComponent;
