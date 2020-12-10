import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";

class OrderDetails extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          order: null
        };
      }
    
      componentDidMount() {
          console.log(this.props.match.params.id);
      }

    render() {
      if (this.state.loading) {
        return <CircularProgress className="circular" />;
      }
  
      return(
        <div>
          <h1>WIP</h1>
        </div>
        );
    }
}
export default OrderDetails;