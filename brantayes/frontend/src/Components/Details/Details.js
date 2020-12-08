import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addItemInCart } from "../../Redux/Actions";
import Api from "../../Api";
import Item from "../Item/Item";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import BeautyStars from 'beauty-stars';
import Review from "../Review/Review.js";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const valuetext = (value) => {
  return `${value}EU`;
}

class ConnectedDetails extends Component {
 
  constructor(props) {
    super(props);

    this.submitReview = this.submitReview.bind(this);
    this.isCompMounted = false;

    this.state = {
      relatedItems: [],
      quantity: 1,
      item: null,
      itemLoading: false,
      rating: 1,
      review: '',
      productId: '',
      reviews: [],
    };
  }

  async fetchReviews(productId) {
    let response = await Api.getReviews(productId);

    if(this.isCompMounted) {
      this.setState({
        reviews: response,
      })
    }
  }

  async fetchProductAndRelatedItems(productId) {
    this.setState({ itemLoading: true });

    let item = await Api.getItemUsingID(productId);

    let relatedItems = await Api.searchItems({
      category: item.Category_category_name
    });

    // Make sure this component is still mounted before we set state..
    if (this.isCompMounted) {
      this.setState({
        item,
        quantity: 1,
        relatedItems: relatedItems.data.filter(x => x.product_id !== item.product_id),
        itemLoading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If ID of product changed in URL, refetch details for that product
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchProductAndRelatedItems(this.props.match.params.id);
      this.fetchReviews(this.props.match.params.id);
    }
  }

  componentDidMount() {
    this.isCompMounted = true;
    this.fetchProductAndRelatedItems(this.props.match.params.id);
    this.fetchReviews(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.isCompMounted = false;
  }

  async submitReview() {
    var data = {
      productId: this.props.match.params.id,
      description: this.state.review,
      rating: this.state.rating
    };

    let resultaat = await Api.submitReview(data);
    
    console.log(resultaat);
    this.fetchReviews(this.props.match.params.id);
  }

  render() {
    if (this.state.itemLoading) {
      return <CircularProgress className="circular" />;
    }

    if (!this.state.item) {
      return null;
    }

    return (     
      <div className="row" style={{ padding: 10, margin: 0 }}>
        <div className="col-md-7">
          <div
            style={{
              marginBottom: 20,
              marginTop: 10,
              fontSize: 22,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            {this.state.item.name}
          </div>
          <div style={{ display: "flex" }}>
            <img
              src={this.state.item.image_url}
              alt=""
              height={250}
              style={{
                border: "1px solid lightgray",
                borderRadius: "5px",
                objectFit: "cover"
              }}
            />
            <div
              style={{
                flex: 1,
                marginLeft: 20,
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  fontSize: 16
                }}
              >
                Price: &euro; {this.state.item.retail_price}
              </div>
              {this.state.item.popular > 3 && (
                <div style={{ fontSize: 14, marginTop: 5, color: "#228B22" }}>
                  (Popular product)
                </div>
              )}

              <Typography id="discrete-slider" gutterBottom>
                Size
              </Typography>
              <Slider
                defaultValue={parseInt(this.state.item.size.split('-')[0])}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={parseInt(this.state.item.size.split('-')[0])}
                max={parseInt(this.state.item.size.split('-')[1])}
                style={{width: 160}}
              />

              <TextField
                type="number"
                value={this.state.quantity}
                style={{ marginTop: 20, marginBottom: 10, width: 70 }}
                label="Quantity"
                inputProps={{ min: 1, max: 10, step: 1 }}
                onChange={e => {
                  this.setState({ quantity: parseInt(e.target.value) });
                }}
              />
              <Button
                style={{ width: 170, marginTop: 5 }}
                color="primary"
                variant="outlined"
                onClick={() => {
                  this.props.dispatch(
                    addItemInCart({
                      ...this.state.item,
                      quantity: this.state.quantity
                    })
                  );
                }}
              >
                Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
              </Button>
            </div>
          </div>

          {/* Product description */}
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontSize: 22
            }}
          >
            Product Description
          </div>
          <div
            style={{
              maxHeight: 200,
              fontSize: 13,
              overflow: "auto"
            }}
          >
            {this.state.item.description
              ? this.state.item.description
              : "Not available"}
          </div>

          {/* Relateditems */}
          <div
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontSize: 22
            }}
          >
            Related Items
          </div>
          {this.state.relatedItems.slice(0, 3).map(x => {
            return <Item key={x.product_id} item={x} />;
          })}

        <div/>
      </div>
      <div className="col-md-3">
          <div
            style={{
              marginTop: 20,
              marginBottom: 10,
              fontSize: 22
            }}
          >
            Reviews
          </div>
          
          <BeautyStars
          value={this.state.rating}
          onChange={rating => this.setState({ rating })}
          />
          <div>
            <TextField 
              label="Type your review here"
              multiline
              rows={4}
              value={this.state.review}
              placeholder="review"
              onChange={e => {
                this.setState({ review : e.target.value });
            }}/>
          </div>
          <Button
            style={{ marginTop: 20, width: 200 }}
            variant="outlined"
            color="primary"
            onClick={this.submitReview}>
              submit
          </Button>
        {this.state.reviews.length > 0 && (
          this.state.reviews.map(review => {
          //do stuff here voor elke review
            return <Review key={review.review_id} item={review}/>
          })
        )}
        {!this.state.reviews.length > 0 && (
          <div>No Reviews available</div>
        )}
      </div>
    </div>
    );
  }
  
}


let Details = connect()(ConnectedDetails);
export default Details;
