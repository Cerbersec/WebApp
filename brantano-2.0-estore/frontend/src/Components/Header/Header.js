import React, {Component} from "react";
import Select from '@material-ui/core/Select';
import AppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../../img/brantayes.jpg";
import "./Header.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";






class ConnectedHeader extends Component{
  state = {
    SelectedLanguage: 'NL',

  };

 

  
  render(){
    
    return(
      <AppBar position="static" style={{backgroundColor:"blue"}}>
        <Toolbar>
          <div className="left-part">
            <img src={Logo} alt="Logo" width="200" height="140"></img>
          </div>
          <div className="right-part">
          <Select
          style={{maxWidth:200, marginLeft: 20,color: 'white','font-size':'20px'}}
          value={this.state.SelectedLanguage}
          MenuProps={{
            style: {
              
              maxHeight: 500
            }
          }}
          onChange={e =>{
            this.setState({SelectedLanguage : e.target.value});
          }}
          >
            <MenuItem key='nl' value='NL'>NL</MenuItem>
            <MenuItem key='en' value='EN'>EN</MenuItem>
          </Select>
          <IconButton
              aria-label="Cart"
            >
              <Badge>
                <ShoppingCartIcon style={{fontSize:"30px" ,color:'white'}}/>
              </Badge>
            </IconButton>

          
          
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}
//const Header = withRouter(connect(mapStateToProps)(ConnectedHeader));
export default ConnectedHeader;