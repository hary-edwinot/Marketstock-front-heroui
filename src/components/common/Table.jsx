// ===== IMPORTS =====
// Importation de React et des composants HeroUI nécessaires pour le tableau
import React, { useContext } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@heroui/react";
// Icône pour l'affichage des commandes
import { FileText } from 'lucide-react';
import { useNavigate } from "react-router-dom";



// ===== FONCTIONS UTILITAIRES =====

/**
 * Fonction pour capitaliser la première lettre d'une chaîne
 * @param {string} s - La chaîne à capitaliser
 * @returns {string} - La chaîne capitalisée
 */
export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

/**
 * Icône "Plus" pour le bouton d'ajout
 * Composant SVG réutilisable avec des props personnalisables
 */
export const PlusIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

/**
 * Icône "Trois points verticaux" pour le menu d'actions
 * Utilisée dans le dropdown des actions de chaque ligne
 */
export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <path
                d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="currentColor"
            />
        </svg>
    );
};

/**
 * Icône de loupe pour le champ de recherche
 * Affichée dans l'input de recherche comme indicateur visuel
 */
export const SearchIcon = (props) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

/**
 * Icône chevron vers le bas pour les menus déroulants
 * Utilisée dans les boutons de filtres et de sélection de colonnes
 */
export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

// ===== CONFIGURATION DES COULEURS =====

/**
 * Mapping des statuts vers les couleurs des puces (Chips)
 * Chaque statut est associé à une couleur spécifique pour l'affichage visuel
 * - success: vert (statuts positifs)
 * - danger: rouge (statuts d'erreur/annulation)
 * - warning: orange (statuts d'attente)
 * - primary: bleu (statuts en cours)
 * - secondary: gris (statuts neutres)
 */
const statusColorMap = {
    // Statuts produits
    en_stock: "success",
    stock_epuise: "danger",
    livraison_en_cours: "primary",
    livree: "success",
    en_attente_livraison: "warning",
    en_commande: "secondary",
    livraison_annulee: "danger",
    commande_annulee: "danger",

    // Statuts commandes
    en_attente: "warning",
    confirmee: "primary",
    "confirmée": "primary",  // Ajout du statut avec accent
    en_preparation: "secondary",
    expediee: "primary",
    annulee: "danger",
};

// ===== COMPOSANT PRINCIPAL TABLELIST =====

/**
 * Composant de tableau réutilisable et configurable
 * 
 * @param {Array} INITIAL_VISIBLE_COLUMNS - Colonnes visibles par défaut
 * @param {Array} data - Les données à afficher dans le tableau
 * @param {Array} columns - Configuration des colonnes (nom, uid, sortable, etc.)
 * @param {Array} statusOptions - Options de statut pour les filtres
 * @param {string} searchPlaceholder - Texte du placeholder pour la recherche
 * @param {string} itemLabel - Label pour le nombre total d'éléments ("produits", "commandes", etc.)
 * 
 * Fonctionnalités incluses :
 * - Recherche et filtrage des données
 * - Tri des colonnes
 * - Pagination
 * - Sélection multiple
 * - Affichage conditionnel des colonnes
 * - Actions par ligne (voir, modifier, supprimer)
 */
