import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGeolocalisation } from "../../api/geolocalisation";

const initialState = {
    localisationData: [],
    status: null,
    error: null
};


export const getLocalisation = createAsyncThunk(
    'geolocalisation/fetchLocalisation',
    async () => {
        const data = await fetchGeolocalisation();
        return data;
    }
);


const geolocalisationSlice = createSlice({
    name: "geolocalisation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLocalisation.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getLocalisation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.localisationData = action.payload;
            })
            .addCase(getLocalisation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});




export default geolocalisationSlice.reducer;
