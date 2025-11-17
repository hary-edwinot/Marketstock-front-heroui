import api from "../../config/axios";

// Recuperer la liste des produits
export async function fetchProduits(user_id) {
        const response = await api.get(`/products/user/${user_id}`);
        return  response.data.data;
}

