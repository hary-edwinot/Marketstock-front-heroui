// COMMANDE API URLs
export const GET_COMMANDES_URL = "/liste-commandes";
export const NEW_COMMANDE_URL = "/new-commande";


// CLIENT API URLs
export const GET_CLIENTS_URL = "/clients";
export const GET_CLIENTS_BY_USER_URL = (user_id) => `/clients/user/${user_id}`;


// STATUS API URLs
export const GET_STATUS_BY_TYPE_URL = (status_type) => `/status/type/${status_type}`;