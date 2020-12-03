import React, { Component } from "react";
import "./Support.css";
import EmailIcon from '@material-ui/icons/Email';


class Support extends Component 
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
                    <h1>Contact Page</h1>
                    <h2>Can't find your answer?</h2>
                    Contact us through one of the following options: <br></br><br></br>
                    <ul><EmailIcon style={{ fontSize: 50}}></EmailIcon> &nbsp; <li>support@brantayes.be</li></ul>
                    
                    <br></br>
                </div>
                <div>
                    or send a message directly
                <form onSubmit={this.mySubmitHandler}>
                    <p>Your e-mailaddress:</p>
                <input type="text" name='email' onChange={this.myChangeHandler} />
                <p>Your message:</p>
                <textarea name='message' maxlength="250"  placeholder="Tell us your problem" onChange={this.myChangeHandler}></textarea>
                <button input type='submit'>Send</button>
                </form>
                </div>
            </div>
            
        )
    }
}

export default Support;