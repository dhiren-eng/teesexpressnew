import React from 'react';
import {Link} from 'react-router-dom';
const CheckoutButton = () => {
    return (
        <div><Link to = '/placeOrderModal' className="btn btn-primary" />Place Order</Link></div>
    )
}
export default CheckoutButton;