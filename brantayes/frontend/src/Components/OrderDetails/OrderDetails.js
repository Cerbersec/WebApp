import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Api from "../../Api";
import Button from "@material-ui/core/Button";

class OrderDetails extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          order: null
        };
      }
    
      async fetchOrderByID(orderID) {
        this.setState({loading: true});

        const order = await Api.getOrderByID(orderID);
        
        if(order) {
          this.setState({order: order});
        }
        console.log(this.state.order);
        console.log(this.state.order.Orderlines);

        this.setState({loading: false});
      }
    
      componentDidMount() {
        this.fetchOrderByID(this.props.match.params.id);
      }
    render() {
      if (this.state.loading) {
        return <CircularProgress className="circular" />;
      }
  
      return(
        <div>
            <h2 style={{marginTop: 20}}>Order ID: {this.state.order.order_id}</h2>
            <div>
                Order date: {new Date(this.state.order.order_date).toDateString()}
                <br />
            <h5 style={{marginTop: 15}}>Product(s) you ordered:</h5>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight:"bold"}}>Product</TableCell>
                        <TableCell style={{fontWeight:"bold"}}>Picture</TableCell>
                        <TableCell style={{fontWeight:"bold"}}>Size</TableCell>
                        <TableCell style={{fontWeight:"bold"}}>Quantity</TableCell>
                        <TableCell style={{fontWeight:"bold"}}>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.order.Orderlines.map(line => {
                        return <TableRow key={line.product_id}>
                            <TableCell> {line.Product.name} </TableCell>
                            <TableCell><img src={line.Product.image_url} alt="" height={35}></img>
                            </TableCell>
                            <TableCell> {line.size} </TableCell>
                            <TableCell> {line.quantity} </TableCell>
                            <TableCell> &euro; {line.subtotal_price} </TableCell>
                            </TableRow>
                        })}
                </TableBody>
            </Table>

            Shipping Costs: &euro; {this.state.order.shipping_costs}
            <br></br>
            Total price: &euro; {this.state.order.total_price}
            <br ></br>
            <Button
                                variant="outlined"
                                color="primary"
                                style={{width:"140px"}} 
                                onClick={() => {this.props.history.push("/ordercancel/" + this.state.order.order_id);}}
                                >
                                    Cancel Order
                                </Button>
        
          </div>
        </div>
        );
    }
}
export default OrderDetails;