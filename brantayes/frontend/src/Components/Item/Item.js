import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addItemInCart } from "../../Redux/Actions";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import "./Item.css";

class ConnectedItem extends Component {
    constructor(props) {
        super(props)

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    componentDidMount() {
    }

    handleMouseEnter = (e) => {
        //variables
        const card = e.currentTarget
        const sneaker = card.querySelector(".sneaker img");
        //movement
        sneaker.style.transitionDuration = "1s";
        sneaker.style.transitionDelay = ".3s";
        sneaker.style.transform = "translateZ(100px) rotateZ(-10deg)";
    }

    handleMouseLeave = (e) => {
        //variables
        const card = e.currentTarget
        const sneaker = card.querySelector(".sneaker img");
        //movement
        sneaker.style.transitionDuration = "1s";
        sneaker.style.transform = "translateZ(0px) rotateZ(0deg)";
    }

    handleOnClick = (e) => {
      this.props.history.push("/details/" + this.props.item.product_id)
    }

    handleAddToCart = (e) => {
      e.stopPropagation();
      this.props.dispatch(
        addItemInCart({ ...this.props.item, quantity: 1 })
      );
    }

  render() {
    return (
        <div id="item">
            <div className="container">
                <div className="card" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.handleOnClick}>
                    <div className="sneaker">
                        <div className="circle"></div>
                        <img src={this.props.item.image_url} alt="item image"/>
                    </div>
                    <div className="info">
                        <div>
                            <h1 className="title">{this.props.item.name}</h1>
                            <h3></h3>
                        </div>
                        <div className="purchase">
                            <Button className="button" variant="outlined" color="primary" onClick={this.handleAddToCart}> <AddShoppingCartIcon /> &euro; {this.props.item.retail_price}</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    /*
      <Card
        style={{ width: 200, height: 270, margin: 10, display: "inline-block" }}
      >
        <CardActionArea
          onClick={() => {
            this.props.history.push("/details/" + this.props.item.product_id);//id
          }}
        >
          <CardMedia
            style={{ height: 140 }}
            image={this.props.item.image_url}
          />
          <CardContent style={{ height: 50 }}>
            <div
              style={{
                marginLeft: 5,
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {this.props.item.name}
            </div>
            <div style={{ margin: 5 }}>Price: &euro; {this.props.item.retail_price} </div>
            <div style={{ color: "#1a9349", fontWeight: "bold", margin: 5 }}>
              {this.props.item.popular > 3 && "Popular"}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{ display: "flex", alignItems: "center", height: 45 }}
        >
          <Tooltip title="Add to cart">
            <IconButton
              size="small"
              style={{ marginTop: 40, marginLeft: 150 }}
              onClick={e => {
                e.stopPropagation();
                this.props.dispatch(
                  addItemInCart({ ...this.props.item, quantity: 1 })
                );
              }}
              color="primary"
              aria-label="Add to shopping cart"
            >
              <AddShoppingCartIcon size="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      */
    );
  }
}

export default withRouter(connect()(ConnectedItem));
