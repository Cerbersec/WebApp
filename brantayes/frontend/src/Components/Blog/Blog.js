import React, {Component} from "react";
import "./Blog.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";

class Blog extends Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      posts: []
    };
  }

  async fetchBlogPosts() {
    this.setState({loading: true})
    const posts = await Api.getBlogPosts();

    if(posts) {
      this.setState({posts: posts})
    }

    this.setState({loading: false})
  }

  componentDidMount() {
    this.fetchBlogPosts();
  }

  render(){

    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return(

      <div className="Blog">
      </div>
    )
  }
}
export default Blog; 