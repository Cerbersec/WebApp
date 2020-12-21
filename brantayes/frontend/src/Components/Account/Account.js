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
            customer: null,
            loading: false,
            fieldsetDisabled: true,
        };
    }


    componentDidMount() {
        this.fetchOrders();
        this.fetchCustomer();
    }

    async fetchOrders() {
        this.setState({loading: true})
        let response = await Api.getOrders()
        this.setState({orders: response, loading: false})
    }

    async fetchCustomer() {
        this.setState({loading: true})
        let response = await Api.getCustomerByID()
        this.setState({customer: response.customer, loading: false})
    }

    render()
    {
        if (this.state.loading || !this.state.customer) {
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
                                        <input className="form-control" type="text" value={this.state.customer.first_name} />
                                        <input className="form-control" type="text" value={this.state.customer.last_name} />
                                        <input className="form-control" type="text" value={this.state.customer.phone} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" value={this.state.customer.username} />
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
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].street_name} />
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].postal_code} />
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].city} />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].street_nr} />
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].bus_nr} />
                                        <input className="form-control" type="text" value={this.state.customer.Addresses[0].country} />
                                    </div> 
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <Button
                        className="form-btn"
                        variant="outlined"
                        color="primary"
                        onClick={() => this.setState({ fieldsetDisabled: !this.state.fieldsetDisabled})} //TODO: handle form submit
                    >
                        {this.state.fieldsetDisabled ? ("Edit") : ("Save")}
                    </Button>
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