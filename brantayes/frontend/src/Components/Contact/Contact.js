import React, { Component } from "react";
import Api from "../../Api";
import "./Contact.css";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';

class Contact extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            phone: "",
            address1: "",
            address2: "",
            address3: ""
        }
    }
    
    async getCompanyInfo() {
        const info = await Api.getCompanyInfo();
        if(info) {this.setState({
            email: info.email,
            phone: info.phone,
            address1: info.adress_line_1,
            address2: info.adress_line_2,
            address3: info.adress_line_3
        })}
    }

    componentDidMount() {
        this.getCompanyInfo();
    }

    render()
    {
        return (
            <div className="ContactPage">
                <div class="Column">
                    <h1>Contact Page</h1>
                    <h2>Can't find your answer?</h2>
                    Contact us through one of the following options: <br></br><br></br>
                    <ul><EmailIcon style={{ fontSize: 25}}></EmailIcon> &nbsp; {this.state.email}</ul>
                    <ul><PhoneIcon style={{ fontSize: 25}}></PhoneIcon> &nbsp; {this.state.phone}</ul>
                    <ul><HomeIcon style={{ fontSize: 25}}></HomeIcon>
                        <div className="adress">
                        <p>{this.state.address1}</p>
                        <p>{this.state.address2}</p>
                        <p>{this.state.address3}</p>
                        </div>
                    </ul>
                    <br></br>
                </div>
                <div class="Column">
                    <h1>&nbsp;</h1>
                    <h2>Opening Hours Customer service:</h2> 
                    <ul>Mon: <li>09:00 - 17:30</li></ul>
                    <ul>Tue: <li>09:00 - 17:30</li></ul>
                    <ul>Wed: <li>09:00 - 17:30</li></ul>
                    <ul>Thu: <li>09:00 - 17:30</li></ul>
                    <ul>Fri: <li>09:00 - 17:30</li></ul>
                    <ul>Sat: <li>09:00 - 17:30</li></ul>
                    <ul>Sun: <li>09:00 - 17:30</li></ul>
                </div>
            </div>
        )
    }
}

export default Contact;