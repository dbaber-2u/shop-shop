
export const stateReducers = {
    // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    UPDATE_PRODUCTS: (state, action) => {
        if (action.payload.products) {
            state.products = [...action.payload.products];
        }
    },
    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    UPDATE_CATEGORIES: (state, action) => {
        if (action.payload.categories) {
            state.categories = [...action.payload.categories];
        }
    },

    UPDATE_CURRENT_CATEGORY: (state, action) => {
        if(state.currentCategory !== action.payload.currentCategory) {
        state.currentCategory = action.payload.currentCategory;
        }
        else {
            state.currentCategory = '';
        }
    },

    ADD_TO_CART: (state, action) => {
        state.cartOpen = true;
        if (action.payload.product) {
            state.cart = [...state.cart, action.payload.product];
        }
    },

    ADD_MULTIPLE_TO_CART: (state, action) => {
        if (action.payload.products) {
            state.cart = [...state.cart, ...action.payload.products]
        }
    },

    REMOVE_FROM_CART: (state, action) => {
        let newState = state.cart.filter(product => {
            return product._id !== action.payload._id;
        });

        state.cartOpen = newState.length > 0;
        state.cart = newState;
    },

    UPDATE_CART_QUANTITY: (state, action) => {
        state.cartOpen = true;
        state.cart = state.cart.map(product => {
            if (action.payload._id === product._id) {
                product.purchaseQuantity = action.payload.purchaseQuantity;
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