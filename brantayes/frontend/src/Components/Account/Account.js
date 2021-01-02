import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Account.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

//Validation
import Input from "react-validation/build/input";
import { isAlpha, isPostalCode, isNumeric, isAlphanumeric, isMobilePhone, isEmail } from "validator";

import Api from "../../Api";

import { setMessage } from "../../Redux/Actions";

const mapStateToProps = state => {
    const { user } = state
    const { message } = state
    return {
        loggedInUser: state.loggedInUser,
        user,
        message,
    }
}

//TODO: setup validation
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const vText = (value) => {
    if (!isAlpha(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This field cannot contain digits!
            </div>
        )
    }
}

const vMail = (value) => {
    if (!isEmail(value)) {
        return (
          <div className="alert alert-danger" role="alert">
            This is not a valid email.
          </div>
        );
    }
}

const vTextNumbers = (value) => {
    if (value && !isAlphanumeric(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Cannot contain any special characters.
        </div>
      )
    }
  }
  
  const vPostalCode = (value) => {
    if (!isPostalCode(value, 'any')) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid postal code.
        </div>
      );
    }
  }
  
  const vGender = (value) => {
    if (!(value === "")) {
      return (
        <div className="alert alert-danger" role="alert">
          Select your gender.
        </div>
      );
    }
  }
  
  const vPhoneNumber = (value) => {
    if(value && !isMobilePhone(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid phone number.
        </div>
      )
    }
  }
  
  const vNumber = (value) => {
    if (!isNumeric(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid number.
        </div>
      );
    }
  }

class Account extends Component 
{
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            orders: [],
            user: null,
            loading: false,
            successful: false,
            fieldsetDisabled: true,
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            gender: "",
            street: "",
            streetnr: "",
            postal: "",
            city: "",
            country: "",
            bus_nr: "",
            phone: "",
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({fieldsetDisabled: !this.state.fieldsetDisabled, successful: false, loading: true})

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
            const { dispatch } = this.props;
            const data = {
                first_name: this.state.firstname,
                last_name: this.state.lastname,
                gender: this.state.gender,
                email: this.state.email_address,
                username: this.state.username,
                street_name: this.state.street,
                street_nr: this.state.streetnr,
                postal_code: this.state.postal,
                phone: this.state.phone,
                bus_nr: this.state.bus_nr,
                city: this.state.city,
                country: this.state.country,
            }

