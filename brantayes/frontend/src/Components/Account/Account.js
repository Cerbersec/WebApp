import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Api from "../../Api";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
      loggedInUser: state.loggedInUser,
    };
  };

class Account extends Component 
{
    constructor(props) {
        super(props);

        this.state = {
            orders: null
        };
    }


    componentDidMount() {
        this.fetchOrders(this.props.match.params.id);
    }

    async fetchOrders(userId) {
        let response = await Api.getOrders(userId)
        console.log(response)
    }

    render()
    {
        return (
            <div className="AccountPage">
                <h1>Account Page</h1>
                <div className="Order History">    
                    <h2>Order History</h2>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>temp</TableCell>
                                <TableCell>temp</TableCell>
                                <TableCell>temp</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                
                <h1>!Under Construction!</h1>
            </div>
        )
    }
}

//const Account = withRouter(connect(mapStateToProps)(ConnectedAccount));
export default Account;