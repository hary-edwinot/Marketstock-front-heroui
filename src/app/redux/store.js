import { configureStore } from "@reduxjs/toolkit";
import commandeReducer from "./commande/commandeSlice";
import clientReducer from "./clients/clientSlice";
import geolocalisationReducer from "./geolocalisation/search-localisation";
import statusReducer from "./status/statusSlice";
import productReducer from "./product/productSlice";

const store = configureStore({
    reducer: {
        commande: commandeReducer,
        client: clientReducer,
        geolocalisation: geolocalisationReducer,
        status: statusReducer,
        product: productReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;