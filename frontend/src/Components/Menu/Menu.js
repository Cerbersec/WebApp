import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dataForTheMenu } from "../../Data";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

const mapStateToProps = state => {
  return {
    showMenu: state.showMenu
  };
};

class ConnectedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // initially item with id 1 is expanded
      expandedMenuItems: {
        1: true
      },
      dataForTheMenu
    };

    this.renderMenu = this.renderMenu.bind(this);
  }

  // This method determines from URL whether to highlight a menu item or not
  isMenuItemActive(item, location) {
    if (location.pathname === "/" && location.search) {
      let queryStringParsed = queryString.parse(location.search);

      return item.name === queryStringParsed.category;
    }

    return item.url === location.pathname;
  }

  renderMenu(data) {
    return (
      <List>
        {data.map((x, i) => {
          if (!x.children) {
            return (
              <NavLink
                to={x.url}
                exact
                isActive={(param, location) => {
                  return this.isMenuItemActive(x, location);
                }}
                style={{
                  textDecoration: "none",
                  color: "rgb(32, 32, 34)"
                }}
                key={x.id}
                activeStyle={{
                  color: "#4282ad",
                  fontWeight: "bold"
                }}
              >
                <ListItem dense button>
                  <ListItemIcon>
                    <Icon>{x.icon}}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={<div style={{ color: "inherit" }}>{x.name}</div>}
                  />
                </ListItem>
              </NavLink>
            );
          } else {
            return (
              <Fragment key={x.id}>
                <ListItem
                  button
                  dense
                  onClick={() => {
                    // Update in state which menu items are expanded.
                    this.setState(ps => {
                      return {
                        expandedMenuItems: {
                          ...ps.expandedMenuItems,
                          [x.id]: !ps.expandedMenuItems[x.id]
                        }
                      };
                    });
                  }}
                >
                  <ListItemText primary={x.name} />
                  {this.state.expandedMenuItems[x.id] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={this.state.expandedMenuItems[x.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  {this.renderMenu(x.children)}
                </Collapse>
              </Fragment>
            );
          }
        })}
      </List>
    );
  }

  render() {
    if (!this.props.showMenu) return null;
    return (
      <div
        style={{
          backgroundColor: "#FAFAFB",
          minWidth: 250
        }}
      >
        {/* Render our menu */}
        {this.renderMenu(this.state.dataForTheMenu)}
      </div>
    );
  }
}
const Menu = withRouter(connect(mapStateToProps)(ConnectedMenu));
export default Menu;
