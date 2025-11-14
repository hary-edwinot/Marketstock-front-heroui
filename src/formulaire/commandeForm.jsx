import { Button, Form, Input, Autocomplete, AutocompleteItem, addToast, useDisclosure } from "@heroui/react";
import { useState, useEffect } from "react";
import { getClients } from "../app/redux/clients/clientSlice";
import { useSelector, useDispatch } from "react-redux";
import { getLocalisation } from "../app/redux/geolocalisation/search-localisation";
import { getStatusType } from "../app/redux/status/statusSlice";
import { Plus, List } from 'lucide-react';
import { createCommande, getCommandes } from "../app/redux/commande/commandeSlice";


const CommandeForm = ({ closeDrawer }) => {
    const { clients, error } = useSelector((state) => state.client);
    const { localisationData, status: localisationStatus, error: localisationError } = useSelector((state) => state.geolocalisation);
    const { statusType, status: statusStatus, error: statusError } = useSelector((state) => state.status);

    const dispatch = useDispatch();
    const [selectedClientId, setSelectedClientId] = useState('');
    const [selectedStatusId, setSelectedStatusId] = useState('');
    const [selectedLocalisationData, setSelectedLocalisationData] = useState({});
   
    const [newClientInput, setNewClientInput] = useState(false);
    const [clientSearchValue, setClientSearchValue] = useState('');
    const [localisationSearchValue, setLocalisationSearchValue] = useState('');



    useEffect(() => {
        // Charger les clients via Redux
        dispatch(getClients('bf3f9a72-2d12-4bbd-91ec-ae424b3b6d40'));
        // Charger les localisations via Redux
        dispatch(getLocalisation());

        // Charger les status via Redux
        dispatch(getStatusType('commandes'));
    }, [dispatch]);

    // Log des commandes quand elles changent
    useEffect(() => {

    }, [clients, error, statusType, statusError, localisationData, localisationError]);

    // Définir le statut "brouillon" par défaut quand les statuts sont chargés
    useEffect(() => {
        if (statusType && statusType.length > 0) {
            const brouillonStatus = statusType.find(status =>
                status.status_name.toLowerCase() === 'brouillon'
            );
            if (brouillonStatus) {
                setSelectedStatusId(brouillonStatus.status_id);
            }
        }
    }, [statusType]);


    // Selectionner les données de localisation choisies
    const [localisationDetails, setLocalisationDetails] = useState(null);


    useEffect(() => {
        if (selectedLocalisationData) {
            const selectedLocalisation = localisationData.find(loc => loc.ville_id === selectedLocalisationData);
            if (selectedLocalisation) {
                setLocalisationDetails({
                    ville_id: selectedLocalisation.ville_id,
                    ville_name: selectedLocalisation.ville_name,
                    ville_lat: selectedLocalisation.ville_lat,
                    ville_long: selectedLocalisation.ville_long
                });
            }
        }
    }, [selectedLocalisationData, localisationData]);



    const onSubmitFormCommande = (e) => {
        // Prevent default browser page refresh.
        e.preventDefault();
        // Get form data as an object.
        const formData = Object.fromEntries(new FormData(e.currentTarget));

        // Construire l'objet de données proprement
        const data = {
            status_id: selectedStatusId,
            commande_creator_id: 'bf3f9a72-2d12-4bbd-91ec-ae424b3b6d40', // ID de l'utilisateur créateur
        };

        // Ajouter le client (soit l'ID existant, soit les nouvelles données)
        if (newClientInput) {
            // Nouveau client
            data.client_name = formData.client_name;
            data.client_phone = formData.client_phone;
        } else {
            // Client existant
            data.client_id = selectedClientId;
        }

        // Ajouter les détails de localisation
        if (localisationDetails) {
            data.commande_destination_name = localisationDetails.ville_name;
            data.commande_destination_lat = localisationDetails.ville_lat;
            data.commande_destination_long = localisationDetails.ville_long;
        }

        // Ajouter une nouvelle commande via Redux
        dispatch(createCommande(data)).then((result) => {
            if (result.type === 'commande/createCommande/fulfilled') {
                // Récupérer le message de succès
                const responseData = result.payload;

                // 1. Fermer le drawer en premier
                closeDrawer();

                // 2. Afficher le toast après 300ms
                setTimeout(() => {
                    addToast({
                        title: 'Succès',
                        description: "Commande créée avec succès",
                        color: 'success',
                        variant: 'bordered',
                    });
                }, 300);

                // 3. Recharger la liste des commandes après 800ms
                setTimeout(() => {
                    dispatch(getCommandes());
                }, 800);

            } else if (result.type === 'commande/createCommande/rejected') {
                console.error('❌ Erreur:', result.payload);
                addToast({
                    title: 'Erreur',
                    description: "Erreur lors de la création de la commande",
                    color: 'danger',
                    variant: 'bordered',
                });
            }
        });
    };

    return (
        <Form onSubmit={onSubmitFormCommande}>

            <div className="flex w-full gap-5 items-end">
                {
                    !newClientInput ? (
                        <Autocomplete
                            placeholder="Sélectionnez un client"
                            aria-label="Sélection de client"
                            label="Nom du client uniquement dans la liste client"
                            labelPlacement="outside"
                            selectedKey={selectedClientId}
                            onSelectionChange={setSelectedClientId}
                            onInputChange={setClientSearchValue}
                            isRequired
                            items={clients.filter((client) => {
                                const fullName = `${client.client_last_name || ''} ${client.client_name}`.toLowerCase();
                                return fullName.includes(clientSearchValue.toLowerCase());
                            })}
                            emptyContent="Aucun client trouvé"
                            className="my-4"
                        >
                            {(client) => (
                                <AutocompleteItem key={client.client_id} value={client.client_id}>
                                    {`${client.client_last_name ? client.client_last_name : ''} ${client.client_name}`}
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    ) : (
                        <div className="flex w-full gap-5">
                            <Input
                                label="Nom du client"
                                labelPlacement="outside"
                                placeholder="Nom du nouveau client"
                                className="my-4"
                                name="client_name"
                                isRequired
                            />
                            <Input
                                label="Contact du client"
                                labelPlacement="outside"
                                placeholder="Numero de téléphone du client"
                                className="my-4"
                                name="client_phone"
                                isRequired
                            />
                        </div>
                    )
                }
                <span
                    className="bg-primary text-white w-[300px] p-2 rounded-[7px] flex justify-center items-center cursor-pointer mb-4"
                    onClick={() => setNewClientInput(!newClientInput)}>
                    {newClientInput ? <><List className="mr-2" /> Utiliser un client existant</> : <><Plus className="mr-2" /> Ajouter un client</>}
                </span>
            </div>


            <Autocomplete
                placeholder="Sélectionnez un statut"
                aria-label="Sélection du statut"
                label="Statut de la commande"
                labelPlacement="outside"
                selectedKey={selectedStatusId}
                onSelectionChange={setSelectedStatusId}
                items={statusType}
                emptyContent="Aucun statut trouvé"
                className="my-4"
            >
                {(status) => (
                    <AutocompleteItem key={status.status_id} value={status.status_name}>
                        {status.status_name}
                    </AutocompleteItem>
                )}
            </Autocomplete>

            <Autocomplete
                placeholder="Antananarivo"
                aria-label="Selectionner le lieu de livraison"
                label="Lieu de livraison"
                labelPlacement="outside"
                selectedKey={selectedLocalisationData}
                onSelectionChange={setSelectedLocalisationData}
                onInputChange={setLocalisationSearchValue}
                items={localisationData.filter((localisation) => {
                    return localisation.ville_name.toLowerCase().includes(localisationSearchValue.toLowerCase());
                })}
                emptyContent="Aucune ville trouvée"
                className="my-4"
            >
                {(localisation) => (
                    <AutocompleteItem key={localisation.ville_id} value={localisation.ville_id}>
                        {localisation.ville_name}
                    </AutocompleteItem>
                )}
            </Autocomplete>

            <Button className="bg-primary text-amber-50" type="submit">Creer la commande</Button>
        </Form>
    );
};

export default CommandeForm;



























