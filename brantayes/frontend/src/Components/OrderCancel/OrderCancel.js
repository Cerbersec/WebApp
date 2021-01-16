import React, { Component } from "react";
import Api from "../../Api";
import './OrderCancel.css';


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
            <div id="OrderCancel">
            <div id="Column">
                    <p>Order with ID: "<span style={{color:"#009eff"}}>{this.props.match.params.id}</span>" <br></br>has been cancelled!</p>
                </div>
            </div>          
        )
    }
}

export default OrderCancel;