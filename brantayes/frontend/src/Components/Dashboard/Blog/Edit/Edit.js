import "./Edit.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import { Button, Select, MenuItem } from "@material-ui/core";
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

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            content: "",
            post: "",
            posts: [],
            message: "",
            successful: false,
            disabled: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    async fetchPosts() {
        const response = await Api.getBlogPosts()
        .then((posts) => {
            this.setState({posts: posts})
        }).catch((err) => {
            console.error(err)
        })
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

            const response = await Api.editBlogpost(this.state.post.post_id, data).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })

        }
    }

    componentDidMount() {
       this.fetchPosts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.post !== prevState.post) {
            this.setState({title: this.state.post.title, content: this.state.post.content})
        }
    }

    render() {

        return(
            <div id="editblogpost">
                <h2>Edit a post</h2>
                <Form className="blogform" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                    {!this.state.successful && (
                    <fieldset disabled={this.state.disabled}>
                        <Select disableUnderline displayEmpty value={this.state.post} onChange={e=> {this.setState({post: e.target.value})}}>
                            <MenuItem value="">Select post</MenuItem>
                            {this.state.posts.map(post => {
                                return <MenuItem value={post}>{post.title}</MenuItem>
                            })}
                        </Select>
                        <div className="row">
                            <Input className="form-control idk" type="text" value={this.state.title} onChange={ e => {this.setState({title: e.target.value})}} validations={[required, vtext]} />
                        </div>
                        <div className="row">
                            <Textarea className="form-control idk" type="text" multiline rows="10" value={this.state.content} onChange={ e => {this.setState({content: e.target.value})}} validations={[required]} />
                        </div>
                        <div className="row">
                            <Button
                                className="form-btn"
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Save
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

export default Edit