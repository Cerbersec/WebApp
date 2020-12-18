import React, { Component } from "react";
import Api from "../../Api";
import './OrderSuccess.css';
import DoneOutline from '@material-ui/icons/DoneOutline'

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
            <div id="OrderSuccess">
                <div id="Column">
                    <p style={{marginBottom: 0}}>Order successful   <DoneOutline style={{color: "green",fontSize: 50, marginBottom: 15}}/></p>
                    <p style={{marginBottom: 50}}>Thank you!</p>
                    
                    <p style={{fontSize: 20}}>More information has been sent to <span style={{color:"#009eff"}}>{this.state.response.email}</span> with invoice number '<span style={{color:"#009eff"}}>{this.state.response.invoice}</span>'</p>
                    <p style={{fontSize: 20}}>Order amount:<span style={{color:"#009eff"}}> &euro; {this.state.response.amount}</span></p>
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