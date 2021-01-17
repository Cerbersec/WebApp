import React, { Component } from "react";
import { withRouter, Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./Dashboard.css";
import SideMenu from "./SideMenu/SideMenu";
import queryString from "query-string";
import NewBlogpost from "./Blog/New/New";
import EditBlogpost from "./Blog/Edit/Edit";
import RemoveBlogpost from "./Blog/Remove/Remove";
import AddProduct from "./Products/Add/Add";
import EditProduct from "./Products/Edit/Edit";
import RemoveProduct from "./Products/Remove/Remove";
import Logo from "./Information/Logo/Logo";
import ShippingCost from "./Information/Shipping/Shipping";
import CompanyInfo from "./Information/CompanyInfo/CompanyInfo";

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
            activeSection: null,
            activeAction: null,
        }
    }

    componentDidMount() {
        let qsAsObject = queryString.parse(this.props.location.search)
        this.setState({activeSection: qsAsObject.section, activeAction: qsAsObject.action})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let currentQueryStr = queryString.parse(this.props.location.search)
        let oldQueryStr = queryString.parse(prevProps.location.search)
    
        let areSameObjects = (a, b) => {
            if (Object.keys(a).length !== Object.keys(b).length) return false
            for (let key in a) {
                if (a[key] !== b[key]) return false
            }
            return true;
        }

        if (!areSameObjects(currentQueryStr, oldQueryStr)) {
            this.setState({activeSection: currentQueryStr.section, activeAction: currentQueryStr.action})
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
                <SideMenu />   
                <div className="content">
                    {this.state.activeSection === "products" && (
                        this.state.activeAction === "add" && (
                            <AddProduct />
                        )
                        || this.state.activeAction === "edit" && (
                            <EditProduct />
                        )
                        || this.state.activeAction === "remove" && (
                            <RemoveProduct />
                        )
                    )}
                    {this.state.activeSection === "blog" && (
                        this.state.activeAction === "new" && (
                            <NewBlogpost />
                        )
                        || this.state.activeAction === "edit" && (
                            <EditBlogpost />
                        )
                        || this.state.activeAction === "remove" && (
                            <RemoveBlogpost />
                        )
                    )}
                    {this.state.activeSection === "information" && (
                        this.state.activeAction === "logo" && (
                            <Logo />
                        )
                        || this.state.activeAction === "shipping cost" && (
                            <ShippingCost />
                        )
                        || this.state.activeAction === "company info" && (
                            <CompanyInfo />
                        )
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps)(Dashboard))