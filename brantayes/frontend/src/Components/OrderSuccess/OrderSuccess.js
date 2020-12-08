import React, { Component } from "react";
//import "./OrderSuccess.css";


class OrderSuccess extends Component 
{   
    constructor(props) {
        super(props);
    }
    
    render()
    {
        return (
            <div className="Order success">
                <div class="Column">
                    <h1>Order successful!</h1>
                </div>
            </div>          
        )
    }
}

export default OrderSuccess;