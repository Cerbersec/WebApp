import React, { Component } from "react";
import Item from "../Item/Item";
import CircularProgress from "@material-ui/core/CircularProgress";
import queryString from "query-string";
import Api from "../../Api";
import Paging from "../Paging/Paging";
import ProductsHeader from "../ProductsHeader/ProductsHeader";

// This component is responsible for fetching products.
// It determines from query string which products to fetch.
// The URL is checked on initial mount and when URL changes.
class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalItemsCount: null,
      itemsCount: null,
      items: []
    };
    this.updateQueryStr = this.updateQueryStr.bind(this);
  }

  async fetchData() {
    this.setState({ loading: true });

    // Parse the query string
    let qsAsObject = queryString.parse(this.props.location.search);

    let response = await Api.searchItems(qsAsObject);

    let pcount = await Api.getProductCount(qsAsObject.category);

    this.setState({
        items: response.data,
        loading: false,
        totalItemsCount: pcount,
        itemsCount: response.data.length
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  updateQueryStr(newValues) {
    let current = queryString.parse(this.props.location.search);
    this.props.history.push(
      "?" + queryString.stringify({ ...current, ...newValues })
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
          itemsCount={this.state.itemsCount}
        />

        <div style={{ flex: 1, paddingLeft: 10}}>
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
