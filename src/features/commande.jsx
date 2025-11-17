import { useEffect, useState } from "react";
import { useDisclosure } from "@heroui/react";
import AlertDeleteModale from "../components/common/AlertDeleteModale";

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
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();

  
    const [itemToDelete, setItemToDelete] = useState(null);


    useEffect(() => {
        // Charger les commandes via Redux
        dispatch(getCommandes());
    }, [dispatch]);

    // Log des commandes quand elles changent
    useEffect(() => {

    }, [commandes, status]);


    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        onDeleteModalOpen();
    };

    const confirmDelete = async () => {
        console.log("Supprimer la commande:", itemToDelete);
        // Ici, ajoutez votre logique de suppression
        // dispatch(deleteCommande(itemToDelete.commande_id));
    };

    
    return (
        <div >
            <div className="mb-8 p-4 bg-content1 dark:bg-content2 rounded-2xl">
                {status === 'loading' && <p>Chargement des commandes...</p>}
                {status === 'failed' && <p className="text-red-500">Erreur: {typeof error === 'string' ? error : JSON.stringify(error)}</p>}

                <TableList
                    data={commandes?.data || commandes || []}
                    columns={columnsCommande}
                    statusOptions={statusOptionsCommande}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS_COMMANDE}
                    searchPlaceholder="Rechercher une commande..."
                    openDrawer={onOpen}
                    isSelected={false}
                    deleteIcon={true}
                    deleteActions={handleDeleteClick}
                />

                <DrawerForm
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    WrappedFormComponent={(props) => <CommandeForm {...props} />}
                    size="5xl"
                    title="Nouvelle Commande"
                />

                <AlertDeleteModale 
                    isOpen={isDeleteModalOpen}
                    onOpenChange={onDeleteModalClose}
                    onConfirm={confirmDelete}
                    itemToDelete={itemToDelete?.commande_number}
                    content= " Êtes-vous sûr de vouloir supprimer cette commande ?"
                    label="Commande"
                />
            </div>
        </div>
    );
}




