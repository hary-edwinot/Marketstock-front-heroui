import api from "../../config/axios";
import { 
    GET_CLIENTS_URL, 
    GET_CLIENTS_BY_USER_URL 
} from "../../config/api-url";


// Fetch all clients
export async function fetchClients() {
    try {
        const response = await api.get(GET_CLIENTS_URL);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        throw error;
    }
}

// Fetch clients for a specific user
export async function fetchClientsByUser(user_id) {
    try {
        const response = await api.get(GET_CLIENTS_BY_USER_URL(user_id));
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des clients par utilisateur:', error);
        throw error;
    }
}

