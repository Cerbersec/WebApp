import React, {Component} from "react";
import "./Blog.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
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
        <h1>Brantayes Blog</h1>
        <div className="BlogContainer">
        {this.state.posts.map(post => {
          return <Card style={{ width: 500, height: 125, margin: 10, display: "inline-block"}}>
            <div style={{ margin: 10}} className="BlogPost">
            <CardActionArea 
          onClick={() => {
            this.props.history.push("/blogpost/" + post.post_id);
          }}
          >
            <CardContent>
            <h5>{post.title}</h5>
            </CardContent></CardActionArea>
            {new Date(post.post_date).toDateString()}
            <br></br>
            posted by Brantayes
            </div></Card>
        })}
        </div>
      </div>
    )
  }
}
export default Blog; 