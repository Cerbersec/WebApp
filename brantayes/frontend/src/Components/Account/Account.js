import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Account.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from '@material-ui/core/MenuItem';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";

import Api from "../../Api";

const mapStateToProps = state => {
    const { user } = state;
    const { message } = state;
    return {
      loggedInUser: state.loggedInUser,
      user,
      message,
    };
  };

class Account extends Component 
{
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            user: null,
            loading: false,
            fieldsetDisabled: true,
            firstName:"",
            lastName:"",
            userName: "",
            gender: "",
            // password: "",
            // confirmpassword: "",
            email: "",
            street: "",
            streetnr: "",
            postal: "",
            city: "",
            country: "",
            redirectToReferrer: false,
            bus_nr: "",
            phone: "",
            successful: false,
            loading: false,
            message: ""
        };
    }

    UpdateAccountInfo(e) {
        e.preventDefault();

        this.setState({
        successful: false,
        loading: true
        })

        this.form.validateAll();

        if(this.checkBtn.context._errors.length === 0) {
        const { dispatch } = this.props;
        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_address: this.state.email,
            gender: this.state.gender,
            username: this.state.userName,
            // password:this.state.password,
            // verify_password: this.state.confirmpassword,
            street_name: this.state.street,
            street_nr: this.state.streetnr,
            postal_code: this.state.postal,
            phone: this.state.phone,
            bus_nr: this.state.bus_nr,
            city: this.state.city,
            country: this.state.country,
            }

        //     dispatch(register(data))
        //     .then(() => {
        //       this.setState({successful: true, loading: false})
        //     })
        //     .catch((e) => {
        //       this.setState({successful: false, loading: false})
        //     })
        //     }

        // else {
        //     this.setState({loading: false})
        // }
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

    render()
    {
        if (this.state.loading || !this.state.user) {
            return <CircularProgress className="circular" />;
        }

        return (
            <div id="accountpage">
                <h1>My Brantayes account</h1>
                <h2>Account information</h2>           
                <div className="row border">                   
                    <div className="col-md-6">
                        <form>
                            <fieldset disabled={this.state.fieldsetDisabled}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" defaultValue={this.state.user.first_name} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.username} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.phone} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" defaultValue={this.state.user.last_name} />
                                        <input className="form-control" type="email" defaultValue={this.state.user.email_address} disabled/>
                                        <Select className="form-control" disableUnderline disabled={this.state.fieldsetDisabled}>
                                            <MenuItem value={"M"}>Male</MenuItem>
                                            <MenuItem value={"F"}>Female</MenuItem>
                                            <MenuItem value={"X"}>Other</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                    <div className="col-md-6">
                        <form>
                            <fieldset disabled={this.state.fieldsetDisabled}>
                                <div className="row">
                                    <div className="col-md-6">                               
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].street_name} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].postal_code} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].city} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].street_nr} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].bus_nr} />
                                        <input className="form-control" type="text" defaultValue={this.state.user.Addresses[0].country} />
                                    </div> 
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {this.state.fieldsetDisabled ? (
                    <Button
                        className="form-btn"
                        variant="outlined"
                        color="primary"
                        onClick={() => this.setState({ fieldsetDisabled: !this.state.fieldsetDisabled})} //TODO: handle form submit
                    >
                        Edit
                    </Button>
                    ) : (
                    <Button
                        className="form-btn"
                        variant="outlined"
                        color="primary"
                        onClick={() => this.setState({ fieldsetDisabled: !this.state.fieldsetDisabled})} //TODO: handle form submit
                    >
                        Save
                    </Button>
                    )}
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