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
    name: 'state',
    initialState,
    reducers: stateReducers
});

export const { UPDATE_PRODUCTS, } = stateSlice.actions;

export default stateSlice.reducer;