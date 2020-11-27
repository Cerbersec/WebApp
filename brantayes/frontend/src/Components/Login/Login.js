import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NavLink } from "react-router-dom";
//import Api from "../../Api";
import { login } from "../../Redux/actions/auth"

function mapStateToProps(state) {
  const { isLoggedIn } = state;
  const { message } = state;
  return {
    isLoggedIn,
    message,
    loggedInUser: state.loggedInUser
  };
}

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);

    //init event handlers
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      emailAddress: "",
      password: "",
      redirectToReferrer: false,
      wrongCred: false,
      wrongCredMsg: "",
      loading: false
    };
  }

  onChangeEmail(e) {
    this.setState({
      emailAddress: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true})

    const { dispatch, history } = this.props;
    const data = {
      email_address: this.state.emailAddress,
      password: this.state.password
    }

    dispatch(login(data))
      .then(() => {
        this.setState({redirectToReferrer: true})
      })
      .catch((e) => {
        this.setState({loading: false, wrongCred: true, wrongCredMsg: e.message})
      })

    //TODO: check if necessary
    dispatch(setLoggedInUser(true))
  }

  render() {
    /*
    const handleSubmit = async (e) => {

      const data = {
        email_address: this.state.emailAddress,
        password: this.state.password
      }
  
      //TODO: validate response
      const response = await Api.login(data);

      if(response !== 200) {
        this.setState({ 
          wrongCred: true,
          wrongCredMsg: response
        })
      }
      else {
        this.props.dispatch(setLoggedInUser(true));
        this.setState({redirectToReferrer: true});
      }
    }
    */

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    // If user was authenticated, redirect her to where she came from.
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",

          alignItems: "center"
        }}
      >
        <div
          style={{
            height: 300,
            width: 200,
            padding: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
          }}
        >
          <Avatar style={{ marginBottom: 10 }}>
            <LockOutlinedIcon />
          </Avatar>
          <div
            style={{
              marginBottom: 20,
              fontSize: 24,
              textAlign: "center"
            }}
          >
            {" "}
            Log in{" "}
          </div>
          <TextField
            value={this.state.emailAddress}
            placeholder="Email address"
            onChange={this.onChangeEmail}
          />
          <TextField
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={this.onChangePassword}
          />
          <Button
            style={{ marginTop: 20, width: 200, marginBottom: 10 }}
            variant="outlined"
            color="primary"
            onClick={this.handleSubmit}
          >
            Log in
          </Button>
          {this.state.wrongCred && (
            <div style={{ color: "red", width: 200, textAlign: "center" }}>{ this.state.wrongCredMsg }</div>
          )}
          <div>
        <NavLink
      to={"/register"}
    >
      <div >Nog geen account?</div>
    </NavLink>
        </div>
        </div>
        
      </div>

    );
  }
}
const Login = withRouter(connect(mapStateToProps)(ConnectedLogin));

export default Login;
