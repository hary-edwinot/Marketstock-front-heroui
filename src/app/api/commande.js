import api from "../../config/axios";
import { 
    GET_COMMANDES_URL, 
    NEW_COMMANDE_URL 
} from "../../config/api-url";

export async function fetchCommandes() {
   const response = await api.get(GET_COMMANDES_URL);
        const commandes = response.data.data;
        return commandes;
}


// Poster une nouvelle commande
export async function postCommande(commandeData) {
    const response = await api.post(NEW_COMMANDE_URL, commandeData);
    // Retourner la réponse complète avec status, message et data
    return response.data;
}