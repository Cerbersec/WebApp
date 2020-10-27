import React, { Component } from "react";
import "./Product.css";
import Bruin from '../../img/bruin.jpg';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';

import Bestelling from 'C:/Users/bamsr/Documents/GitHub/WebApp/brantano-2.0-estore/frontend/src/Components/Bestelling/Bestelling.js';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'



var maat = 30;
    var kleur="bruin";

class Product extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
            Technology: '30',
            Kleur: 'Bruin'

    }
    

}


Changetechnology = (e) => {
    this.setState({
            Technology: e.target.value
    })
    maat = e.target.value;
}

Changekleur = (e) => {
    this.setState({
            Kleur: e.target.value
    })
    kleur = e.target.value;  
}

  render() {
    
    return (
     
    <div>
      <div className="imageLine">
          <h2>Mooie schoenen</h2>
        <img  src={Bruin} alt="Bruin" width="400" height="400"></img>
        
      </div>
      <div className="inline">
                  <div>
                  <form onSubmit={this.onsubmit}>
                          <div >
                                  <div >
                                          Kies uw maat
                  </div>
                                  <select value={this.state.Technology} onChange={this.Changetechnology} >
                                          <option>30</option>
                                          <option>31</option>
                                          <option>32</option>
                                          <option>33</option>
                                          <option>34</option>
                                          <option>35</option>

                                  </select>
                          </div>
                          <div >
                                  <div >
                                          Kies uw kleur
                  </div>
                                  <select value={this.state.Kleur} onChange={this.Changekleur} >
                                          <option>Bruin</option>
                                          <option>Zwart</option>
                                          <option>Groen</option>
                                          <option>Beige</option>


                                  </select>
                          </div>
                          <br></br>
                          <div >
                                  Morgen in huis
                  </div>
                  <Button color="primary" component={RouterLink} to={{
    pathname: "/bestelling"
  }} >
                    Naar bestelling
                  </Button>

                  </form>

          </div>
                
        

        
      
      


          </div>
      </div>
      
    )
  }
  
}
export default Product;