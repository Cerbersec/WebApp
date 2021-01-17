import React, { Component } from "react";
import "./Support.css";
import EmailIcon from '@material-ui/icons/Email';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";

class Support extends Component 
{
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        
        this.state = { 
            status: ""
        }
    }

    render()
    {
        return (
            <div>
                <div className="Column">
                    <h1>Support Page</h1>
                    <br></br>
                    <h4>Shipping costs</h4>
                    FREE SHIPPING ON ORDERS OVER € 100,-
                    <br></br><br></br>
                    <h4>Delivery?</h4>
                    We ship our parcels with PostNL. If you order on workdays before 22:45, we guarantee that we will transfer your order to PostNL the same day. You will receive your order the next day, both in the Netherlands and Belgium. Of course, this often works, but not always. We ask for your understanding.
                    <br></br><br></br>
                    <h4>Not at home?</h4>
                    If you are not at home to receive your parcel, PostNL will try to drop off your parcel at the neighbors. If this also fails, PostNL will try to deliver your parcel the next day. In both cases the driver of PostNL will leave a message in your mailbox. With the "non home code" on the message you can indicate where and when you want PostNL to make the second delivery attempt. If the second delivery attempt is also unsuccessful, PostNL will deliver your parcel to the nearest post office. With the pickup message you can pick up your parcel, you have 7 days to do so. After 7 days your parcel will be returned to us. As soon as we have received the parcel back we will contact you.
                    <br></br><br></br>
                    <h4>Is your package delayed?</h4>
                    PostNL aims to deliver your order within 1 working day. 99% of our orders are delivered within 1 working day. The remaining 1% is unfortunately delayed. Of course we find this very annoying, but unfortunately we have no influence on this. If your order has not been delivered one day after the expected delivery date, please contact us!
                    <br></br><br></br>
                    <h4>Want to return your order?</h4>
                    Please mail to our support inbox!
                    
                    <br></br><br></br>
                </div>
                <div className="Column">
                    {/* <form id="support-form" onSubmit={this.submitForm} action="https://formspree.io/f/xpzokvek" method="POST" >                            */}
                    <form id="support-form" onSubmit={this.submitForm} action="https://formspree.io/f/mdopbnbj" method="POST">
                        <h1>&nbsp;</h1>
                        <br></br>
                        <h4>Want to mail us?</h4>
                        <EmailIcon style={{ fontSize: 50}}></EmailIcon> &nbsp; support@brantayes.be
                        <br></br><br></br>
                        <div>
                            <h4>Message us directly:</h4>
 
                            <p>Your e-mailaddress:</p>
                            <Input
                                label="Type your e-mail here"
                                name="email"
                                type="email"
                                style={{ width: 600, marginTop: 10, backgroundColor: "white" }}
                                variant="outlined"
                                placeholder="your e-mail"
                            />
                        <br></br><br></br>
                        <p>Your message:</p>
                        <TextField 
                            label="Type your message here"
                            name="message"
                            type="text"
                            multiline
                            style={{ width: 600, marginTop: 10, backgroundColor: "white" }}
                            variant="outlined"
                            rows={4}
                            placeholder="your message"
                        />
                        <br></br>

                        {this.state.status !== "SUCCESS" ? (
                        <Button
                            style={{ marginTop: 20, width: 200 }}
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            submit
                        </Button>
                        ) : (
                            <p>Message sent!</p>
                        )}

                        {this.state.status === "ERROR" && <p>Ooops! There was an error.</p>}
                        
                        </div>
                    </form>                
                </div>
            </div>
        )
    }

    submitForm(ev) {
        ev.preventDefault();
        const form = ev.target;
        const data = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== XMLHttpRequest.DONE) return;
          if (xhr.status === 200) {
            form.reset();
            this.setState({ status: "SUCCESS" });
            console.log("support succes");
          } else {
            this.setState({ status: "ERROR" });
            console.log("support error");
          }
        };
        xhr.send(data);
        ev.target.reset();
    }
}

export default Support;