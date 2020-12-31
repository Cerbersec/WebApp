import "./Add.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import Button from "@material-ui/core/Button";
// validation
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import { isAlphanumeric} from "validator";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const vtext = (value) => {
    if (!isAlphanumeric(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Can not contain any special characters
            </div>
        )
    }
}

class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "",
            successful: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e) {
        e.preventDefault()

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0) {
            const data = {

            }
        }
    }

    render() {
        return(
            <div id="addproduct">
                <h2>Add a new product</h2>
                <Form onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                    <div className="row">
                        {/* <input className="form-control" type="text" placeholder="Title" validations={[required, vtext]} onChange={ e => {this.setState({title: e.target.value})}} /> */}
                    </div>
                    <div className="row">
                        <CheckButton style={{display:"none"}} ref={(c) => {this.checkBtn = c}} />
                        <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                        {this.state.message && (
                            <div className="message">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                </Form>
            </div>
        )
    }
}

export default Add