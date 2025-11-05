import api from "../../config/axios";


// Fetch geolocalisation data
export async function fetchGeolocalisation() {
  const response = await api.get(`/localisation`);
  return response.data.data;
}
