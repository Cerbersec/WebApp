import React, { Component } from "react";
import "./Contact.css";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

class Contact extends Component 
{
    render()
    {
        return (
            <div className="ContactPage">
                <div class="Column">
                    <h1>Contact Page</h1>
                    <h2>Can't find your answer?</h2>
                    Contact us through one of the following options: <br></br><br></br>
                    <ul><EmailIcon style={{ fontSize: 50}}></EmailIcon> &nbsp; Contact@brantayes.be</ul>
                    <ul><PhoneIcon style={{ fontSize: 50}}></PhoneIcon> &nbsp; +32 496 82 05 85</ul>
                    <br></br>
                </div>
                <div class="Column">
                    <h1>&nbsp;</h1>
                    <h2>Opening Hours:</h2> 
                    <ul>Mon: 09:30 - 18:30</ul>
                    <ul>Tue: 09:30 - 18:30</ul>
                    <ul>Wed: 09:30 - 18:30</ul>
                    <ul>Thu: 09:30 - 18:30</ul>
                    <ul>Fri: 09:30 - 18:30</ul>
                    <ul>Sat: 09:30 - 18:30</ul>
                    <ul>Sun: 09:30 - 18:30</ul>
                </div>
            </div>
        )
    }
}

export default Contact;