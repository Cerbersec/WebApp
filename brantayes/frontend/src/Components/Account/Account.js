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
            customers: [],
            loading: false
        };
    }


    componentDidMount() {
        this.fetchOrders();
        this.fetchCustomers();
    }

    async fetchOrder() {
        this.setState({loading: true})
        let response = await Api.getOrders()
        this.setState({orders: response, loading: false})
    }

    async fetchCustomer() {
        this.setState({loading: true})
        let response = await Api.getCustomerByID()
        this.setState({customers: response, loading: false})
    }

    render()
    {
        if (this.state.loading) {
            return <CircularProgress className="circular" />;
        }

        return (

            <div className="AccountPage">
                <h1>Account Page</h1>
                <h2>Account info</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>My Brantayes account</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* {this.state.customers.map(customer => { return
                            <TableRow key={customer.customer_id}>
                                <TableCell>Username</TableCell>
                                <TableCell> {customer.username} </TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell> <Button>Change</Button> </TableCell>
                            </TableRow>
                        })} */}
                        </TableBody>

                        <TableHead>
                            <TableRow>
                                <TableCell style={{fontWeight:"bold"}}>Personal info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
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
                                <TableCell> {order.paid ? <Button variant="outlined" color="primary" style={{width:"160px"}}> View details</Button>
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