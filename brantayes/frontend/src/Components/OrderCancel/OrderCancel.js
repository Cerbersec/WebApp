import React, { Component } from "react";
//import "./OrderSCancel.css";


class OrderCancel extends Component 
{   
    constructor(props) {
        super(props);
    }
    
    render()
    {
        return (
            <div className="Order cancelled">
                <div class="Column">
                    <h1>Order cancelled!</h1>
                </div>
            </div>          
        )
    }
}

export default OrderCancel;