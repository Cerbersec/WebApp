import { sampleProducts } from "./Data";
import axios from "axios"

///
//
// Methods of this class are used to simulate calls to server.
//
class Api {

  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = sampleProducts.filter(x => x.id === parseInt(id, 10));
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  sortByPrice(data, sortval) {
    if (sortval !== "lh" && sortval !== "hl") return data;

    let items = [...data];

    if (sortval === "lh") {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    return items;
  }

  searchItems({
    category = "All categories",//popular
    term = "",
    sortValue = "lh",
    itemsPerPage = 10,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {
      // Turn this into a boolean
      usePriceFilter = usePriceFilter === "true" && true;

      return new Promise((resolve, reject) => {
        setTimeout(() => {

          //axios API call
          axios.get("/store/products/" + page).then((response) => { 
          let products = response.data.products

          let data = products.filter(item => {
            if (
              usePriceFilter &&
              (item.price < minPrice || item.price > maxPrice)
            ) {
              return false;
            }

            if (category === "popular") {
              return item.popular;
            }

            if (category !== "All categories" && category !== item.category)
              return false;

            if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
              return false;

            return true;
          });

          let totalLength = data.length;

          data = this.sortByPrice(data, sortValue);

          data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

          resolve({ data, totalLength });
        }, 500);
      })
    });
  }
}

export default new Api();