            //TODO: api call here
            console.log(this.state)
            dispatch(setMessage("successful"))
            //dispatch(UpdateAccountInfo(data))
            //the fucker says "UpdateAccountInfo" doesn't exist
            //i (tried to) implement(ed) it in Api.js (last method in file)
                .then(() => {
                    this.setState({successful: true, loading: false})
                })
                .catch((e) => {
                    this.setState({successful: false, loading: false})
                })
        }
        else {
            this.setState({loading: false})
        }
    }

    componentDidMount() {
        this.fetchOrders();
        this.fetchUser();
    }

    async fetchOrders() {
        this.setState({loading: true})
        let response = await Api.getOrders()
        this.setState({orders: response, loading: false})
    }

    async fetchUser() {
        this.setState({loading: true})
        let response = await Api.getUserByID()
        this.setState({user: response.user, loading: false})
    }

    render() {
        const { message } = this.props

        if (this.state.loading || !this.state.user) {
            return <CircularProgress className="circular" />;
        }

        if(!this.props.user) {
            return <Redirect to="/login" />
        }

        return (
            <div id="accountpage">
                <h1>My Brantayes account</h1>
                <h2>Account information</h2>           
                <div>       
                    <Form onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                        <fieldset disabled={this.state.fieldsetDisabled} className="row border">          
                            <div className="col-md-6">
                        
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>First name:</label>
                                        <input
                                            id="firstName"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.first_name}
                                            validations={[required, vText]}
                                            onChange={ e => {this.setState({first_name: e.target.value})}}
                                        />
                                        <label>Username:</label>
                                        <input
                                            id="userName"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.username}
                                            validations={[required, vText]}
                                            onChange={e => {this.setState({username: e.target.value})}}
                                        />
                                        <label>Phone number:</label>
                                        <input
                                            id="phoneNumber"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.phone}
                                            validation={[vPhoneNumber]}
                                            onChange={e => {this.setState({phone: e.target.value})}}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Last name:</label>
                                        <input
                                            id="lastName"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.last_name}
                                            validations={[required, vText]}
                                            onChange={e => {this.setState({last_name: e.target.value})}}
                                        />
                                        <label>Email:</label>
                                        <input
                                            id="email"
                                            className="form-control"
                                            type="email"
                                            validation={[vMail]}
                                            defaultValue={this.state.user.email_address}
                                            disabled
                                        />
                                        <label>Gender:</label>
                                        <Select
                                            id="gender"
                                            className="form-control"
                                            disableUnderline
                                            displayEmpty
                                            disabled={this.state.fieldsetDisabled}
                                            value={this.state.user.gender}
                                            validations={[required, vGender]}
                                            onChange={e => {this.setState({gender: e.target.value})}}
                                        >
                                            <MenuItem value="">Select Gender</MenuItem>
                                            <MenuItem value={"M"}>Male</MenuItem>
                                            <MenuItem value={"F"}>Female</MenuItem>
                                            <MenuItem value={"X"}>Other</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                             <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">  
                                        <label>Street name:</label>                             
                                        <input
                                            id="streetName"
                                            className="form-control"
                                            type="text" defaultValue={this.state.user.Addresses[0].street_name}
                                            validations={[required, vText]}
                                            onChange={ e => {this.setState({street_name: e.target.value})}}
                                        />
                                        <label>Postal code:</label>
                                        <input
                                            id="postalCode"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.Addresses[0].postal_code}
                                            validations={[required, vPostalCode]}
                                            onChange={ e => {this.setState({postal_code: e.target.value})}}
                                        />
                                        <label>City:</label>
                                        <input
                                            id="city"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.Addresses[0].city}
                                            validations={[required, vText]}
                                            onChange={ e => {this.setState({city: e.target.value})}}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Street number:</label>
                                        <input
                                            id="streetNumber"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.Addresses[0].street_nr}
                                            validations={[required, vNumber]}
                                            onChange={ e => {this.setState({street_nr: e.target.value})}}
                                        />
                                        <label>Bus number:</label>
                                        <input
                                            id="busNumber"
                                            className="form-control"
                                            type="text"
                                            validation={[vTextNumbers]}
                                            defaultValue={this.state.user.Addresses[0].bus_nr}
                                            onChange={ e => {this.setState({bus_nr: e.target.value})}}
                                        />
                                        <label>Country:</label>
                                        <input
                                            id="country"
                                            className="form-control"
                                            type="text"
                                            defaultValue={this.state.user.Addresses[0].country}
                                            validations={[required, vText]}
                                            onChange={ e => {this.setState({country: e.target.value})}}
                                        />
                                    </div> 
                                </div>
                            </div>
                        </fieldset>
                        <CheckButton style={{display:"none"}} ref={(c) => {this.checkBtn = c}} />
                        <div className="row">
                            {this.state.fieldsetDisabled ? (
                            <Button
                                className="form-btn"
                                variant="outlined"
                                color="primary"
                                onClick={(e) => {e.preventDefault(); this.setState({ fieldsetDisabled: !this.state.fieldsetDisabled})}}
                            >
                                Edit
                            </Button>
                            ) : (
                            <Button
                                className="form-btn"
                                variant="outlined"
                                color="primary"
                                type="submit"
                                //onClick={(e) => {e.handleSubmit()}}
                            >
                                Save
                            </Button>
                            )}
                            {message && (
                                <div className="message">
                                    <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                </div>

                <h2>Order history</h2>
                <div className="row">                   
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>Order no.</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Total Price</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Shipping Cost</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Order Date</TableCell>
                                <TableCell style={{fontWeight:"bold"}}>Payment status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.orders.map(order => {
                            return <TableRow key={order.order_id}>
                                <TableCell> {order.order_id} </TableCell>
                                <TableCell> &euro; {order.total_price} </TableCell>
                                <TableCell> &euro; {order.shipping_costs} </TableCell>
                                <TableCell> {new Date(order.order_date).toLocaleString('nl-BE')} </TableCell>
                                <TableCell>
                                    {order.paid ? (
                                        <Button 
                                            variant="outlined"
                                            color="primary"
                                            style={{width:"160px"}} 
                                            onClick={() => {this.props.history.push("/orderdetails/" + order.order_id);}}
                                        >
                                            View details
                                        </Button>
                                    ) : ( 
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            style={{width:"160px"}}
                                        >
                                            Checkout
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Account));