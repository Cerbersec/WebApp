import React, { Component } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Paging from "../Paging/Paging";
import ProductsHeader from "../ProductsHeader/ProductsHeader";

//axios
import axios from "axios";

// This component is responsible for fetching products.
// It determines from query string which products to fetch.
// The URL is checked on initial mount and when URL changes.
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      items: []
    };
    this.updateQueryStr = this.updateQueryStr.bind(this);
  }

  async fetchData() {
    this.setState({ loading: true });

    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);

    //let results = await Api.searchItems(qsAsObject);

    /* Manual API Call */
    
    //TODO: figure out paging
    //TODO: implement filters with qsAsObject
    axios.get("/store/products/1").then((response) => {
      console.log(response.data.products)
      this.setState({
        items: response.data.products,
        loading: false,
        totalItemsCount: response.totalLength
      });
    })   

    /* End of API Call */
  }

  componentDidMount() {
    this.fetchData();
  }

  updateQueryStr(newValues) {
    let current = queryString.parse(this.props.location.search);
    this.props.history.push(
      "/?" + queryString.stringify({ ...current, ...newValues })
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let currentQueryStr = queryString.parse(this.props.location.search);
    let oldQueryStr = queryString.parse(prevProps.location.search);

    let areSameObjects = (a, b) => {
      if (Object.keys(a).length !== Object.keys(b).length) return false;
      for (let key in a) {
        if (a[key] !== b[key]) return false;
      }
      return true;
    };

    // We will refetch products only when query string changes.
    if (!areSameObjects(currentQueryStr, oldQueryStr)) {
      this.fetchData();
    }
  }

  render() {
    let parsedQueryStr = queryString.parse(this.props.location.search);

    if (this.state.loading) {
      return <CircularProgress className="circular" />;
    }

    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <ProductsHeader
          parsedQueryStr={parsedQueryStr}
          updateQueryStr={this.updateQueryStr}
          totalItemsCount={this.state.totalItemsCount}
        />

        <div style={{ flex: 1 }}>
          {this.state.items.map(item => {
            return <Item key={item.product_id} item={item} />;//item.product_id = unique key to iterate
          })}
        </div>

        <Paging
          parsedQueryStr={parsedQueryStr}
          updateQueryStr={this.updateQueryStr}
          totalItemsCount={this.state.totalItemsCount}
        />
      </div>
    );
  }
}

export default ProductList;
