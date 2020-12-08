import React, { Component } from "react";
import "./TermsOfPayment.css";


class TermsOfPayment extends Component 
{
    
        constructor(props) {
          super(props);
          this.state = { email: '',
                        message: '' 
                    };
        }
        myChangeHandler = (event) => {
            let nam = event.target.name;
            let val = event.target.value;
            this.setState({[nam]: val});
        }
        mySubmitHandler = (event) => {
            event.preventDefault();
            var alpha = this.state.email; 
            var beta = this.state.message;
            if (alpha.trim() === "") {
                alert("E-mail is required");
                }
                else{
                    if(alpha.indexOf("@") !== -1){
                        
                        if(beta.trim() === ""){
                            alert("Message is required");
                        }
                        else{
                            alert("You are submitting " + beta);
                        }
                    }
                    else{
                        alert("Gelieve een geldig e-mail adres te gebruiken");
                    }
                }
          }
    render()
    {
        return (
            <div className="ContactPage">
                <div class="Column">
                    <h1>Terms of payment</h1>
                    <p>(insert terms of payment)</p>
                </div>
            </div>
            
        )
    }
}

export default TermsOfPayment;