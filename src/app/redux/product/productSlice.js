import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduits } from "../../api/product";


const initialState = {
    produits: [],
    status: null,
    error: null
};

export const getProducts = createAsyncThunk(
    'product/fetchProduits',
    async (user_id) => {
        const response = await fetchProduits(user_id);
        return response;
    }
);


const productSlice = createSlice ({
    name : "product",
    initialState : initialState,
    extraReducers : (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.produits = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default productSlice.reducer;