import React, { Component } from "react";
import axios from "axios";
import Api from "../../Api";
//import "./OrderSuccess.css";


class OrderSuccess extends Component 
{   
    constructor(props) {
        super(props);
        this.state = {
            response: null
        }
    }

    async fetchCustomer(session_id) {
        const response = await Api.getSuccess(session_id);

        if(response) {
            this.setState({
                response: response
            })
        }
        console.log(response)
    }

    componentDidMount(){
        this.fetchCustomer(this.props.match.params.session_id);
    }
    render()
    {
        if(this.state.response){

        
        return (
            <div className="Order success">
                <div className="Column">
                    <h1>Order successful</h1>
                    <p>Thank you for your order {this.state.response.email}!</p>
                    <p>Order no. {this.state.response.invoice}</p>
                    <p>Amount: {this.state.response.amount}</p>
                </div>
            </div>          
        )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

export default OrderSuccess;