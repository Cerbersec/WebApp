import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NavLink } from "react-router-dom";
import Api from "../../Api";


const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUser
  };
};

class ConnectedLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: "",
      pass: "",
      redirectToReferrer: false
    };
  }

  render() {

    const handleSubmit = async (e) => {

      const data = {
        email_address: this.state.emailAddress,
        password: this.state.pass
      }
  
      //TODO: validate response, handle cookie with JWT token
      const response = await Api.login(data);
  
      this.props.dispatch(setLoggedInUser(true));
      this.setState({redirectToReferrer: true});
    }


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
            onChange={e => {
              this.setState({ emailAddress: e.target.value });
            }}
          />
          <TextField
            value={this.state.pass}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ pass: e.target.value });
            }}
          />
          <Button
            style={{ marginTop: 20, width: 200, marginBottom: 10 }}
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            Log in
          </Button>
          {this.state.wrongCred && (
            <div style={{ color: "red" }}>Wrong email address and/or password</div>
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
