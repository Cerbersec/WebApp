import React, {Component} from "react";

import "./Footer.css";

class Footer extends Component{

    render(){
        return(
            <div
        style={{
          boxSizing: "border-box",
          padding: 10,
          borderTop: "1px solid lightgrey",
          height: 150,
         position: "fixed",
          bottom: 0,
          left: 0,
          width:'100%',
          
          backgroundColor: '#183399'
          ,
          justifyContent: "space-around",
          display: "flex"
        }}
      >
        <div>
          <div
            style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}
          >
            Klantenservice
          </div>
            <div className="footerItem">Bestelling</div>
            <div className="footerItem">Betaling</div>
         
        </div>
        <div>
          <div
            style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}
          >
            About us
          </div>
         
            <div className="footerItem">Company Info</div>
         
        </div>
        <div>
          <div
            style={{ color: "white", fontWeight: "bold", marginBottom: 10 }}
          >
            Social Media
          </div>
          <a
            href="http://www.facebook.com"
            target="blank"
            style={{
              textDecoration: "none",
              color: "rgb(32, 32, 34)"
            }}
          >
            <div className="footerItem">Facebook</div>
          </a>
        </div>
      </div>
        );
    }
}
export default Footer;
