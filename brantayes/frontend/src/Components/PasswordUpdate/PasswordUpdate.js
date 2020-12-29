import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { NavLink } from "react-router-dom";
import "./PasswordUpdate.css";
import { setMessage } from "../../Redux/Actions";

//validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Api from "../../Api";

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

const vpassword = (value) => {
    if (value.length < 6) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be at least 6 characters.
            </div>
        )
    }
}
  
let p = ""
const vconfirmpassword = (value) => {
    if (value !== p) {
        return (
            <div className="alert alert-danger" role="alert">
                Password does not match.
            </div>
        )
    }
}

class PasswordUpdate extends Component {
  constructor(props) {
    super(props);

    //init event handlers
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      password: "",
      verifypassword: "",
      loading: false,
      successful: false
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({loading: true, successful: false})

    this.form.validateAll();

    const { dispatch } = this.props;
    const { user_id, token } = this.props.match.params

    if(this.checkBtn.context._errors.length === 0) {
        const data = {
            user_id: user_id,
            token: token,
            password: this.state.verifypassword,
        }

        const response = await Api.setNewPassword(data)
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
        <div id="passwordupdate">
            <div className="pwcontainer">
                <Avatar className="avatar"> <LockOutlinedIcon /> </Avatar>

                <Form className="form" onSubmit={this.handleSubmit} ref={(c) => {this.form = c}} >
                    <h2 className="title" > New password </h2>

                    <div className="form-group">
                        <Input className="form-control" type="password" value={this.state.password} placeholder="New password" validations={[required, vpassword]} onChange={e => this.setState({password: e.target.value})} />
                    </div>

                    <div className="form-group">
                        <Input className="form-control" type="password" value={this.state.verifypassword} placeholder="Confirm new password" validations={[required, vconfirmpassword]} onChange={e => {this.setState({password: e.target.value});p=e.target.value}} />
                    </div>

                    <div className="form-group">
                        <button className="form-btn btn btn-primary btn-block" disabled={this.state.loading} >
                            {this.state.loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Confirm password</span>
                        </button>
                    </div>

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

export default withRouter(connect(mapStateToProps)(PasswordUpdate));
