import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NavLink } from "react-router-dom";
import "./PasswordReset.css";
import { setMessage } from "../../Redux/Actions";

//validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Api from "../../Api";

function mapStateToProps(state) {
  const { message } = state;
  return {
    message,
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

class PasswordReset extends Component {
  constructor(props) {
    super(props);

    //init event handlers
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      emailAddress: "",
      loading: false,
      successful: false
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true, successful: false})

    this.form.validateAll();

    const { dispatch } = this.props;

    if(this.checkBtn.context._errors.length === 0) {

      const response = await Api.resetPassword(this.state.emailAddress)
        .then(r => {
          console.log(r)
          dispatch(setMessage(r.message))
          this.setState({loading: false, successful: true})
        })
        .catch(e => {
          console.log(e.response.data.message)
          dispatch(setMessage(e.response.data.message))
          this.setState({loading: false, successful: false})
        })
    } else {
      this.setState({loading: false})
    }
  }

  render() {
    const { message } = this.props;

    return (
        <div id="passwordreset">
            <div className="pwcontainer">
                <Avatar className="avatar"> <LockOutlinedIcon /> </Avatar>

                <Form className="form" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                    <h2 className="title" > Reset password </h2>
                    {!this.state.successful && (
                      <div>
                        <div className="form-group">
                            <Input className="form-control" type="email" value={this.state.emailAddress} placeholder="Email address" validations={[required, email]} onChange={e => this.setState({emailAddress: e.target.value})} />
                        </div>
                      

                        <div className="form-group">
                            <button className="form-btn btn btn-primary btn-block" disabled={this.state.loading} >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Reset password</span>
                            </button>
                        </div>
                      </div>
                    )}

                    {message && (
                        <div className="form-group">
                            {this.state.successful? (
                                <div className="alert alert-success" role="alert">
                                    {message}
                                </div>
                            ) : (
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            )}
                        </div>
                    )}

                    <CheckButton style={{display: "none"}} ref={(c) => {this.checkBtn = c}} />

                    <div className="form-group">
                        <NavLink to={"/register"}>
                            <span>Don't have an account yet?</span>
                        </NavLink>
                    </div>
                    <div className="form-group">
                        <NavLink to={"/login"}>
                            <span>Login</span>
                        </NavLink>
                    </div>
                </Form>
            </div>       
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(PasswordReset));
