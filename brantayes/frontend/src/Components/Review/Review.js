import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import BeautyStars from 'beauty-stars';
import "./Review.css"


class Review extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <Card style={{ marginTop: 10, marginBottom: 10, width: 600}}>
            <div className="row header">
                <div className="col-md-2">
                    {this.props.item.Customer.username}:
                </div>
                <div className="col-md-4">
                    <BeautyStars
                    value={this.props.item.rating}
                    maxStars={this.props.item.rating}
                    size={20}
                    rating={1}
                    activeColor={'#ffe32a'}
                    />                
                </div>
                <div className="col-md-3">
                    ({this.props.item.rating} / 5)
                </div>
                <div className="col-md-3 date">
                    {this.props.item.review_date}
                </div>
            </div>
            <div className="row">
                <div className="col-md-10">
                    {this.props.item.description}
                </div>
            </div>
        </Card>
        );
    }
}
export default Review;