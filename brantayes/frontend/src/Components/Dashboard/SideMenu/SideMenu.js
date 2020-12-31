import React, { Component, Fragment } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { ExpandLess, ExpandMore, ChevronLeft, ChevronRight } from "@material-ui/icons";
import { List, ListItem, ListItemIcon, ListItemText, Collapse}  from "@material-ui/core";
import "./SideMenu.css";

class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandedMenuItems: { 0: true, 1: true, 2: true},
            dataForTheMenu: [],
            expanded: false
        }

        this.renderMenu = this.renderMenu.bind(this)
        this.handleExpand = this.handleExpand.bind(this)
    }

    componentDidMount() {
        const dataForTheMenu = [
            { 
                name: "Products",
                id: 0,
                children: [{name: "Add", id: 3}, {name: "Edit", id: 4}, {name: "Remove", id: 5}].map((c) => {
                    return {
                        name: c.name,
                        id: c.id,
                        url: "/dashboard?section=products&action=" + c.name.toLowerCase()
                    }
                })
            },
            { 
                name: "Blog",
                id: 1,
                children: [{name: "New", id: 6}, {name: "Edit", id: 7}, {name: "Remove", id: 8}].map((c) => {
                    return {
                        name: c.name,
                        id: c.id,
                        url: "/dashboard?section=blog&action=" + c.name.toLowerCase()
                    }
                })
            },
            {
                name: "Information",
                id: 2,
                children: [{name: "Logo", id: 9}, {name: "Shipping cost", id: 10}].map((c) => {
                    return {
                        name: c.name,
                        id: c.id,
                        url: "/dashboard?section=information&action=" + c.name.toLowerCase()
                    }
                })
            },
        ]

        this.setState({dataForTheMenu: dataForTheMenu})
    }

    handleExpand() {
        this.setState({expanded: !this.state.expanded})
    }

    renderMenu(data) {
        return (
            <List className={!this.state.expanded ? "notexpanded" : "expanded"}>
                {data.map((menuitem) => {
                    if (!menuitem.children) {
                        return (
                            <NavLink className="menuitem" to={menuitem.url} exact key={menuitem.id} >
                                <ListItem dense button>
                                    <ListItemIcon><ChevronLeft color="secondary" /></ListItemIcon>
                                    <ListItemText disableTypography primary={<div style={{ color: "white" }}>{menuitem.name}</div>} />
                                </ListItem>
                            </NavLink>
                        )
                    } else {
                        return (
                            <Fragment key={menuitem.id}>
                                <ListItem button dense className="menuitem" onClick={(e) => {this.setState(ps => { return { expandedMenuItems: {...ps.expandedMenuItems, [menuitem.id]: !ps.expandedMenuItems[menuitem.id]}}})}} >
                                    <ListItemText disableTypography primary={<div style={{ color: "white" }}>{menuitem.name}</div>} />
                                    {this.state.expandedMenuItems[menuitem.id] ? (
                                        <ExpandLess color="secondary" />
                                    ) : (
                                        <ExpandMore color="secondary" />
                                    )}
                                </ListItem>
                                <Collapse in={this.state.expandedMenuItems[menuitem.id]} timeout="auto" unmountOnExit style={{paddingRight: 5}} >
                                    {this.renderMenu(menuitem.children)}
                                </Collapse>
                            </Fragment>
                        )
                    }
                })}
            </List>
        )
    }

    render() {
        return (
            <div id="sidemenu" className={!this.state.expanded ? "forcewidth" : undefined}>
                <ListItem dense button style={{minHeight: 60, borderBottom: "1px solid #546e7a"}} onClick={this.handleExpand}>
                    <ListItemIcon>{this.state.expanded ? (<ChevronRight color="secondary" />) : (<ChevronLeft color="secondary" />)}</ListItemIcon>
                </ListItem>
                {this.renderMenu(this.state.dataForTheMenu)}
            </div>
        )
    }
}
export default withRouter(SideMenu)
