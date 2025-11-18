import { Input, Autocomplete } from "@heroui/react";
import { getLocalisation } from "../app/redux/geolocalisation/search-localisation";
import { useSelector } from "react-redux";

const ProductForm = () => {
    const { localisationData } = useSelector((state) => state.geolocalisation);
    return (
         <>
            <Input
                label="Nom du produit"
                labelPlacement="outside"
                placeholder="Entrez le nom du produit"
                className="my-4"
                isDisabled
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
                placeholder="Sélectionnez un fournisseur"
                aria-label="Sélection un fournisseur"
                label="Nom du fournisseur"
                labelPlacement="outside"
                // selectedKey={selectedClientId}
                // onSelectionChange={setSelectedClientId}
                //items={localisationData}
                emptyContent="Aucun fournisseur trouvé"
                className="my-4"
            ></Autocomplete>


            <Autocomplete
                placeholder="Sélectionnez une catégorie"
                aria-label="Sélection une catégorie"
                label="Nom de la catégorie"
                labelPlacement="outside"
                // selectedKey={selectedClientId}
                // onSelectionChange={setSelectedClientId}
                items={localisationData}
                emptyContent="Aucune catégorie trouvée"
                className="my-4"
            ></Autocomplete>
         
         </>
    )
}

export default ProductForm;