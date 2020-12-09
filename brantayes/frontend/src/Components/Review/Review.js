import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import BeautyStars from 'beauty-stars';


class Review extends Component {

    render() {
        return (

        <Card style={{ width: 500, height: 200, margin: 10, display: "inline-block" }}>
            <div
                style={{
                marginLeft: 10,
                fontWeight: "bold",
                marginRight: 260,
                marginTop: 10,
                display: "inline-block" 
                }}
            >
                {this.props.item.Customer.username}
            </div>

            <div style={{ display: "inline-block", marginRight: 20,}}>{this.props.item.review_date}</div>
            <div style={{ display: "inline-block", marginRight: 20}}>{this.props.item.rating}/5 </div>
            <div style={{ display: "inline-block"}}>
            <BeautyStars
            value={this.state.rating}
            maxStars={this.state.rating}
            size={24}
            rating={1}
            activeColor={'#ffe32a'}
            /> </div>
            <div style={{marginLeft: 5, marginTop: 5}}>{this.props.item.description} </div>

        </Card>

        );
    }
}
export default Review;