export default function TableList({ INITIAL_VISIBLE_COLUMNS, data = [], columns = [], statusOptions = [], searchPlaceholder = "Rechercher...", itemLabel = "éléments", addButtonNewLabel = "Ajouter", openDrawer, isSelected = true }) {


    // ===== ÉTATS LOCAUX =====
    const navigate = useNavigate();
    // Valeur du champ de recherche
    const [filterValue, setFilterValue] = React.useState("");

    // Clés des éléments sélectionnés (pour la sélection multiple)
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

    // Colonnes actuellement visibles dans le tableau
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));

    // Filtre de statut actuel ("all" ou array de statuts sélectionnés)
    const [statusFilter, setStatusFilter] = React.useState("all");

    // Nombre de lignes affichées par page
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Configuration du tri (colonne et direction)
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "name",
        direction: "ascending",
    });

    // Page actuelle de la pagination
    const [page, setPage] = React.useState(1);

    // ===== VALEURS DÉRIVÉES =====

    // Indique s'il y a un filtre de recherche actif
    const hasSearchFilter = Boolean(filterValue);

    /**
     * Calcule les colonnes à afficher dans l'en-tête du tableau
     * Filtre les colonnes selon la sélection de l'utilisateur
     */
    const headerColumns = React.useMemo(() => {
        // Si toutes les colonnes sont sélectionnées, retourner toutes les colonnes
        if (visibleColumns === "all") return columns;

        // Sinon, filtrer les colonnes selon la sélection
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    /**
     * Applique les filtres de recherche et de statut aux données
     * Cette fonction est mémorisée pour éviter les recalculs inutiles
     */
    const filteredItems = React.useMemo(() => {
        // Commencer avec une copie des données originales
        let filteredData = [...data];

        // Appliquer le filtre de recherche si présent
        if (hasSearchFilter) {
            filteredData = filteredData.filter((item) => {
                // Rechercher dans le champ 'name' (produits) ou 'order_number' (commandes)
                const searchField = item.name || item.order_number || '';
                return searchField.toLowerCase().includes(filterValue.toLowerCase());
            });
        }

        // Appliquer le filtre de statut si ce n'est pas "all" et pas tous les statuts sélectionnés
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredData = filteredData.filter((item) =>
                Array.from(statusFilter).includes(item.status),
            );
        }

        return filteredData;
    }, [data, filterValue, statusFilter, hasSearchFilter, statusOptions.length]);

    // Calculer le nombre total de pages nécessaires
    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    /**
     * Calcule les éléments à afficher sur la page actuelle
     * Applique la pagination aux données filtrées
     */
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    /**
     * Applique le tri aux éléments de la page actuelle
     * Tri basé sur la configuration dans sortDescriptor
     */
    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            // Récupérer les valeurs à comparer
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];

            // Effectuer la comparaison (-1, 0, 1)
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            // Inverser le résultat si le tri est descendant
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    // ===== FONCTION DE RENDU DES CELLULES =====

    /**
     * Fonction qui détermine comment afficher chaque cellule selon son type
     * Cette fonction gère différents types de colonnes : nom, prix, statut, actions, etc.
     * 
     * @param {Object} item - L'objet de données de la ligne
     * @param {string} columnKey - L'identifiant unique de la colonne
     * @returns {JSX.Element} - Le contenu formaté de la cellule
     */
    const renderCell = React.useCallback((item, columnKey) => {

        // Récupérer la valeur brute de la cellule
        const cellValue = item[columnKey];

        // Switch sur le type de colonne pour un affichage personnalisé
        switch (columnKey) {

            // Colonne numéro de commande - Affichage avec icône et nom du produit
            case "commande_number":
                return (
                    <div className="flex align-center ">
                        <FileText className="mr-2" />
                        <div>
                            <p className="text-bold text-small">{cellValue}</p>
                        </div>
                    </div>
                );

            // Colonne client
            case "client_id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small">{item.client?.client_name || cellValue}</p>
                        <p className="text-bold text-tiny text-default-400">{item.client?.client_email}</p>
                    </div>
                );

            // Colonne facture
            case "facture_id":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small"><span className={`rounded-[5px] py-1 px-3`}>{item.facture?.facture_number || ''}</span></p>
                    </div>
                );

            // Colonne reste à payer
            case "commande_rest_to_pay":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small text-danger">{(cellValue) ? cellValue : '0'} MGA</p>
                        <p className="text-bold text-tiny text-default-400">Reste à payer</p>
                    </div>
                );

            // Colonne statut - Affichage avec puce colorée
            case "status_id":
                return (
                    <Chip
                        className={`capitalize bg-${statusColorMap[item.status?.status_name]}-100`}
                        color={statusColorMap[item.status?.status_name] || "default"}
                        size="sm"
                        variant="flat"
                    >
                        {item.status?.status_name || cellValue}
                    </Chip>
                );

            // // Colonne date de création - Formatage français de la date et heure
            case "created_at":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString('fr-FR') : 'N/A'}
                        </p>
                        <p className="text-bold text-tiny text-default-400">
                            {item.created_at ? new Date(item.created_at).toLocaleTimeString('fr-FR') : ''}
                        </p>
                    </div>
                );

            // Colonne actions - Menu déroulant avec options
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem key="view">Voir</DropdownItem>
                                <DropdownItem key="edit">Modifier</DropdownItem>
                                <DropdownItem key="delete">Supprimer</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );

            // Cas par défaut - Affichage simple de la valeur
            default:
                return cellValue;
        }
    }, [statusOptions]);

    // ===== GESTIONNAIRES D'ÉVÉNEMENTS =====

    /**
     * Passer à la page suivante
     */
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    /**
     * Passer à la page précédente
     */
    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    /**
     * Changer le nombre de lignes par page
     * Remet automatiquement à la page 1
     */
    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    /**
     * Gérer le changement de valeur du champ de recherche
     * Remet automatiquement à la page 1 lors d'une nouvelle recherche
     */
    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    /**
     * Effacer le champ de recherche
     * Remet à la page 1
     */
    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    // Gestionnaire d'événements pour le bouton d'ajout
    const onAddNew = React.useCallback(() => {
        // Logique pour ajouter un nouvel élément
    }, []);

    // ===== CONTENU DU HAUT DU TABLEAU =====

    /**
     * Contenu affiché au-dessus du tableau
     * Inclut : barre de recherche, filtres de statut, sélecteur de colonnes, bouton d'ajout
     */
    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                {/* Première ligne : barre de recherche et boutons de contrôle */}
                <div className="flex justify-between gap-3 items-end">
                    {/* Champ de recherche avec icône */}
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder={searchPlaceholder}
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />

                    {/* Groupe de boutons de contrôle */}
                    <div className="flex gap-3">
                        {/* Dropdown de filtrage par statut */}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        {/* Dropdown de sélection des colonnes visibles */}
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Colonnes
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>

                        {/* Bouton d'ajout d'un nouvel élément */}
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                            onPress={openDrawer || (() => console.log("Aucune action configurée pour le bouton d'ajout"))}
                        >
                            {addButtonNewLabel}
                        </Button>
                    </div>
                </div>

                {/* Deuxième ligne : informations et sélecteur de pagination */}
                <div className="flex justify-between items-center">
                    {/* Affichage du nombre total d'éléments */}
                    <span className="text-default-400 text-small">Total {data.length} {itemLabel}</span>

                    {/* Sélecteur du nombre de lignes par page */}
                    <label className="flex items-center text-default-400 text-small">
                        Lignes par page:
                        <select
                            className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
        searchPlaceholder,
        itemLabel,
        statusOptions,
        columns,
        openDrawer,
        addButtonNewLabel,
    ]);

    // ===== CONTENU DU BAS DU TABLEAU =====

    /**
     * Contenu affiché en bas du tableau
     * Inclut : informations de sélection, pagination, boutons de navigation
     */
    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                {/* Informations sur la sélection d'éléments */}
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Tous les éléments sélectionnés"
                        : `${selectedKeys.size} sur ${filteredItems.length} sélectionnés`}
                </span>

                {/* Composant de pagination centrale */}
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />

                {/* Boutons de navigation page précédente/suivante */}
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Précédent
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Suivant
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

    // ===== RENDU PRINCIPAL =====

    /**
     * Rendu du composant tableau complet
     * Structure : conteneur → tableau HeroUI → en-tête → corps → pied de page
     */
    return (
        <div className="mt-4 p-4 dark:bg-content2 bg-content1 rounded-2xl border border-content3">
            <Table
                isHeaderSticky
                aria-label="Example table with custom cells, pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                selectedKeys={isSelected ? selectedKeys : null}
                selectionMode={isSelected ? "multiple" : "none"}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                {/* En-tête du tableau avec les colonnes */}
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                {/* Corps du tableau avec les données */}
                <TableBody emptyContent={"Aucun produit trouvé"} items={sortedItems}>
                    {(item) => {

                        const isFacture = !!item?.facture;
                        const handleRowClick = () => {
                            if (isFacture) {
                                navigate(`${item.commande_number}/facture/${item.facture?.facture_id || ''}`);
                            }
                        };
                        return (
                            <TableRow
                                key={item.id || item.order_id || item.commande_id}
                                onClick={isFacture ? handleRowClick : null}
                                style={isFacture ? { cursor: 'pointer' } : {}}
                            >
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        );
                    }}
                </TableBody>
            </Table>
        </div>
    );
};


