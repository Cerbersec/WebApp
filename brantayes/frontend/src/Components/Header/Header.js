import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { showCartDlg, toggleMenu } from "../../Redux/Actions";
import { logout } from "../../Redux/actions/auth";
import "./Header.css";
import cartImage from "../../Images/brantayes.png";
import { IconButton, Badge, Button, Menu, MenuItem, Select, AppBar, Toolbar, InputBase } from "@material-ui/core";
import { Search as SearchIcon, ShoppingCart as ShoppingCartIcon, Menu as MenuIcon, PersonOutline as Person, PersonOutline, MoreVert as MoreIcon, Close as LogoutIcon }  from "@material-ui/icons";
import Api from "../../Api";
import { fade, withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    flexGrow: 2,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '80%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  categories: {
    float: 'right',
    height: '100%',
    color: 'white',
    marginTop: 2,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      outline: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const mapStateToProps = state => {
  const { user } = state;
  const { message } = state;
  const {isLoggedIn } = state;
  return {
    nrOfItemsInCard: state.cartItems.length,
    loggedInUser: state.loggedInUser,
    message,
    user,
    isLoggedIn,
  };
};

class Header extends Component {
  constructor(props) {
    super(props);
  
    this.handleLogout = this.handleLogout.bind(this)
    this.handleMobileMenuClose = this.handleMobileMenuClose.bind(this)
    this.handleMobileMenuOpen = this.handleMobileMenuOpen.bind(this)

    this.state = {
      searchTerm: "",
      anchorEl: null,
      categories: [],
      categoryFilterValue: "",
      mobileMoreAnchorEl: null,
    }
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    //const categories = await Api.getCategories()
    //manually add All categories option
    // categories.unshift({
    //   category_name: "All categories"
    // })
    const categories = [{name: "All categories"}, {name: "Men"}, {name: "Women"}, {name: "Children"}, {name: "Preschool"}, {name: "Toddler"}, {name: "Belts"}, {name: "Socks"},{name: "Other"}]

    const categoryOptions = categories.map(category => {
      return (
        <MenuItem key={category.name} value={category.name}>
          {category.name}
        </MenuItem>
      );
    });

    this.setState({
      categories: categoryOptions,
      categoryFilterValue: categories[0].name
    })
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ anchorEl: null });

    this.props.dispatch(logout())
    this.props.history.push("/store")
  }

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null })
  }

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  render() {
    const { classes } = this.props;

    let { anchorEl } = this.state;
    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <div>
          <AppBar position="static" color="primary" style={{ marginBottom: 10 }}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="secondary" onClick={() => {this.props.dispatch(toggleMenu())}}>
                <MenuIcon size="medium" />
              </IconButton>

              <img src={cartImage} alt="Logo" width="8%" onClick={() => {this.props.history.push("/store")}}/>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search products"
                  classes={{root: classes.inputRoot, input: classes.inputInput}}
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => {this.setState({ searchTerm: e.target.value })}}
                  onKeyPress={e => {if(e.key === 'Enter') { this.props.history.push("?category=" + this.state.categoryFilterValue + "&term=" + this.state.searchTerm); }}}
                />

                <Select
                  disableUnderline
                  className={classes.categories}
                  value={this.state.categoryFilterValue}
                  onChange={e => {this.setState({ categoryFilterValue: e.target.value });}}
                >
                  {this.state.categories}
                </Select>
              </div>

              <div className={classes.grow}/>
              <div className={classes.sectionDesktop}>
                {this.state.isLoggedIn && (
                  <IconButton aria-label="account settings" color="secondary" onClick={() => {this.props.history.push("/account")}}>
                    <PersonOutline />
                  </IconButton>
                )}

                <IconButton
                  aria-label="shopping cart"
                  color="secondary"
                  onClick={() => { this.props.dispatch(showCartDlg(true)) }}
                >
                  <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
              </IconButton>

                {!this.props.isLoggedIn ? (
                  <Button
                    edge="end"
                    color="secondary"
                    variant="text"          
                    onClick={() => { this.props.history.push("/login")}}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    edge="end"
                    color="secondary"
                    variant="text"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-label="show more" aria-controls="primary-search-account-menu-mobile" aria-haspopup="true" onClick={(e) => this.handleMobileMenuOpen(e)} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {this.state.mobileMoreAnchorEl && (
            <Menu
              anchorEl={this.state.mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={mobileMenuId}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(this.state.mobileMoreAnchorEl)}
              onClose={this.handleMobileMenuClose}
            >
              {this.state.isLoggedIn && (
                <MenuItem onClick={() => {this.props.history.push("/account")}}>
                  <IconButton aria-label="account settings" color="primary">
                      <PersonOutline />
                  </IconButton>
                  Account settings
                </MenuItem>
              )}
              <MenuItem onClick={() => { this.props.dispatch(showCartDlg(true)) }}>
                <IconButton
                  aria-label="shopping cart"
                  color="primary" 
                >
                  <Badge badgeContent={this.props.nrOfItemsInCard} color="primary">
                    <ShoppingCartIcon />
                  </Badge>
              </IconButton>
              Shopping Cart
              </MenuItem>
    
              {!this.props.isLoggedIn ? (
                  <MenuItem onClick={() => { this.props.history.push("/login")}}>
                    <IconButton
                      aria-label="login"
                      color="primary"
                    >
                      <Person />
                    </IconButton>
                  Login
                </MenuItem>
              ) : (
                <MenuItem onClick={this.handleLogout}>
                  <IconButton
                    aria-label="logout"
                    color="primary"
                  >
                    <LogoutIcon />
                  </IconButton>
                  Logout
                </MenuItem>
              )}
          </Menu>
          )}
        </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps)(withRouter(Header))
)
