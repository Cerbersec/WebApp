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
import StripeContainer from "../../Stripe/stripeContainer";

const mapStateToProps = state => {
  return {
    checkedOutItems: state.checkedOutItems
  };
};

// This component shows the items user checked out from the cart.
class ConnectedOrder extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      orderId: '',
      loading: false,
      successful: false
    }
  }

  async handleSubmit() {
    this.setState({loading: true, successful: false})

    const orderdata = {
      orderlines: this.props.checkedOutItems
    }

    if(orderdata.orderlines) {
      let result = await Api.checkout(orderdata);

      if(result) {
        this.setState({orderId: result.order_id, loading: false, successful: true})
        this.props.dispatch(setCheckedOutItems([]));
        this.props.dispatch(setCartItems([]));
      }
      else {
        this.setState({loading: false, successful: false})
      }
    }
    else {
      this.setState({loading: false})
    }
  }

  render() {
    
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      return accumulator + item.retail_price * item.quantity;
    }, 0);

    return (
      <div>
        {!this.state.successful && (
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
            <Button
              color="primary"
              variant="outlined"
              disabled={totalPrice === 0}
              onClick={this.handleSubmit}
              style={{ margin: 5, marginTop: 30 }}
            >
              Purchase
            </Button>
            <Button
              color="primary"
              variant="outlined"  
              style={{ margin: 5, marginTop: 30 }}       
              onClick={() => {
                this.props.dispatch(setCheckedOutItems([]));
                this.props.dispatch(setCartItems([]));            
              }}
            >
              Discard
            </Button>        
          </div>
        )}
        {this.state.successful && (
          <StripeContainer orderId={this.state.orderId}/>
        )}
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
