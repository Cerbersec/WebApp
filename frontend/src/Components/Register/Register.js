import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

class Register extends Component{
   
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
          </div>
          </div>
      )
    }
  }
export default Register;