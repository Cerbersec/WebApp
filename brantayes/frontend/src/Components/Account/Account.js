import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import "./Account.css";

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
            //address: null,
            loading: false
        };
    }


    componentDidMount() {
        this.fetchOrders();
        this.fetchCustomer();
        //this.fetchCustomerAddress();
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
        console.log(response)
    }

    // async fetchCustomerAddress() {
    //     this.setState({loading: true})
    //     let response = await Api.getAddressByCustomerID()
    //     this.setState({address: response, loading: false})
    // }  

    render()
    {
        if (this.state.loading) {
            return <CircularProgress className="circular" />;
        }

        if (!this.state.customer) {
            return <CircularProgress className="circular" />;
        }

        return (

            <div className="AccountPage">
                <h1>My Brantayes account</h1>
                <br></br>
                <h2>Account information</h2>
                <div class="row">
                    <div class="col-md-6 personal-info">
                        <h5>Personal info</h5>
                        <form class="personal_info" action="">
                            <label>Name: </label>
                            <input type="text" id="name" value={this.state.customer.first_name + " " + this.state.customer.last_name} ></input><br></br>
                            <label>Username: </label>
                            <input type="text" value={this.state.customer.username}></input><br></br>
                            <label>Password: </label>
                            <input type="password" value={this.state.customer.password}></input><br></br>
                            <label>Gender: </label>
                            <input type="text" value={this.state.customer.gender}></input><br></br>
                            <button type="button" class="btn btn-primary" onclick="unlockPersonalSection()">Edit</button>
                        </form>
                    </div>

                    <div class="col-md-6 contact-info">
                        <h5>Contact info</h5>
                        <form class="contact_info">
                            <label>E-mail: </label>
                            <input type="email" value={this.state.customer.email_address} ></input><br></br>
                            <label>Phone: </label>
                            <input value={this.state.customer.phone}></input><br></br>
                            <label for="address">Address: </label>
                            <input type="text" value={this.state.customer.Addresses[0].street_name + " " + 
                                this.state.customer.Addresses[0].street_nr + ", bus " +
                                this.state.customer.Addresses[0].bus_nr}>
                            </input><br></br>
                            <label>City: </label>
                            <input value={this.state.customer.Addresses[0].postal_code + " " + 
                                this.state.customer.Addresses[0].city + ", " +
                                this.state.customer.Addresses[0].country}
                            ></input><br></br>
                            <button type="button" class="btn btn-primary" onclick="unlockConctactSection()">Edit</button>
                        </form>
                    </div>
                </div>

                {/* <script>
                function unlockPersonalSection() {
                    // var soap = document.getElementsByClassName("personal_info");
                    // soap.attr({'disabled': 'enabled'});
                    window.alert("does this even work?")
                }
                </script> */}
                                
                <br></br>
                <br></br>
                <br></br>

                <div className="Order History"> 
                    <h2>Order history</h2>
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
                                <TableCell> {new Date(order.order_date).toLocaleString('nl-BE')/*.toISOString().split('T')[0]*/} </TableCell>
                                <TableCell> {order.paid ? <Button variant="outlined" color="primary" style={{width:"160px"}} 
                                onClick={() => {this.props.history.push("/orderdetails/" + order.order_id);}}> View details</Button>
                                            : <Button variant="outlined" color="primary" style={{width:"160px"}}> Checkout </Button> } </TableCell>
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