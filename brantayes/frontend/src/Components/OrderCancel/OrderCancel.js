import React, { Component } from "react";
import Api from "../../Api";


class OrderCancel extends Component 
{   
    constructor(props) {
        super(props);
    }

    async removeOrder(order_id) {
        const response = await Api.removeOrder(order_id);

        if(response) {
            this.setState({
                response: response
            })
        }
        console.log(response)
    }

    componentDidMount(){
        this.removeOrder(this.props.match.params.id);
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