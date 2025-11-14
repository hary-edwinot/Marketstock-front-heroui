import api from "../../config/axios";
import {  GET_STATUS_BY_TYPE_URL
} from "../../config/api-url";

// Fetch status by status type
export async function fetchStatusByType(status_type) {
    try {
        const response = await api.get(GET_STATUS_BY_TYPE_URL(status_type));
        return response.data.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des statuts par type:', error);
        throw error;
    }
}