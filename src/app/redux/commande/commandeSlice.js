import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCommandes } from "../../api/commande";


const initialState = {
    commandes: [],
    status: null,
    error: null
};


export const getCommandes = createAsyncThunk(
    'commande/fetchCommandes',
    async () => {
        const response = await fetchCommandes();
        return response;
    }
);

const commandeSlice = createSlice({
    name: "commande",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCommandes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCommandes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.commandes = action.payload;
            })
            .addCase(getCommandes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
    reducers: {},
});

export default commandeSlice.reducer;

