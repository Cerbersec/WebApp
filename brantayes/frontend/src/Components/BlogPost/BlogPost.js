import React, {Component} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Api from "../../Api";
import "./BlogPost.css";

class BlogPost extends Component{

    constructor(props) {
        super(props);
    
        this.state = {
          loading: true,
          post: null
        };
      }
    
      async fetchBlogPostByID(postID) {
        this.setState({loading: true});

        const post = await Api.getBlogPostByID(postID);
        
        if(post) {
          this.setState({post: post});

          console.log(this.state.post);
        }

        this.setState({loading: false})
      }
    
      componentDidMount() {
        this.fetchBlogPostByID(this.props.match.params.id);
      }

    render() {
      if (this.state.loading) {
        return <CircularProgress className="circular" />;
      }
  
      return(
        <div>
          <h1>{this.state.post.title}</h1>
          <div className="PostDetails">
            posted by Brantayes
            <br></br>
            {new Date(this.state.post.post_date).toDateString()}
          </div>
          
          <div className="PostContent">
            {this.state.post.content}
          </div>
        </div>
        );
    }
}
export default BlogPost;