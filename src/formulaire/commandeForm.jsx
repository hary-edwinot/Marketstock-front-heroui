import { Button, Form, Input, Autocomplete, AutocompleteItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { getClients } from "../app/redux/clients/clientSlice";
import { useSelector, useDispatch } from "react-redux";
import { getLocalisation } from "../app/redux/geolocalisation/search-localisation";


const CommandeForm = () => {
    const { clients, status, error } = useSelector((state) => state.client);
    const { localisationData, status: localisationStatus, error: localisationError } = useSelector((state) => state.geolocalisation);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [submitted, setSubmitted] = useState(null);


    useEffect(() => {
        // Charger les clients via Redux
        dispatch(getClients('14e6a86c-9cb3-4911-a85e-a0c8a68425ef'));
        // Charger les localisations via Redux
        dispatch(getLocalisation());
    }, [dispatch]);

    // Log des commandes quand elles changent
    useEffect(() => {
        console.log('localisationData:', localisationData);
    }, [clients, status, error]);


    const onSubmit = (e) => {
        // Prevent default browser page refresh.
        e.preventDefault();
        // Get form data as an object.
        const data = Object.fromEntries(new FormData(e.currentTarget));
        // Ajouter l'ID du client sélectionné
        data.client_id = selectedClientId;

        // Submit data to your backend API.
        setSubmitted(data);
    };

    return (
        <Form onSubmit={onSubmit}>
            {clients.length > 0 ? (
                <Autocomplete
                    placeholder="Sélectionnez un client"
                    aria-label="Sélection de client"
                    label="Nom du client"
                    labelPlacement="outside"
                    selectedKey={selectedClientId}
                    onSelectionChange={setSelectedClientId}
                    items={clients}
                    emptyContent="Aucun client trouvé"
                    className="my-4"
                >
                    {(client) => (
                        <AutocompleteItem key={client.client_id} value={client.client_id}>
                            {`${client.client_last_name} - ${client.client_name}`}
                        </AutocompleteItem>
                    )}
                </Autocomplete>
            ) : (
                <Input
                    label="Nom du client"
                    labelPlacement="outside"
                    placeholder="Aucun client disponible"
                    className="my-4"
                    isDisabled
                />
            )}


            <Input
                isRequired
                className="my-4"
                errorMessage="Veuillez entrer la quantité"
                label="Quantité"
                labelPlacement="outside"
                name="commande_quantity"
                placeholder="Quantité"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
            />


            <Input
                isRequired
                errorMessage="Veuillez entrer un prix valide"
                label="Prix"
                labelPlacement="outside"
                name="commande_product_price"
                placeholder="Entrez le prix"
                type="number"
            />

            <Autocomplete
                placeholder="Sélectionnez un client"
                aria-label="Sélection de client"
                label="Nom du client"
                labelPlacement="outside"
                // selectedKey={selectedClientId}
                // onSelectionChange={setSelectedClientId}
                items={localisationData}
                emptyContent="Aucun client trouvé"
                className="my-4"
            >
                {(localisation) => (
                    <AutocompleteItem key={localisation.ville_id} value={localisation.ville_id}>
                        {localisation.ville_name}
                    </AutocompleteItem>
                )}
            </Autocomplete>

            <Button type="submit">Submit</Button>
            {submitted && (
                <div className="text-small text-default-500">
                    You submitted: <code>{JSON.stringify(submitted)}</code>
                </div>
            )}
        </Form>
    );
};

export default CommandeForm;



























