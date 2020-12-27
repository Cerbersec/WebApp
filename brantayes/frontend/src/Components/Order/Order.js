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
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe('pk_test_51HsWiuEGWfldFJu67udyAjf2iYKc101tgkLEbRbxwt5pdQbCOWNCWXDwLgMC9xfzP7yCrHsbAu5G4n38Z3Bf3wdL00sNTFagh3');

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
      successful: false,
      shippingCosts: 12
    }
  }

  async createOrder() {
    const orderdata = {
      orderlines: this.props.checkedOutItems
    }

    if(orderdata.orderlines) {
      let result = await Api.checkout(orderdata);

      if(result) {      
        this.props.dispatch(setCheckedOutItems([]));
        this.props.dispatch(setCartItems([]));
        this.setState({orderId: result.order_id, loading: false, successful: true})
        return true;
      }
      else {
        this.setState({loading: false, successful: false})
      }
    }
    else {
        this.setState({loading: false})
    }
  }

  async handleStripe() {
    //get stripe instance
    const stripe = await stripePromise;

    // call backend to create checkout session
    const data = {
      order_id: this.state.orderId,
    }
    const session = await Api.pay(data);

    if(this.state.successful && session) {
      console.log(session.data.id)
      //redirect
      const redirect = await stripe.redirectToCheckout({
        sessionId: session.data.id,
      })

      //error handling
      if(redirect.data.error) {
        console.log(redirect.data.error)
      }
    }
    else {
      console.log("no session")
    }
  }

  async handleSubmit() {
    this.setState({loading: true, successful: false})
    const result = await this.createOrder()

    if(result) {
      const payment = await this.handleStripe()
    }
  }

  render() {
    let btwpercentage = 21;
    let btw = 0;
    
    let totalPrice = this.props.checkedOutItems.reduce((accumulator, item) => {
      const result = accumulator + item.retail_price * item.quantity;
      if (result >= 100){this.state.shippingCosts = 0;}
      return result;
    }, 0);

    if(totalPrice != 0) { btw = (totalPrice * btwpercentage/(100+btwpercentage)).toFixed(2) }

    return (
      <div>
        {!this.state.successful && (
          <div style={{ padding: 10 }}>
            <div style={{ fontSize: 24, marginTop: 10 }}>Order summary</div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell>Item name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.checkedOutItems.map((item, index) => {
                  return (
                    <TableRow key={item.product_id}>
                      <TableCell>
                        <img src={item.image_url}
                        alt=""
                        height={100}
                        ></img>
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>&euro; {item.retail_price}</TableCell>
                      <TableCell>{item.selectedSize}</TableCell>
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
              <p>
                Btw: &euro; {btw}
                <br></br>
                Subtotal: &euro; {totalPrice}
                <br></br>
                Shipping costs: &euro; {this.state.shippingCosts}
              </p>
              <p>Total price: &euro; {(totalPrice + this.state.shippingCosts)}</p>
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
                this.props.history.push("/store")
              }}
            >
              Discard
            </Button>        
          </div>
        )}
      </div>
    );
  }
}
const Order = withRouter(connect(mapStateToProps)(ConnectedOrder));

export default Order;
