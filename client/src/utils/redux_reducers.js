
export const stateReducers = {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    UPDATE_PRODUCTS: (state, action) => {
        state.products = [...action.products];
    },
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    UPDATE_CATEGORIES: (state, action) => {
        state.categories = [...action.categories];
    },

    UPDATE_CURRENT_CATEGORY: (state, action) => {
        state.currentCategory = action.currentCategory;
    },

    ADD_TO_CART: (state, action) => {
        state.cartOpen = true;
        state.cart = [...state.cart, action.cart];
    },

    ADD_MULTIPLE_TO_CART: (state, action) => {
        state.cart = [...state.cart, ...action.products]
    },

    REMOVE_FROM_CART: (state, action) => {
        let newState = state.cart.filter(product => {
            return product._id !== action._id;
        });

        state.cartOpen = newState.length > 0;
        state.cart = newState;
    },

    UPDATE_CART_QUANTITY: (state, action) => {
        state.cartOpen = true;
        state.cart = state.cart.map(product => {
            if (action._id === product._id) {
                product.purchaseQuantity = action.purchaseQuantity;
            }
            return product;
        });
    },

    CLEAR_CART: (state) => {
        state.cartOpen = false;
        state.cart = [];
    },

    TOGGLE_CART: (state) => {
        state.cartOpen = !state.cartOpen
    }
};