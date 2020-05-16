import React from 'react';
import {Link} from 'react-router-dom';
const CheckoutButton = () => {
    const login = JSON.parse(localStorage.getItem('login'));
    if(login){
        return (
            <Link to = '/placeOrderPage' className="btn btn-primary" />Place Order</Link>
        );
    }
    
}
export default CheckoutButton;