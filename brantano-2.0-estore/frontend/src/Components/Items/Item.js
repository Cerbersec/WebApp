import React, { Component } from "react";
import "./Item.css";
import Schoenen from '../../img/schoenen.jpg';
import Onderhoud from '../../img/onderhoud.jpg';
import Veters from '../../img/veters.jpg';

class Item extends React.Component{

  render() {
    return (
    <div>
      <div className="image">
        <img  src={Schoenen} alt="Schoenen" width="400" height="300"></img>
        <p className="text"><a >test</a></p>
      </div>
      <div className="image" >
        <img src={Onderhoud} alt="Onderhoud" width="400" height="300"></img>
        <p className="text"><a >test</a></p>
      </div>
      <div className="image">
        <img src={Veters} alt="Veters" width="400" height="300"></img>
        <p className="text"><a >test</a></p>
      </div>
    
      </div>
    )
  }
}
export default Item;