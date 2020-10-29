import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";

class Register extends Component{
  state = {
    firstName:"",
    lastName:"",
    userName: "",
    pass: "",
    confirmpass: "",
    email: "",
    adress: "",
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
            height: 200,
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
              this.setState({ confirmpass: e.target.value });
            }}
          />


          </div>
          </div>
           

      )
    }
  }
export default Register;