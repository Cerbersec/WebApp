import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Auth from "../../Auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Register extends Component{
  state = {
    userName: "",
    pass: "",
    redirectToReferrer: false
  };
    render(){
      
      return(

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
            REGISTER{" "}
          </div>
          <TextField
            value={this.state.userName}
            placeholder="User name"
            onChange={e => {
              this.setState({ userName: e.target.value });
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