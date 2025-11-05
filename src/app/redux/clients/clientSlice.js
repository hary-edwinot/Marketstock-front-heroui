import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchClientsByUser } from "../../api/clients";

const initialState = {
    clients: [],
    status: null,
    error: null
};

export const getClients = createAsyncThunk(
    'client/getClients',
    async (user_id) => {
        const response = await fetchClientsByUser(user_id);
        return response.data || response;
    }
);

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {    },
    extraReducers: (builder) => {
        builder
            .addCase(getClients.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clients = action.payload;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default clientSlice.reducer;
