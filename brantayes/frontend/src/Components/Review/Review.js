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
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";


class Review extends Component {
 
    render() {
        return (

        <Card style={{ width: 500, height: 200, margin: 10, display: "inline-block" }}>
            <div
                style={{
                marginLeft: 5,
                fontWeight: "bold",
                marginRight: 270,
                marginTop: 5,
                display: "inline-block" 
                }}
            >
                {this.props.item.Customer.username}
            </div>

            <div style={{ display: "inline-block", marginRight: 20,}}>{this.props.item.review_date}</div>
            <div style={{ display: "inline-block"}}>{this.props.item.rating}/5</div>
            <div style={{marginLeft: 5, marginTop: 5}}>{this.props.item.description} </div>

        </Card>

        );
    }
}
export default Review;