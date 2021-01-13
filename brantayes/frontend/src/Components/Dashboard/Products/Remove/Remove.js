import "./Remove.css";
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

class Remove extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            successful: false,
            disabled: false,
            message: "",
            product_id: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e){
        e.preventDefault()

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            
            const response = await Api.removeProduct(this.state.product_id).then((r) => {
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

    }

    render() {
        return(
            <div id="removeproduct">
                <h2>Remove product</h2>
                <Form classname="prodremove" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                {!this.state.successful && (
                    <fieldset disabled={this.state.disabled}>
                        <div className="row">
                            <label>Product ID: </label>
                        </div>
                        <div className="row">
                            <Input
                                className="form-control"
                                id="productid"
                                type="text"
                                value={this.state.product_id}
                                onChange={e => {this.setState({product_id: e.target.value})}}
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
                                Delete
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

export default Remove