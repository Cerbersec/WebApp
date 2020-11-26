import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { setCheckedOutItems, setCartItems} from "../../Redux/Actions";
import Api from "../../Api";
import StripeCheckout from "react-stripe-checkout";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};



// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  render() {
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.retail_price * item.quantity;
    }, 0);

     

    function handleToken(token, addresses){
      console.log({token , addresses})
      alert("Payment received!");
      
    }
    return (
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 24, marginTop: 10 }}>Order summary</div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.checkedOutItems.map((item, index) => {
              return (
                <TableRow key={item.product_id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.retail_price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div
          style={{
            color: "#504F5A",
            marginLeft: 5,
            marginTop: 50,
            fontSize: 22
          }}
        >
          Total price: &euro; {totalPrice}
        </div>
       {/*  <Button
          color="primary"
          variant="outlined"
          disabled={totalPrice === 0}
          onClick={() => {
            const orderdata = {
              "order_lines" : this.props.checkedOutItems
            };
            console.log(this.props.checkedOutItems)
            console.log("purchased");//purchase API call
            Api.checkout(orderdata);
          }}
          style={{ margin: 5, marginTop: 30 }}
        >
          Purchase
        </Button> */}
        <div onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
            this.props.dispatch(setCartItems([]));
            
          }}>
        <StripeCheckout
        stripeKey="pk_test_51HrjMQAhYVhfBMPgiJOlGVoQVTCtytMCzQmKcwhTNeIAdpHFdHTqDr9I2fxT2VopxfvOZFSg24wl0Ab4CCBlTIi6005qykfakb"
        token={handleToken}
        amount={totalPrice * 100}
        style={{ marginTop: 10 }}
        
         />
         </div>
        <Button
          color="primary"
          variant="outlined"
          
          onClick={() => {
            this.props.dispatch(setCheckedOutItems([]));
            this.props.dispatch(setCartItems([]));
            
          }}
          //style={{ margin: 5, marginTop: 30 }}
        >
          Discard
        </Button>
        
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
