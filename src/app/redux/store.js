import { configureStore } from "@reduxjs/toolkit";
import commandeReducer from "./commande/commandeSlice";
import clientReducer from "./clients/clientSlice";
import geolocalisationReducer from "./geolocalisation/search-localisation";

const store = configureStore({
    reducer: {
        commande: commandeReducer,
        client: clientReducer,
        geolocalisation: geolocalisationReducer
    },
});

export default store;