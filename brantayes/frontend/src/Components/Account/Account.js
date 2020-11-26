import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class Account extends Component 
{
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

export default Account;