import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { withRouter, Router, Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import PrivacyPolicy from "./Components/PrivacyRegulation/PrivacyRegulation.js";
import register from "./Components/Register/Register.js";
import contact from "./Components/Contact/Contact.js";
import support from "./Components/Support/Support.js";
import blog from "./Components/Blog/Blog.js";
import { history } from "./helpers/history";
import { clearMessage } from "./Redux/Actions";
import { connect } from "react-redux";

/* THEME */
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import Account from "./Components/Account/Account";
/* END */

const mapStateToProps = state => {
  return {
    user: state.auth,
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if(user) {
      this.setState({
        currentUser: user,
      })
    }
  }

  render() {
    const { currentUser } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
      <div className="app">
        <Header />
        <div className="app-body">
          <Menu />
          <div className="content">
            <CartDialog />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <Route path="/privacy" component={PrivacyPolicy}/>
              <ProtectedRoute path="/order" component={Order} />
              <Route path="/register" component={register}/>
              <Route path="/contact" component={contact}/>
              <Route path="/support" component={support}/>
              <Route path="/blog" component={blog}/>
              <Route path="/account" component={Account}/>
              <Route
                component={() => (
                  <div style={{ padding: 20 }}>Page not found</div>
                )}
              />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
