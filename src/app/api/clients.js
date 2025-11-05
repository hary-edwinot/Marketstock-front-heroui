import api from "../../config/axios";

// Fetch all clients
export async function fetchClients() {
    try {
        const response = await api.get('/clients');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        throw error;
    }
}

// Fetch clients for a specific user
export async function fetchClientsByUser(user_id) {
    try {
        const response = await api.get(`/clients/user/${user_id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des clients par utilisateur:', error);
        throw error;
    }
}

