import React, {Component} from "react";
import Avatar from "@material-ui/core/Avatar";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios"

class Register extends Component{
  state = {
    firstName:"",
    lastName:"",
    userName: "",
    gender: "",
    pass: "",
    confirmpass: "",
    email: "",
    street: "",
    streetnr: "",
    postal:"",
    city: "",
    country:"",
    redirectToReferrer: false,
    test: 'false',
    reply:"",
    bus_nr:"",
    phone:""
    
  };
    render(){

      const postUser = () => {
        axios({
          method:'post',
          url:'account/register',
          data:{
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email_address: this.state.email,
            gender: this.state.gender,
            username: this.state.userName,
            password:this.state.pass,
            verify_password: this.state.confirmpass,
            street_name: this.state.street,
            street_nr: this.state.streetnr,
            postal_code: this.state.postal,
            phone: this.state.phone,
            bus_nr: this.state.bus_nr,

            city: this.state.city,
            country: this.state.country,
          }
        })
        .then(response => this.setState({reply: response }))
        
        .catch(error =>{
          
          console.error('There was an error!', error);
        });
        console.log(this.state.reply)
      }
       

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
            height: 600,
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

            <div style={{flex: 1}}>
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
            style={{marginTop: 10}}
          />
          <TextField
            value={this.state.phone}
            placeholder="Phone"
            onChange={e => {
              this.setState({ phone: e.target.value });
            }}
            style={{marginTop: 10}}
          />
          <TextField
            value={this.state.gender}
            placeholder="Gender"
            onChange={e => {
              this.setState({ gender: e.target.value });
            }}
            style={{marginBottom: 20, marginTop: 10}}
          />
          

            <div style={{marginBottom: 20}}>
          <TextField
            value={this.state.userName}
            placeholder="User name"
            onChange={e => {
              this.setState({ userName: e.target.value });
            }}
          />
          <TextField
            value={this.state.email}
            placeholder="E mail"
            onChange={e => {
              this.setState({ email: e.target.value });
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
          <div style={{flex: 2}}>
          <TextField
            style={{marginTop: 20}}
            value={this.state.street}
            placeholder="Street name"
            onChange={e => {
              this.setState({ street : e.target.value });
            }}
          />
          <TextField
            style={{marginTop: 10}}
            value={this.state.streetnr}
            placeholder="Street number"
            onChange={e => {
              this.setState({ streetnr : e.target.value });
            }}
          />
           <TextField
            style={{marginTop: 10}}
            value={this.state.bus_nr}
            placeholder="Bus number"
            onChange={e => {
              this.setState({ bus_nr : e.target.value });
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
          </div>
            
            <Button
            style={{ marginTop: 20, width: 200 }}
            variant="outlined"
            color="primary"
            onClick={() => postUser()
            }
          >
            Register
          </Button>
          </div>
          </div>
           

      )
    }
  }
export default Register;