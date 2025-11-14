import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStatusByType } from "../../api/status";


const initialState = {
    statusType: [],
    status: null,
    error: null
};

export const getStatusType = createAsyncThunk(
    'status/fetchStatusByType',
    async (status_type) => {
        const response = await fetchStatusByType(status_type);
        return response;
    }
);


const statusSlice = createSlice ({
    name : "status",
    initialState : initialState,
    extraReducers : (builder) => {
        builder
            .addCase(getStatusType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getStatusType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.statusType = action.payload;
            })
            .addCase(getStatusType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export default statusSlice.reducer;