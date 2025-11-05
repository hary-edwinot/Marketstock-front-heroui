import api from "../../config/axios";


export async function fetchCommandes() {
   const response = await api.get('/liste-commandes');
        const commandes = response.data.data;
        return commandes;
}

