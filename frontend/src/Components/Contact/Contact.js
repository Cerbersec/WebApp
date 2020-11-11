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
                    <ul>Mon: <li>09:30 - 18:30</li></ul>
                    <ul>Tue: <li>09:30 - 18:30</li></ul>
                    <ul>Wed: <li>09:30 - 18:30</li></ul>
                    <ul>Thu: <li>09:30 - 18:30</li></ul>
                    <ul>Fri: <li>09:30 - 18:30</li></ul>
                    <ul>Sat: <li>09:30 - 18:30</li></ul>
                    <ul>Sun: <li>09:30 - 18:30</li></ul>
                </div>
            </div>
        )
    }
}

export default Contact;