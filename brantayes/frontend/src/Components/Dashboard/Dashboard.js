import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./Dashboard.css";

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

    render() {
        const { user, message } = this.props

        if(!user || !user.roles.includes("ROLE_ADMINISTRATOR")) {
            return <Redirect to="/login" />
        }

        return (
            <div id="dashboard">
                <h1>Administrator Dashboard</h1>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))