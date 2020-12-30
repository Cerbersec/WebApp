import React, { Component } from "react";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./Dashboard.css";
import SideMenu from "../SideMenu/SideMenu";

const mapStateToProps = state => {
    const { user } = state
    const { message } = state
    return {
        user,
        message,
    }
}

class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        const { user, message } = this.props

        if(!user || !user.roles.includes("ROLE_ADMINISTRATOR")) {
            return <Redirect to="/login" />
        }

        return (
            <div id="dashboard">
                <h1>Administrator Dashboard</h1>
                <SideMenu />   
                <div className="content">
                    
                </div>         
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))