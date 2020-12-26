import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Api from "../../Api"
import { ExpandLess, ExpandMore, ChevronRight, ContactSupportOutlined } from "@material-ui/icons";
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
      expandedMenuItems: {
        2: true,
        3: true,
      },
      dataForTheMenu: []
    };

    this.renderMenu = this.renderMenu.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    //const categories = await Api.getCategories()

    // categories.unshift({
    //   category_name: "All categories",
    //   icon: "list"
    // })

    const shoes_men_product_types = [{name: "Sneakers"}, {name: "Boots"}, {name: "Chelsea boots"}, {name: "Short boots"}, {name: "Flat ankle boots"}, {name: "Knee boots"}, {name: "Hiking boots"}, {name: "Football boots"}, {name: "Rain boots"}, {name: "Dress shoes"}, {name: "Loafers"}, {name: "Slip-on sneakers"}, {name: "Low shoes"}, {name: "Mocassins"}]
    const shoes_women_product_types = [{name: "Knee boots"}, {name: "Boots"}, {name: "Chelsea boots"}, {name: "Short boots"}, {name: "Flat ankle boots"}, {name: "Hiking boots"}, {name: "Football boots"}, {name: "Rain boots"}, {name: "Ballerinas"}, {name: "Loafers"}, {name: "Slip-on sneakers"}, {name: "Lace-up shoes"}]
    const shoes_boys_product_types = [{name: "Sneakers"}, {name: "Boots"}, {name: "Hiking boots"}, {name: "Football boots"}, {name: "High shoes"}, {name: "Low shoes"}, {name: "Baby slippers"}, {name: "Baby shoes"}, {name: "Baby sneakers"}]
    const shoes_girl_product_types = [{name: "Sneakers"}, {name: "Boots"}, {name: "Chelsea boots"}, {name: "Hiking boots"}, {name: "Football boots"}, {name: "High shoes"}, {name: "Low shoes"}, {name: "Baby slippers"}, {name: "Baby shoes"}, {name: "Baby sneakers"}, {name: "Baby boots"}]
    
    const accessories_men_product_types = [{name: "Shoe care"}, {name: "Socks"}, {name: "Ankle socks"}, {name: "Soles"}]
    const accessories_women_product_types = [{name: "Shoe care"}, {name: "Socks"}, {name: "Soles"}, {name: "Belts"}]

    const dataForTheMenu = [
      //product => type
      //type => category = gender/age
      { name: "Home", url: "/store", icon: "home", id: 0 },
      { name: "Blog", url: "/blog", icon: "forum", id: 1 },
      {
        name: "Shoes",
        id: 2,
        children: [{name: "Men", product_types: shoes_men_product_types}, {name: "Women", product_types: shoes_women_product_types}, {name: "Boys", product_types: shoes_boys_product_types}, {name: "Girls", product_types: shoes_girl_product_types}, {name: "Other", product_types: [{name: "Sneakers"}]}].map((category, i) => {
          return {
            name: category.name,
            id: "shoes" + category.name,
            url: "/store?category=" + category.name,
            children:
            [{name: "All " + category.name.toLowerCase() + " shoes", id: "shoes" + category.name + "all", url: "/store?category=" + category.name + "&type=All " + category.name.toLowerCase() + " shoes"}].concat(
            category.product_types.map((type) => {
              return {
                name: type.name,
                id: "shoes" + category.name + type.name,
                url: "/store?category=" + category.name + "&type=" + type.name,
              }
            }))
          }
        }),     
      },
      {
        name: "Accessories",
        id: 3,
        children: [{name: "Men", product_types: accessories_men_product_types}, {name: "Women", product_types: accessories_women_product_types}].map((category) => {
          return {
            name: category.name,
            id: "accessories" + category.name,
            url: "/store?category=" + category.name,
            children: [{name: "All " + category.name.toLowerCase() + " accessories", id: "accessories" + category.name + "all", url: "/store?category=" + category.name + "&type=All " + category.name.toLowerCase() + " accessories"}].concat(
            category.product_types.map((type) => {
              return {
                  name: type.name,
                  id: "accessories" + category.name + type.name,
                  url: "/store?category=" + category.name + "&type=" + type.name,
              }
          }))
          }
        })
      }
    ]

    this.setState({
      dataForTheMenu: dataForTheMenu
    })
  }

  // This method determines from URL whether to highlight a menu item or not
  isMenuItemActive(item, location) {
    if (location.pathname === "/store" && location.search) {
      let queryStringParsed = queryString.parse(location.search);

      return item.url === location.pathname + location.search;
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
                    {x.icon ? (
                    <Icon>{x.icon}</Icon>
                    ) : (
                        <ChevronRight />
                    )}
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
                  style={this.state.expandedMenuItems[x.id]? {backgroundColor: "lightgrey"} : {backgroundColor: "inherit"}}
                  button
                  dense
                  onClick={(e) => {
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
                  style={{paddingLeft: 5}}
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
