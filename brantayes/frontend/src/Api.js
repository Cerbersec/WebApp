import axios from "axios"
const url = "" //set target URL to manually override express.js routing

//setup csrf token
axios.get(url + '/csrf-token').then((response) => {
  axios.defaults.headers.post['X-CSRF-TOKEN'] = response.data.csrfToken;
  console.log(response.data)
})

class Api {

  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + "/store/productinfo/" + parseInt(id, 10)).then((response) => { 
          resolve(response.lenght === 0 ? null : response.data.product)
        })
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
          axios.get(url + "/store/products/" + page).then((response) => { 
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

            if (category !== "All categories" && category !== item.Category.category_name) {
              return false;
            }

            if (term && !item.name.toLowerCase().includes(term.toLowerCase()))
              return false;

            return true;
          });

          let totalLength = data.length;

          data = this.sortByPrice(data, sortValue);

          //data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
          data = data.slice(0, itemsPerPage)

          resolve({ data, totalLength });
        }, 500);
      })
    });
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + "/store/categories/").then((response) => { 
          resolve(response.lenght === 0 ? null : response.data.categories)
        })
      }, 500);
    });
  }

  checkout(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + "/store/checkout",data).then((response) => { 
          resolve(response.lenght === 0 ? null : response.data.order)
          console.log(response)
        })
      }, 500);
    });
  }

  login(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + "/account/login", data).then((response) => {
          resolve(response.status !== 200 ? null : response)
        })
      }, 500);
    });
  }
}

export default new Api();
