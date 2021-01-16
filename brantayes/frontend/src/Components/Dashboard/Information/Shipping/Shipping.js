import "./Shipping.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import { isNumeric } from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const vnumber = (value) => {
    if (!isNumeric(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid number.
        </div>
      );
    }
  };

class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            successful: false,
            disabled: false,
            message: "",
            shipping_costs: '',
            new_shipping_costs: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async fetchShipping() {
        this.setState({loading: true})
        const shipping = await Api.getShippingCosts();
        if(shipping) {this.setState({shipping_costs: shipping})}
        this.setState({loading: false})
    }

    async handleSubmit(e){
        e.preventDefault()

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            const data = {
                shipping_costs: this.state.new_shipping_costs,
            }
            
            const response = await Api.updateShipping(data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
        }
        else {
            this.setState({successful: false})
        }
    }

    componentDidMount() {
        this.fetchShipping();
    }

    render() {
        return(
            <div>
                <h2>Edit shipping costs</h2>
                <Form classname="shippingform" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                {!this.state.successful && (
                    <fieldset disabled={this.state.disabled}>
                        <div className="row">
                            <p>current shipping cost: &euro; {this.state.shipping_costs}</p>
                        </div>
                        <div className="row">
                            <label>New shipping cost: </label>
                            <Input
                                className="form-control"
                                id="shipping_cost"
                                type="text"
                                value={this.state.new_shipping_costs}
                                onChange={e => {this.setState({new_shipping_costs: e.target.value})}}
                                validations={[required, vnumber]}
                            />
                        </div>
                        <div className="row">
                            <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            type="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </fieldset>
                    )}
                    <div className="row">
                        {this.state.message && (
                            <div className="message">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                    <CheckButton style={{display:"none"}} ref={(c) => {this.checkBtn = c}} />
                </Form>
            </div>
        )
    }
}

export default Shipping