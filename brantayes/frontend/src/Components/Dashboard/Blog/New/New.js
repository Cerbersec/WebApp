import "./New.css";
import React, { Component } from "react";
import Api from "../../../../Api";
import Button from "@material-ui/core/Button";
// validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { isAlphanumeric } from "validator";

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
    if (!isAlphanumeric(value.replace(/\s/g, ''))) {
        return (
            <div className="alert alert-danger" role="alert">
                Can not contain any special characters
            </div>
        )
    }
}

class New extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            content: "",
            message: "",
            successful: false,
            disabled: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e) {
        e.preventDefault()

        this.form.validateAll()

        if(this.checkBtn.context._errors.length === 0) {
            this.setState({disabled: true})
            const data = {
                title: this.state.title,
                content: this.state.content
            }

            const response = await Api.newBlogpost(data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
        }
        else {
            this.setState({successful: false})
        }
    }

    render() {
        return(
            <div id="newblogpost">
                <h2>Create a new post</h2>
                <Form className="blogform" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                    {!this.state.successful && (
                    <fieldset disabled={this.state.disabled}>
                        <div className="row">
                            <Input className="form-control idk" type="text" placeholder="Title" value={this.state.title} onChange={ e => {this.setState({title: e.target.value})}} validations={[required, vtext]} />
                        </div>
                        <div className="row">
                            <Textarea className="form-control idk" type="text" multiline rows="10" placeholder="What's happening?" value={this.state.content} onChange={ e => {this.setState({content: e.target.value})}} validations={[required]} />
                        </div>
                        <div className="row">
                            <Button
                                className="form-btn"
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Post
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

export default New