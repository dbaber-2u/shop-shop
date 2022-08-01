import { createSlice } from '@reduxjs/toolkit';
import { stateReducers } from './redux_reducers';

const initialState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
};

export const stateSlice = createSlice({
    name: 'reduxState',
    initialState,
    reducers: stateReducers
});

export const { REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CATEGORIES,
    TOGGLE_CART, 
    ADD_MULTIPLE_TO_CART } = stateSlice.actions;

export const selectProducts = (state) => state.reduxState.products;

export const selectCategories = (state) => state.reduxState.categories;

export const selectCart = (state) => state.reduxState.cart ?? [];

export const selectCartOpen = (state) => state.reduxState.cartOpen;

export const selectCurrentCategory = (state) => state.reduxState.currentCategory;

export default stateSlice.reducer;