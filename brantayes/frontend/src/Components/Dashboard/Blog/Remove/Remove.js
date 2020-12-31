import "./Remove.css";
import React, { Component } from 'react';
import Api from "../../../../Api";
import { Button, Select, MenuItem } from "@material-ui/core";

class Remove extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post: "",
            posts: [],
            message: "",
            successful: false,
        }
        this.fetchPosts = this.fetchPosts.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    async fetchPosts() {
        const response = await Api.getBlogPosts()
        .then((posts) => {
            this.setState({posts: posts})
        }).catch((err) => {
            console.error(err)
        })
    }

    async handleOnClick(e) {
        e.preventDefault()
        if(this.state.post !== "") {
            const response = await Api.removeBlogpost(this.state.post.post_id).then((r) => {
                this.setState({successful: true, message: r.message})
            }).catch((err) => {
                this.setState({successful: false, message: err.response.data.message})
            })
            this.fetchPosts()
            this.setState({post: ""})
        }
        else {
            this.setState({message: "No post selected"})
        }
    }

    componentDidMount() {
        this.fetchPosts()
    }

    render() {
        return(
            <div id="removeblogpost">
                <h2>Remove a post</h2>
                    <div className="row">
                        <Select disableUnderline displayEmpty value={this.state.post} onChange={e=> {this.setState({post: e.target.value})}}>
                            <MenuItem value="">Select post</MenuItem>
                            {this.state.posts.map(post => {
                                return <MenuItem value={post}>{post.title}</MenuItem>
                            })}
                        </Select>
                    </div>
                    <div className="row">
                        <Button
                            className="form-btn"
                            variant="outlined"
                            color="primary"
                            onClick={this.handleOnClick}
                        >
                            Delete
                        </Button>
                    </div>
                    <div className="row">
                        {this.state.message && (
                            <div className="message">
                                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
            </div>
        )
    }
}

export default Remove