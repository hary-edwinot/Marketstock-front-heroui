import { useEffect, useState } from "react";
import { getNamesAndGeolocalisation } from "../app/api/getLocalisation";
import { Autocomplete, AutocompleteItem, useDisclosure } from "@heroui/react";

import DrawerForm from "../components/common/drawer";

import TableList from "../components/common/Table";
import {
    columnsCommande,
    statusOptionsCommande,
    INITIAL_VISIBLE_COLUMNS_COMMANDE
} from "../config/tableColumn";

import CommandeForm from "../formulaire/commandeForm";
import { useSelector, useDispatch } from "react-redux";
import { getCommandes } from "../app/redux/commande/commandeSlice";




export default function CommandeFeature() {
    const dispatch = useDispatch();
    const { commandes, status, error } = useSelector((state) => state.commande);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedKey, setSelectedKey] = useState("en_cours");
    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cityError, setCityError] = useState(null);

    useEffect(() => {
        // Charger les commandes via Redux
        dispatch(getCommandes());
    }, [dispatch]);

    // Log des commandes quand elles changent
    useEffect(() => {
        console.log('Commandes Redux:', commandes);
        console.log('Status:', status);
    }, [commandes, status]);

    return (
        <div className="p-6">
            <div className="mb-8 p-4 bg-content1 dark:bg-content2 rounded-2xl border border-content3">
                {status === 'loading' && <p>Chargement des commandes...</p>}
                {status === 'failed' && <p className="text-red-500">Erreur: {error}</p>}
                
                <TableList
                    data={commandes?.data || commandes || []}
                    columns={columnsCommande}
                    statusOptions={statusOptionsCommande}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS_COMMANDE}
                    searchPlaceholder="Rechercher une commande..."
                    openDrawer={onOpen}
                    isSelected={false}
                />

                <DrawerForm
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    WrappedFormComponent={CommandeForm}
                    size="5xl"
                    title="Nouvelle Commande"
                />

            </div>
        </div>
    );
}

