import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from "@material-ui/core/Badge";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withRouter, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu, logout } from "../../Redux/Actions";
import cartImage from "../../Images/brantayes.png";
import Auth from "../../Auth";
import Api from "../../Api";
import Person from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


const mapStateToProps = state => {
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser
  };
};

class ConnectedHeader extends Component {
  state = {
    searchTerm: "",
    anchorEl: null,
    categories: [],
    categoryFilterValue: ""
  };

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const categories = await Api.getCategories()
    //manually add All categories option
    categories.unshift({
      category_name: "All categories"
    })
    const categoryOptions = categories.map(x => {
      return (
        <MenuItem key={x.category_name} value={x.category_name}>
          {x.category_name}
        </MenuItem>
      );
    });

    this.setState({
      categories: categoryOptions,
      categoryFilterValue: categories[0].category_name
    })
  }

  render() {

    const handleSubmit = async () => {
      const response = await Api.logout()

      //TODO: validate response
      this.props.dispatch(logout());
      this.props.history.push("/");
    }



    let { anchorEl } = this.state;

    return (
      <AppBar
        position="static"
        color="primary"
        style={{ /*backgroundColor: "#183399",*/ padding: 0, marginBottom: 10 }}//header color
      >
        <Toolbar>
          <div className="left-part">
            <IconButton
              color="secondary"
              onClick={() => {
                this.props.dispatch(toggleMenu());
              }}
            >
              <MenuIcon size="medium" />
            </IconButton>

            <Link to="/"><img src={cartImage} alt={"Logo"} style={{width: 120, height: 90, marginLeft: 10 }} /></Link>

            <TextField
              style={{ marginLeft: 30, width: 250, marginBottom: 15, color:"white" }}
              inputProps = {{ style: { color: 'white' } }}
              InputLabelProps = {{ style: { color: 'white' } }}
              label="Search products"
              value={this.state.searchTerm}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}         
            />

            <Select
              style={{ maxWidth: 200, marginLeft: 20, color:"white" }}
              value={this.state.categoryFilterValue}
              MenuProps={{
                style: {
                  maxHeight: 500
                }
              }}
              onChange={e => {
                this.setState({ categoryFilterValue: e.target.value });
              }}
            >
              {this.state.categories}
            </Select>

            <Button
              color="secondary"
              variant="outlined"
              style={{marginLeft: 20, /*color:"white"*/ }}
              onClick={() => {
                this.props.history.push(
                  "/?category=" +
                    this.state.categoryFilterValue +
                    "&term=" +
                    this.state.searchTerm
                );
              }}
            >
              {" "}
              Search
            </Button>
          </div>
          <div className="right-part">
            {!this.props.loggedInUser ? (
              <Button
                color="secondary"
                variant="outlined"
                style={{ marginRight: 20 , /*color:"white"*/ }}
                
                onClick={() => {
                  this.props.history.push("/login");
                }}
              >
                Log in
              </Button>
            ) : (
              <Avatar
                onClick={event => {
                  this.setState({ anchorEl: event.currentTarget });
                }}
                style={{ backgroundColor: "#3f51b5", marginRight: 10 }}
              >
                <Person />
              </Avatar>
            )}
            <IconButton
              aria-label="Cart"
              //style={{color:"white"}}
              color="secondary"
              onClick={() => {
                this.props.dispatch(showCartDlg(true));
              }}
            >
              <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({ anchorEl: null });
              }}
            >
              {/* <MenuItem
                onClick={() => {
                  this.setState({ anchorEl: null });
                  this.props.history.push("/order");
                }}
              >
                Checkout page
              </MenuItem> */}
              <MenuItem>
                <NavLink to={"/account"} style={{textDecoration: 'none', color: "rgb(32, 32, 34)" }} >
                  My account
                </NavLink>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSubmit()
                  this.setState({ anchorEl: null });
                }}
              >
                Logout
              </MenuItem>
              
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default Header;
