import React, { Component } from "react";
import axios from "axios";
//import "./OrderSuccess.css";


class OrderSuccess extends Component 
{   
    constructor(props) {
        super(props);
        this.state = {
            customer: null
        }
    }
    componentDidMount(){
        axios.post("http://localhost:3000/createCheckout?session_id=" + this.props.match.params.session_id)
        .then((res) => {
            this.setState({
                customer: res.data
            })
        })
    }
    render()
    {
        if(this.state.customer){

        
        return (
            <div className="Order success">
                <div class="Column">
                    <h1>Order successfull {this.state.customer.name}</h1>
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