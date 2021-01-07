import axios from "axios"
const url = "/api/v1" //prefix
//store -> shop stuff
//account -> useraccount stuff
//auth -> register,login,logout
//blog -> blog stuff

//setup csrf token
axios.get(url + '/csrf-token').then((response) => {
  //axios.defaults.headers.post['X-CSRF-TOKEN'] = response.data.csrfToken;
})

class Api {

  getItemUsingID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + "/store/products/" + parseInt(id, 10)).then((response) => { 
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

  getProductCount(category) {
    if(!category) {
      category = "All categories"
    }
    const data = {
      category: category
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + "/store/productcount", data).then((response) => { 
          resolve(response.lenght === 0 ? null : response.data.productcount)
        })
      }, 500);
    });
  }

  searchItems({
    category = "All categories",
    type = "All types",
    term = "",
    sortValue = "lh",
    itemsPerPage = 100,
    usePriceFilter = "false",
    minPrice = 0,
    maxPrice = 1000,
    page = 1
  }) {
      // Turn this into a boolean
      usePriceFilter = usePriceFilter === "true" && true;

      return new Promise((resolve, reject) => {
        setTimeout(() => {

          const data = {
            page: page,
            category: category,
            type: type,
            term: term,
            itemsPerpage: itemsPerPage,
          }

          //axios API call
          axios.post(url + "/store/products", data).then((response) => { 
          let products = response.data.products

          let data = products.filter(item => {
            
            if (
              usePriceFilter &&
              (item.retail_price < minPrice || item.retail_price > maxPrice)
            ) {
              return false;
            }

            if (category === "popular") {
              return item.popular;
            }

            //TODO: check item filtering for category
            if (category !== "All categories" && category !== item.category.category_name) {
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
        axios.get(url + "/store/categories").then((response) => { 
          resolve(response.lenght === 0 ? [] : response.data.categories)
        })
      }, 500);
    });
  }

  checkout(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + "/store/checkout", data).then((response) => { 
          resolve(response.status !== 200 ? null : response.data.order)
        })
      }, 500);
    });
  }

  pay(data) {
    return axios.post(url + "/store/payment", data)
  }

  login(data) {
    return axios
      .post(url + "/auth/login", data)
      .then((response) => {
        if(response.data.id) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });    
  }

  logout() {
    return axios
      .get(url + "/auth/logout")
      .then((response) => {
        sessionStorage.removeItem("user");
      });
  }

  register(data) {
    return axios
      .post(url + "/auth/register", data)
      .then((response) => {
        return response.data;
      });
  }

  getReviews(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/store/reviews/' + productId).then((response) => {
          resolve(response.length === 0 ? [] : response.data.reviews)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  //TODO: resolve aanpassen
  submitReview(data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/store/reviews/create', data).then((response) => {
          resolve(response.status !== 200? "something went wrong" : "successfully submitted review")
        })
      }, 500);
    })
  }

  getOrders() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/store/orders').then((response) => {
          console.log(response)
          resolve(response.lenght === 0 ? [] : response.data.orders)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getOrderByID(orderID) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/store/orders/' + orderID).then((response) => {
          resolve(response.lenght === 0 ? null : response.data.order)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getBlogPosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/blog/posts').then((response) => {
          resolve(response.length === 0 ? [] : response.data.posts)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getBlogPostByID(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/blog/posts/' + parseInt(id, 10)).then((response) => {
          resolve(response.length === 0 ? null : response.data);
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getUserByID() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/account/details').then((response) => {
          resolve(response.length === 0 ? null : response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getSuccess(session_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/store/createsuccess?session_id=' + session_id).then((response) => {
          resolve(response.length === 0 ? null : response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  getShippingCosts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/info/shipping').then((response) => {
          resolve(response.lenght === 0 ? null : response.data.shipping_costs)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  resetPassword(email_address) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/auth/password-reset', { email_address: email_address }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  setNewPassword(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/auth/receive-new-password/' + data.user_id + '/' + data.token, { password: data.password }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500);
    })
  }

  newBlogpost(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/blog/posts/create', data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  editBlogpost(post_id, data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/blog/posts/edit/' + post_id, data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  removeBlogpost(post_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/blog/posts/delete/' + post_id).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  uploadLogo(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/info/updatelogo', data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  UpdateAccountInfo(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/account/update', data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  addProduct(data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/admin/products/add', data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  editProduct(product_id,data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/admin/products/update/' + product_id,data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }
  
  removeProduct(product_id){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.get(url + '/admin/products/delete/' + product_id).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }

  updateShipping(data){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios.post(url + '/info/updateshipping',data).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          reject(err)
        })
      }, 500)
    })
  }
}

export default new Api();
