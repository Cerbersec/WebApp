import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Register extends Component{
  state = {
    firstName:"",
    lastName:"",
    userName: "",
    pass: "",
    confirmpass: "",
    email: "",
    adress: "",
    postal:"",
    city: "",
    country:"",
    redirectToReferrer: false
  };
    render(){
      return(

        <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: '100px'
        }}
      >
        <div
          style={{
            height: 400,
            width: 200,
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

            <div>
          <TextField
            value={this.state.firstName}
            placeholder="First Name"
            onChange={e => {
              this.setState({ firstName: e.target.value });
            }}
            
          />
           <TextField
            value={this.state.lastName}
            placeholder="Last name"
            onChange={e => {
              this.setState({ lastName: e.target.value });
            }}
            style={{marginBottom: 20, marginTop: 10}}
          />
          </div>

            <div style={{marginBottom: 20}}>
          <TextField
            value={this.state.userName}
            placeholder="User name"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          </div>
          <TextField
            value={this.state.pass}
            type="password"
            placeholder="Password"
            onChange={e => {
              this.setState({ pass: e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 10}}
            value={this.state.confirmpass}
            type="password"
            placeholder="Confirm password"
            onChange={e => {
              this.setState({ confirmpas: e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 20}}
            value={this.state.adress}
            placeholder="Adress"
            onChange={e => {
              this.setState({ adress: e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 10}}
            value={this.state.city}
            placeholder="City"
            onChange={e => {
              this.setState({ city: e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 10}}
            value={this.state.postal}
            placeholder="Postal code"
            onChange={e => {
              this.setState({ postal: e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 10}}
            value={this.state.Country}
            placeholder="Country"
            onChange={e => {
              this.setState({ country: e.target.value });
            }}
          />
            
            <Button
            style={{ marginTop: 20, width: 200 }}
            variant="outlined"
            color="primary"
            onClick={() => {
              // Simulate authentication call
              alert("Username " + this.state.userName + "\n Password: " + this.state.pass);
            }}
          >
            Register
          </Button>
          </div>
          </div>
           

      )
    }
  }
export default Register;