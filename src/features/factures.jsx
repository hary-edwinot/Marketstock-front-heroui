import React, { useState, useEffect, useRef } from "react";
import {
    Button,
    Autocomplete,
    AutocompleteItem,
    Input,
    Select,
    SelectItem,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "@heroui/react";

import { FileText, Plus } from 'lucide-react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { getProducts } from "../app/redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


// Fonction pour formater les nombres avec point comme séparateur de milliers
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Styles pour le PDF
const styles = StyleSheet.create({
    page: {
        padding: 10,
        fontSize: 10,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 10,
        marginBottom: 3,
    },
    table: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingVertical: 8,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    tableCol1: { width: '40%', paddingLeft: 5 },
    tableCol2: { width: '20%', paddingLeft: 5 },
    tableCol3: { width: '20%', paddingLeft: 5 },
    tableCol4: { width: '20%', paddingLeft: 5 },
    totals: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
    },
    totalLabel: {
        fontSize: 10,
    },
    totalValue: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    spantitle: {
        fontWeight: 'bold',
    },
});



// Composant PDF
const FacturePDF = ({ products, pageSize = "A4", facture_number, commande_number }) => (
    <Document>
        <Page size={pageSize} style={styles.page}>
            {/* En-tête */}
            <View style={styles.header}>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nom de l'entreprise</Text>
                    <Text style={styles.text}>Adresse complète</Text>
                    <Text style={styles.text}>Numéro TVA ou NIF / STAT</Text>
                    <Text style={styles.text}>Contact : téléphone, email, site web</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.subtitle}>Nom du client / entreprise</Text>
                    <Text style={styles.text}>Adresse : <Text style={styles.spantitle}>(adresse complète)</Text></Text>
                    <Text style={styles.text}>NIF / STAT : <Text style={styles.spantitle}>(si entreprise)</Text></Text>
                    <Text style={styles.text}>Contact : <Text style={styles.spantitle}>(téléphone / email)</Text></Text>
                    <Text style={styles.text}>Facture N°: <Text style={styles.spantitle}>{facture_number?.toUpperCase()}</Text></Text>
                    <Text style={styles.text}>Commande N°: <Text style={styles.spantitle}>{commande_number?.toUpperCase()}</Text></Text>
                    <Text style={styles.text}>Date d'émission: <Text style={styles.spantitle}>{new Date().toLocaleDateString('fr-FR')}</Text></Text>
                </View>
            </View>

            {/* Tableau */}
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text style={styles.tableCol1}>Description</Text>
                    <Text style={styles.tableCol2}>Quantité</Text>
                    <Text style={styles.tableCol3}>Prix Unitaire (Ar)</Text>
                    <Text style={styles.tableCol4}>Total (Ar)</Text>
                </View>
                {products.map((product, index) => (
                    <View key={product.product_id || index} style={styles.tableRow}>
                        <Text style={styles.tableCol1}>{product.product_name || product.description}</Text>
                        <Text style={styles.tableCol2}>{product.product_quantity || product.quantite}</Text>
                        <Text style={styles.tableCol3}>{product.prixUnitaire ? formatNumber(product.prixUnitaire) : '0'}</Text>
                        <Text style={styles.tableCol4}>{product.total ? formatNumber(product.total) : '0'}</Text>
                    </View>
                ))}
            </View>

            {/* Totaux */}
            <View style={styles.totals}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Sous-total:</Text>
                    <Text style={styles.totalValue}>{formatNumber(Math.round(products.reduce((acc, p) => acc + (p.total || 0), 0)))} Ar</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Taxe (20%):</Text>
                    <Text style={styles.totalValue}>{formatNumber(Math.round(products.reduce((acc, p) => acc + (p.total || 0), 0) * 0.20))} Ar</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, { fontWeight: 'bold', fontSize: 12 }]}>Total à payer:</Text>
                    <Text style={[styles.totalValue, { fontSize: 12 }]}>{
                        formatNumber(Math.round(products.reduce((acc, p) => acc + (p.total || 0), 0) * 1.20))
                    } Ar</Text>
                </View>
            </View>
        </Page>
    </Document>
);






























