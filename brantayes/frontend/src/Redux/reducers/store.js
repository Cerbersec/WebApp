import * as CONSTANTS from "../Constants";

const user = JSON.parse(localStorage.getItem("user"));

// If multiple components need access to some data, in that case we store such data in redux.
const initialState = user
? {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null,
  isLoggedIn: true, 
  user,
  message: ""
}
: {
  cartItems: [],
  showCartDialog: false,
  showMenu: true,
  checkedOutItems: [],
  loggedInUser: null,
  isLoggedIn: false,
  user: null,
  message: ""
}

const rootReducer = (state = initialState, action) => {
  const { type, payload} = action;
  
  switch (type) {
    case CONSTANTS.ADD_ITEM_IN_CART: {
      let index = state.cartItems.findIndex(x => x.product_id === payload.product_id);

      // Is the item user wants to add already in the cart?
      if (index !== -1) {
        // Yes, update the quantity.
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: state.cartItems[index].quantity + payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // No, add a new item.
      return { ...state, cartItems: state.cartItems.concat(payload) };
    }

    case CONSTANTS.SHOW_CART_DLG:
      return { ...state, showCartDialog: payload };

    case CONSTANTS.DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product_id !== payload)
      };

    case CONSTANTS.TOGGLE_MENU:
      return { ...state, showMenu: !state.showMenu };

    case CONSTANTS.SET_LOGGED_IN_USER:
      return { ...state, loggedInUser: payload };

    case CONSTANTS.SET_CHECKEDOUT_ITEMS:
      return { ...state, checkedOutItems: payload };

    case CONSTANTS.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
     
    case CONSTANTS.UPDATE_CART_ITEM_QUANTITY: {
      let index = state.cartItems.findIndex(x => x.product_id === payload.id);

      // User wants to update quantity of existing item.
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          quantity: payload.quantity
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // If we couldn't find such item, do nothing.
      return state;
    }

    case CONSTANTS.UPDATE_CART_ITEM_SIZE: {
      let index = state.cartItems.findIndex(x => x.product_id === payload.id);

      // User wants to update size of existing item.
      if (index !== -1) {
        let cloneCartItems = [...state.cartItems];
        cloneCartItems[index] = {
          ...cloneCartItems[index],
          selectedSize: payload.size
        };

        return { ...state, cartItems: cloneCartItems };
      }

      // If we couldn't find such item, do nothing.
      
      return state;
    }

    case CONSTANTS.SET_MESSAGE:
      return { 
        ...state,
        message: payload };

    case CONSTANTS.CLEAR_MESSAGE:
      return { 
        ...state,
        message: "" };

    case CONSTANTS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };

    case CONSTANTS.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    case CONSTANTS.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case CONSTANTS.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case CONSTANTS.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        loggedInUser: null,
        checkedOutItems: []
      };

    default:
      return state;
  }
};

export default rootReducer;
