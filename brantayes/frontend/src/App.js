import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header/Header.js";
import ProductList from "./Components/ProductList/ProductList";
import { withRouter, Switch, Route } from "react-router-dom";
import Menu from "./Components/Menu/Menu";
import CartDialog from "./Components/CartDialog/CartDialog";
import Details from "./Components/Details/Details";
import Order from "./Components/Order/Order";
import Login from "./Components/Login/Login";
import Account from "./Components/Account/Account";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import OrderCancel from "./Components/OrderCancel/OrderCancel";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Footer from "./Components/Footer/Footer";
import PrivacyPolicy from "./Components/PrivacyRegulation/PrivacyRegulation.js";
import register from "./Components/Register/Register.js";
import contact from "./Components/Contact/Contact.js";
import support from "./Components/Support/Support.js";
import TermsOfPayment from "./Components/TermsOfPayment/TermsOfPayment.js";
import blog from "./Components/Blog/Blog.js";
import blogpost from "./Components/BlogPost/BlogPost.js";
import OrderDetails from "./Components/OrderDetails/OrderDetails.js";
import { history } from "./helpers/history";
import { clearMessage } from "./Redux/Actions";
import { connect } from "react-redux";
import Home from "./Components/Home/Home";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import PasswordUpdate from "./Components/PasswordUpdate/PasswordUpdate";
import Dashboard from "./Components/Dashboard/Dashboard";

// Theme
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

//Google Analytics
import GA4React from "ga-4-react";
const trackingID = "G-19MJST6SEF";
const ga4react = new GA4React(trackingID)

const mapStateToProps = state => {
  const { user } = state;
  return {
    user,
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
      
      //Google Analytics page view tracking
      ga4react.initialize().then((ga4) => {
        ga4.pageview(location.pathname + location.search)
      }, (err) => {
        console.error(err)
      })
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
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
      <div className="app">
        {this.props.history.location.pathname !== '/' && (
          <Header />
        )}
        <div className="app-body">
          {this.props.history.location.pathname !== '/' && (
            <Menu />
          )}
          <div className="content" style={{ paddingLeft: 20}}>
            <CartDialog />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/store" exact component={ProductList} />
              <Route path="/details/:id" component={Details} />
              <Route path="/login" component={Login} />
              <Route path="/privacy" component={PrivacyPolicy}/>
              <ProtectedRoute path="/order" component={Order} />
              <Route path="/register" component={register}/>
              <Route path="/contact" component={contact}/>
              <Route path="/support" component={support}/>
              <Route path="/blog" component={blog}/>
              <Route path="/blogpost/:id" component={blogpost}/>
              <Route path="/account" exact component={Account}/>
              <Route path="/payment" component={TermsOfPayment}/>
              <Route path="/ordersuccess/:session_id" component={OrderSuccess}/>
              <Route path="/ordercancel" component={OrderCancel}/>
              <Route path="/orderdetails/:id" component={OrderDetails}/>
              <Route path="/account/recovery" exact component={PasswordReset}/>
              <Route path="/account/recovery/update-password/:user_id/:token" exact component={PasswordUpdate}/>
              <Route path="/dashboard" component={Dashboard}/>
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