const FactureFeature = () => {

    const { facture_number, commande_number } = useParams();

    const [openModal, setOpenModal] = useState(false);

    // const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleModalOpen = () => {
        setOpenModal(!openModal);
    };

    // console.log(isOpen);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product);

    const prixUnitaireRef = useRef({});
    const prixTotalRef = useRef({});

    useEffect(() => {
        dispatch(getProducts('bf3f9a72-2d12-4bbd-91ec-ae424b3b6d40'));
    }, [dispatch]);

    useEffect(() => {
    }, [products]);

    // const animals = [
    //     { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
    //     { label: "Dog", key: "dog", description: "The most popular pet in the world" },
    //     { label: "Elephant", key: "elephant", description: "The largest land animal" },
    //     { label: "Lion", key: "lion", description: "The king of the jungle" },
    //     { label: "Tiger", key: "tiger", description: "The largest cat species" },
    //     { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
    //     {
    //         label: "Dolphin",
    //         key: "dolphin",
    //         description: "A widely distributed and diverse group of aquatic mammals",
    //     },
    //     { label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds" },
    //     { label: "Zebra", key: "zebra", description: "A several species of African equids" },
    //     {
    //         label: "Shark",
    //         key: "shark",
    //         description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    //     },
    //     {
    //         label: "Whale",
    //         key: "whale",
    //         description: "Diverse group of fully aquatic placental marine mammals",
    //     },
    //     { label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
    //     { label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile" },
    // ];


    const [productsListForm, setProductsListForm] = useState([]);

    const [pageFormat, setPageFormat] = useState("A4");

    // Formats de page disponibles
    const pageFormats = [
        // { key: "A0", label: "A0 (841 × 1189 mm)" },
        // { key: "A1", label: "A1 (594 × 841 mm)" },
        // { key: "A2", label: "A2 (420 × 594 mm)" },
        // { key: "A3", label: "A3 (297 × 420 mm)" },
        { key: "A4", label: "A4 (210 × 297 mm)" },
        { key: "A5", label: "A5 (148 × 210 mm)" },
        { key: "A6", label: "A6 (105 × 148 mm)" },
    ];


    // Ajoute un nouveau produit/service à la liste
    const handleAddProduct = () => {
        // Générer un ID unique temporaire pour les nouveaux produits
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const newProduct = {
            product_id: tempId,
            product_name: '',
            product_quantity: 1,
            product_unit: '',
            prixUnitaire: 0,
            total: 0,
        };
        setProductsListForm([...productsListForm, newProduct]);
    };

    // Met à jour la quantité et le total d'un produit
    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = productsListForm.map((product) => {

            if (product.product_id === productId) {
                const updatedTotal = product.prixUnitaire * newQuantity;
                return { ...product, product_quantity: newQuantity, total: updatedTotal };
            }
            return product;
        });
        setProductsListForm(updatedProducts);

        console.log(productsListForm);
    };


    // Calcul du sous-total de tous les produits
    const calculateSubtotal = () => {
        return productsListForm.reduce((acc, product) => acc + (product.total || 0), 0);
    };

    // Calcul de la taxe (20%)
    const calculateTax = () => {
        return calculateSubtotal() * 0.20;
    };

    // Calcul du total à payer
    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    // On selection le produit dans l'autocomplete
    const handleProductSelect = (selectedProductId, productRowId) => {
        const updatedProducts = productsListForm.map((product) => {
            if (product.product_id === productRowId) {
                // Si aucun produit n'est sélectionné (input vidé)
                if (!selectedProductId) {
                    return {
                        ...product,
                        product_name: '',
                        prixUnitaire: 0,
                        total: 0
                    };
                }

                // Trouver le produit sélectionné dans la liste des produits Redux
                const selectedProduct = products.produits?.find(p => p.product_id === selectedProductId);

                if (selectedProduct) {
                    const newPrice = parseFloat(selectedProduct.product_selling_price || 0);
                    return {
                        ...product,
                        product_name: selectedProduct.product_name,
                        product_unit: selectedProduct.product_unit || '',
                        prixUnitaire: newPrice,
                        total: product.product_quantity * newPrice
                    };
                }
            }
            return product;
        });
        setProductsListForm(updatedProducts);
    };

    return (
        <>
            <div className="flex w-full flex-row gap-4">
                <div className="flex w-full bg-content1 dark:bg-content2 p-2 rounded-2xl flex-row gap-4">
                    {/* <div className="w-full bg-white px-5 py-10 overflow-hidden rounded-lg text-black">
                    <div className="w-full  mb-4 flex items-center justify-between text-lg items-end">
                        <div>
                            <div>
                                <img src="" alt="LOGO" />
                            </div>
                            <div>
                                Informations de l’entreprise
                                <h5 className="font-bold">Nom de l’entreprise</h5>
                                <p>Adresse complète</p>
                                <p>Numéro TVA ou NIF / STAT</p>
                                <p>Contact : téléphone, email, site web</p>
                                <p>Adresse du siège social</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                Informations du client
                                <h5 className="font-bold">Nom du client / entreprise</h5>
                                <p>Adresse</p>
                                <p>NIF / STAT (si entreprise)</p>
                                <p>Contact (téléphone / email)</p>
                            </div>
                            <hr className="my-4" />
                            <div >
                                <p>Facture N°: [Numéro de la facture]</p>
                                <p>Date d’émission: [Date]</p>
                                <p>Date d’échéance: [Date]</p>
                                <p>Référence commande / devis / bon de livraison</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <table className="w-full border-collapse my-[50px]">
                                <thead className="w-full">
                                    <tr className="bg-gray-100">
                                        <th className="p-5 text-left border-b-2 border-gray-300">Description</th>
                                        <th className="p-5 text-left border-b-2 border-gray-300">Quantité</th>
                                        <th className="p-5 text-left border-b-2 border-gray-300">Prix Unitaire (Ar)</th>
                                        <th className="p-5 text-left border-b-2 border-gray-300">Total (Ar)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsListForm.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="p-4">{product.description}</td>
                                            <td className="p-4">{product.quantite}</td>
                                            <td className="p-4">{product.prixUnitaire.toLocaleString()}</td>
                                            <td className="p-4">
                                                <div className="flex justify-between items-center">
                                                    <span>{product.total.toLocaleString()}</span>
                                                    <button className="ml-5 text-red-500 hover:text-red-700 font-bold">×</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-end mt-4">
                                <div className="w-1/3">
                                    <div className="flex justify-between">
                                        <span>Sous-total:</span>
                                        <span>200,000 Ar</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Taxe (20%):</span>
                                        <span>40,000 Ar</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total à payer:</span>
                                        <span>240,000 Ar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                    {/* Aperçu HTML de la facture (ne pas utiliser les composants PDF ici !) */}
                    <div className="w-full bg-content1 dark:bg-content2 p-8 rounded-2xl">
                        <div className="w-full mb-6 flex items-start justify-between">
                            <div className="cursor-pointer" onClick={handleModalOpen}>
                                <h5 className="font-bold text-lg">Nom de l'entreprise</h5>
                                <p className="text-sm">Adresse complète</p>
                                <p className="text-sm">Numéro TVA ou NIF / STAT</p>
                                <p className="text-sm">Contact : téléphone, email, site web</p>
                            </div>
                            <div className="text-right cursor-pointer">
                                <h5 className="font-bold">Nom du client / entreprise</h5>
                                <p className="text-sm">Adresse</p>
                                <p className="text-sm">NIF / STAT (si entreprise)</p>
                                <p className="text-sm">Contact (téléphone / email)</p>
                                <p className="text-sm mt-2">Facture N°: <span className="font-bold"> {facture_number.toLocaleUpperCase()}</span></p>
                                <p className="text-sm mt-2">Commande N°: <span className="font-bold"> {commande_number.toLocaleUpperCase()}</span></p>
                                <p className="text-sm">Date: <span className="font-bold">{new Date().toLocaleDateString('fr-FR')}</span></p>
                            </div>
                        </div>

                        <table className="w-full border-collapse mt-8">
                            <thead>
                                <tr className="bg-content1 dark:bg-content2">
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Quantité</th>
                                    <th className="p-3 text-left">Prix Unitaire (Ar)</th>
                                    <th className="p-3 text-left">Total (Ar)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsListForm.map((product) => (
                                    <tr key={product.product_id} className="border-b border-gray-200">
                                        <td className="p-3">
                                            <Autocomplete
                                                className="max-w-xs"
                                                items={products.produits || []}
                                                placeholder="Selectionner un produit"
                                                aria-label="Sélectionner un produit"
                                                onSelectionChange={(selectedProductId) => handleProductSelect(selectedProductId, product.product_id)}
                                            >
                                                {(prod) => <AutocompleteItem key={prod.product_id}>{prod.product_name}</AutocompleteItem>}
                                            </Autocomplete>
                                        </td>
                                        <td className="p-3 text-left">
                                            <Input
                                                placeholder="0"
                                                type="number"
                                                min={1}
                                                value={product.product_quantity}
                                                onChange={(e) => handleQuantityChange(product.product_id, e.target.value)}
                                            />
                                        </td>
                                        <td className="p-3 text-left" ref={el => prixUnitaireRef.current[product.product_id] = el}>{product.prixUnitaire.toLocaleString()}</td>
                                        <td className="p-3 text-left" ref={el => prixTotalRef.current[product.product_id] = el}>{product.total.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-5 text-center">
                            <Button size="md" className="mb-2 justify-center py-6 rounded-2xl" onPress={handleAddProduct} color="primary" variant="solid">
                                <Plus className="mr-2" size={25} />
                                Ajouter un produit/service
                            </Button>
                        </div>

                        <div className="flex justify-end mt-6">
                            <div className="w-64">
                                <div className="flex justify-between mb-2">
                                    <span>Sous-total:</span>
                                    <span>{calculateSubtotal().toLocaleString()} Ar</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Taxe (20%):</span>
                                    <span>{calculateTax().toLocaleString()} Ar</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total à payer:</span>
                                    <span>{calculateTotal().toLocaleString()} Ar</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-70 p-2 bg-content1 dark:bg-content2 rounded-2xl h-fit">
                    <Select
                        label="Format de page"
                        placeholder="Sélectionner un format"
                        selectedKeys={[pageFormat]}
                        onSelectionChange={(keys) => setPageFormat(Array.from(keys)[0])}
                        className="mb-3"
                        startContent={<FileText size={18} />}
                    >
                        {pageFormats.map((format) => (
                            <SelectItem key={format.key} value={format.key}>
                                {format.label}
                            </SelectItem>
                        ))}
                    </Select>

                    <PDFDownloadLink
                        document={<FacturePDF
                            products={productsListForm}
                            pageSize={pageFormat}
                            facture_number={facture_number}
                            commande_number={commande_number}
                        />}
                        fileName="facture.pdf"
                        className="w-full"
                    >
                        {({ blob, url, loading, error }) => (
                            <Button
                                size="md"
                                fullWidth
                                className="mb-2 justify-start py-6 rounded-2xl"
                                color="primary"
                                variant="solid"
                                isLoading={loading}
                            >
                                <FileText className="mr-2" size={20} />
                                {loading ? 'Génération...' : 'Télécharger la facture'}
                            </Button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>


            <ModalFormFacture isOpen={openModal} onOpenChange={handleModalOpen} />
        </>
    );
};

export default FactureFeature;










// Modal de modification des informations de la facture (à compléter selon les besoins)

const ModalFormFacture = ({ isOpen, onOpenChange }) => {


    return (
        <>
            {/* <Button onPress={onOpen}>Open Modal</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                                    quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                                    nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                                    deserunt nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}