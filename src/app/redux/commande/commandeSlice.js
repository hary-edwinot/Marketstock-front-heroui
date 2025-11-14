import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCommandes, postCommande } from "../../api/commande";


const initialState = {
    commandes: [],
    status: null,
    error: null
};


// Récupérer la liste des commandes
export const getCommandes = createAsyncThunk(
    'commande/fetchCommandes',
    async () => {
        const response = await fetchCommandes();
        return response;
    }
);

// Créer une nouvelle commande
export const createCommande = createAsyncThunk(
    'commande/createCommande',
    async (commandeData, { rejectWithValue }) => {
        try {
            const response = await postCommande(commandeData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



const commandeSlice = createSlice({
    name: "commande",
    initialState: initialState,
    extraReducers: (builder) => {
        builder

            //recuperer la liste des commandes
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
            })


            //créer une nouvelle commande
            .addCase(createCommande.pending, (state) => {
                state.status = 'creating';
            })
            .addCase(createCommande.fulfilled, (state, action) => {
                state.status = 'created';
                // Ne pas ajouter directement, on rechargera les commandes après
            })
            .addCase(createCommande.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
    reducers: {},
});

export default commandeSlice.reducer;

