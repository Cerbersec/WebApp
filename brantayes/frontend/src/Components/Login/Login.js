import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setLoggedInUser } from "../../Redux/Actions";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NavLink } from "react-router-dom";
import { login } from "../../Redux/actions/auth"

//validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

function mapStateToProps(state) {
  const { isLoggedIn } = state;
  const { message } = state;
  return {
    isLoggedIn,
    message,
    loggedInUser: state.loggedInUser
  };
}

//setup validation
const required = (value) => {
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const email = value => {
  if(!isEmail(value)) {
    return(
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    )
  }
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

    this.form.validateAll();

    const { dispatch, history } = this.props;
    const data = {
      email_address: this.state.emailAddress,
      password: this.state.password
    }

    if(this.checkBtn.context._errors.length === 0) {
      dispatch(login(data))
        .then(() => {
          this.setState({redirectToReferrer: true})
        })
        .catch((e) => {
          this.setState({loading: false, wrongCred: true, wrongCredMsg: e.message})
        })

      //TODO: check if necessary
      dispatch(setLoggedInUser(true))
    } else {
      this.setState({loading: false})
    }
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { message } = this.props;

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

          <Form
            onSubmit={this.handleSubmit}
            ref={(c) => {
              this.form = c;
            }}
          >
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
          <div className="form-group">
            <Input
              type="text"
              className="form-control"
              value={this.state.emailAddress}
              placeholder="Email address"
              onChange={this.onChangeEmail}
              validations={[required, email]}
            />
          </div>
          <div className="form-group">
            <Input
              type="password"
              className="form-control"
              value={this.state.password}             
              placeholder="Password"
              onChange={this.onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <button
            className="btn btn-primary btn-block"
              style={{ marginTop: 20, width: 200, marginBottom: 10 }}
              //variant="outlined"
              //color="primary"
              //onClick={this.handleSubmit}
              disabled={this.state.loading}
            >
              {this.state.loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <div>
          <CheckButton
            style={{display: "none"}}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
          <div className="form-group">
            <NavLink
              to={"/register"}
            >
              <span>Nog geen account?</span>
            </NavLink>
          </div>
          </div>
          </Form>
        </div>       
      </div>
    );
  }
}
const Login = withRouter(connect(mapStateToProps)(ConnectedLogin));

export default Login;
