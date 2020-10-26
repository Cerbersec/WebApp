import React, { Component } from "react";
import "./Product.css";
import Bruin from '../../img/bruin.jpg';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, } from 'reactstrap';
import Form from './Form'; 



class Product extends React.Component{


  render() {
    return (
    <div>
      <div className="imageLine">
          <h2>Mooie schoenen</h2>
        <img  src={Bruin} alt="Bruin" width="400" height="400"></img>
        
      </div>
      <div className="inline">
      
      <Form></Form>  

          </div>
      </div>
      
    )
  }
  
}
export default Product;