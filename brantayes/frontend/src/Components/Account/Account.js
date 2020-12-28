import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Account.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

import { isAlpha, isPostalCode, isNumeric, isAlphanumeric, isMobilePhone } from "validator";

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
            firstname:"",
            lastname:"",
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
            console.log("api call") //test
            dispatch(setMessage("successful")) //test

            //then()
            this.setState({successful: true, loading: false})

            //catch(e)
            //this.setState({successful: false, loading: false})
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
                                        <input className="form-control" type="text" defaultValue={this.state.user.first_name} validations={[required]} onChange={ e => {this.setState({first_name: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.username} validations={[required]} onChange={e => {this.setState({username: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.phone} onChange={e => {this.setState({phone: e.target.value})}} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" defaultValue={this.state.user.last_name} validations={[required]} onChange={e => {this.setState({last_name: e.target.value})}} />
                                        <input className="form-control" type="email" defaultValue={this.state.user.email_address} disabled />
                                        <Select className="form-control" disableUnderline displayEmpty disabled={this.state.fieldsetDisabled} value={this.state.user.gender} validations={[required]} onChange={e => {this.setState({gender: e.target.value})}} >
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
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].street_name} validations={[required]} onChange={ e => {this.setState({street_name: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].postal_code} validations={[required]} onChange={ e => {this.setState({postal_code: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].city} validations={[required]} onChange={ e => {this.setState({city: e.target.value})}} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].street_nr} validations={[required]} onChange={ e => {this.setState({street_nr: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].bus_nr} onChange={ e => {this.setState({bus_nr: e.target.value})}} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].country} validations={[required]} onChange={ e => {this.setState({country: e.target.value})}} />
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