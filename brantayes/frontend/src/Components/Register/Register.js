import React, {Component} from "react";
import { withRouter, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Api from "../../Api";
import { register } from "../../Redux/actions/auth";
import { connect } from "react-redux";

//validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail, isAlpha, isPostalCode, isNumeric } from "validator";

const mapStateToProps = state => {
  const { message } = state;
  return {
    message,
  }
}

//setup validation
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be at least 6 characters.
      </div>
    );
  }
};

let p = ""
const vconfirmpassword = (value) => {
  if (value != p) {
    return (
      <div className="alert alert-danger" role="alert">
        Password does not match.
      </div>
    );
  }
};

const vtext = (value) => {
  if (!isAlpha(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Cannot contain any digits.
      </div>
    );
  }
};

const vpostalcode = (value) => {
  if (!isPostalCode(value, 'any')) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid postal code.
      </div>
    );
  }
};

const vgender = (value) => {
  if (!(value === "")) {
    return (
      <div className="alert alert-danger" role="alert">
        Select your gender.
      </div>
    );
  }
};

const vnumber = (value) => {
  if (!isNumeric(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid number.
      </div>
    );
  }
};

class Register extends Component{
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      firstName:"",
      lastName:"",
      userName: "",
      gender: "",
      password: "",
      confirmpassword: "",
      email: "",
      street: "",
      streetnr: "",
      postal: "",
      city: "",
      country: "",
      redirectToReferrer: false,
      bus_nr: "",
      phone: "",
      successful: false,
      loading: false,
      message: ""
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      successful: false,
      loading: true
    })

    this.form.validateAll();

    if(this.checkBtn.context._errors.length === 0) {
      const { dispatch } = this.props;
      const data = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email_address: this.state.email,
        gender: this.state.gender,
        username: this.state.userName,
        password:this.state.password,
        verify_password: this.state.confirmpassword,
        street_name: this.state.street,
        street_nr: this.state.streetnr,
        postal_code: this.state.postal,
        phone: this.state.phone,
        bus_nr: this.state.bus_nr,
        city: this.state.city,
        country: this.state.country,
      }

      dispatch(register(data))
        .then(() => {
          this.setState({successful: true, loading: false, message: "Successfully registered."})
        })
        .catch((e) => {
          this.setState({successful: false, loading: false, message: "Register failed. User already exists."})
        })
    }
    else {
      this.setState({loading: false, message: "Something went wrong!"})
    }
  }


    render(){
      //const { message } = this.props;
      const message = this.state.message;

      return(
        <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: '100px'
        }}
        >
          <div
            style={{
              //height: 600,
              //width: 600,
              padding: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          > 
            <Avatar style={{ marginBottom: 10 }}>
              <GroupAddIcon />
            </Avatar>

            <Form
              onSubmit={this.handleSubmit}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div
                    style={{
                      marginBottom: 20,
                      fontSize: 24,
                      textAlign: "center"
                    }}
                  >
                  {" "}
                  Register{" "}
                  </div>
                  <div className="RegisterPage">
                    <div className="row form-group">
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.firstName}
                          placeholder="First Name"
                          onChange={e => {
                            this.setState({ firstName: e.target.value });
                          }}
                          validations={[required, vtext]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.lastName}
                          placeholder="Last name"
                          onChange={e => {
                            this.setState({ lastName: e.target.value });
                          }}
                          validations={[required, vtext]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="email"
                          className="form-control"
                          value={this.state.email}
                          placeholder="Email address"
                          onChange={e => {
                            this.setState({ email: e.target.value });
                          }}
                          validations={[required, email]}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.phone}
                          placeholder="Phone"
                          onChange={e => {
                            this.setState({ phone: e.target.value });
                          }}
                          validations={[required, vnumber]}
                        />
                      </div>
                      <div className="col">
                        <Select
                        className="form-control"
                          value={this.state.gender}
                          displayEmpty
                          onChange={e => {
                            this.setState({ gender: e.target.value });
                          }}
                          validations={[required, vgender]}
                        >
                          <MenuItem value="">Select Gender</MenuItem>
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                          <MenuItem value={"X"}>Other</MenuItem>
                        </Select>
                      </div>
                      <div className="col"></div>
                    </div>
                    <div className="row form-group">
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.userName}
                          placeholder="Username"
                          onChange={e => {
                            this.setState({ userName: e.target.value });
                          }}
                          validations={[required]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="password"
                          className="form-control"
                          value={this.state.password}
                          type="password"
                          placeholder="Password"
                          onChange={e => {
                            this.setState({ password: e.target.value });
                          }}
                          validations={[required, vpassword]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="password"
                          className="form-control"
                          value={this.state.confirmpassword}
                          type="password"
                          placeholder="Confirm password"
                          onChange={e => {
                            this.setState({ confirmpassword: e.target.value });
                            p = e.target.value
                          }}
                          validations={[required, vconfirmpassword]}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.street}
                          placeholder="Street name"
                          onChange={e => {
                            this.setState({ street : e.target.value });
                          }}
                          validations={[required, vtext]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.streetnr}
                          placeholder="Street number"
                          onChange={e => {
                            this.setState({ streetnr : e.target.value });
                          }}
                          validations={[required, vnumber]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.bus_nr}
                          placeholder="Bus number"
                          onChange={e => {
                            this.setState({ bus_nr : e.target.value });
                          }}
                          validations={[required, vnumber]}
                        />
                      </div>
                    </div>
                    <div className="row form-group">
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.city}
                          placeholder="City"
                          onChange={e => {
                            this.setState({ city: e.target.value });
                          }}
                          validations={[required, vtext]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.postal}
                          placeholder="Postal code"
                          onChange={e => {
                            this.setState({ postal: e.target.value });
                          }}
                          validations={[required, vpostalcode]}
                        />
                      </div>
                      <div className="col">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.country}
                          placeholder="Country"
                          onChange={e => {
                            this.setState({ country: e.target.value });
                          }}
                          validations={[required, vtext]}
                        />
                      </div>
                    </div>

                    <div className="row form-group">
                      <div className="col">
                        <button
                          className="btn btn-primary btn-block"
                          disabled={this.state.loading}
                          //onClick={this.handleSubmit}
                        >
                          {this.state.loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Register</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{display:"none"}}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      )
    }
  }
export default connect(mapStateToProps)(Register);