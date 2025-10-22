import React from "react";
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

export const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "PRODUIT", uid: "name", sortable: true },
    { name: "PRIX", uid: "price", sortable: true },
    { name: "CATÉGORIE", uid: "category", sortable: true },
    { name: "STOCK", uid: "stock" },
    { name: "FOURNISSEUR", uid: "supplier" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
    { name: "En stock", uid: "en_stock" },
    { name: "Stock épuisé", uid: "stock_epuise" },
    { name: "Livraison en cours", uid: "livraison_en_cours" },
    { name: "Livrée", uid: "livree" },
    { name: "En attente de livraison", uid: "en_attente_livraison" },
    { name: "En commande", uid: "en_commande" },
    { name: "Livraison annulée", uid: "livraison_annulee" },
    { name: "Commande annulée", uid: "commande_annulee" },
];

export const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: "1229.00",
        category: "Smartphones",
        status: "en_stock",
        stock: "45",
        avatar: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=150",
        supplier: "Apple Inc.",
    },
    {
        id: 2,
        name: "MacBook Air M2",
        price: "1199.00",
        category: "Ordinateurs",
        status: "livraison_en_cours",
        stock: "12",
        avatar: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150",
        supplier: "Apple Inc.",
    },
    {
        id: 3,
        name: "Samsung Galaxy S24",
        price: "899.00",
        category: "Smartphones",
        status: "en_stock",
        stock: "28",
        avatar: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=150",
        supplier: "Samsung Electronics",
    },
    {
        id: 4,
        name: "Sony WH-1000XM5",
        price: "399.00",
        category: "Audio",
        status: "stock_epuise",
        stock: "0",
        avatar: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150",
        supplier: "Sony Corporation",
    },
    {
        id: 5,
        name: "Dell XPS 13",
        price: "1099.00",
        category: "Ordinateurs",
        status: "en_attente_livraison",
        stock: "8",
        avatar: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150",
        supplier: "Dell Technologies",
    },
    {
        id: 6,
        name: "Nintendo Switch OLED",
        price: "349.00",
        category: "Gaming",
        stock: "22",
        avatar: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150",
        supplier: "Nintendo Co.",
        status: "en_stock",
    },
    {
        id: 7,
        name: "AirPods Pro 2",
        price: "279.00",
        category: "Audio",
        status: "livree",
        stock: "35",
        avatar: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=150",
        supplier: "Apple Inc.",
    },
    {
        id: 8,
        name: "iPad Pro 12.9\"",
        price: "1199.00",
        category: "Tablettes",
        status: "en_commande",
        stock: "15",
        avatar: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150",
        supplier: "Apple Inc.",
    },
    {
        id: 9,
        name: "LG OLED 55\"",
        price: "1499.00",
        category: "TV & Écrans",
        status: "livraison_annulee",
        stock: "3",
        avatar: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=150",
        supplier: "LG Electronics",
    },
    {
        id: 10,
        name: "Canon EOS R5",
        price: "3899.00",
        category: "Photo",
        status: "en_stock",
        stock: "7",
        avatar: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=150",
        supplier: "Canon Inc.",
    },
    {
        id: 11,
        name: "Microsoft Surface Pro 9",
        price: "1099.00",
        category: "Tablettes",
        status: "en_stock",
        stock: "18",
        avatar: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=150",
        supplier: "Microsoft Corporation",
    },
    {
        id: 12,
        name: "Bose QuietComfort 45",
        price: "329.00",
        category: "Audio",
        status: "commande_annulee",
        stock: "0",
        avatar: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=150",
        supplier: "Bose Corporation",
    },
    {
        id: 13,
        name: "Google Pixel 8 Pro",
        price: "999.00",
        category: "Smartphones",
        status: "en_stock",
        stock: "24",
        avatar: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150",
        supplier: "Google LLC",
    },
    {
        id: 14,
        name: "Tesla Model Y Accessoires",
        price: "299.00",
        category: "Automobile",
        status: "en_attente_livraison",
        stock: "12",
        avatar: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=150",
        supplier: "Tesla Inc.",
    },
    {
        id: 15,
        name: "Dyson V15 Detect",
        price: "749.00",
        category: "Électroménager",
        status: "livraison_en_cours",
        stock: "9",
        avatar: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150",
        supplier: "Dyson Ltd.",
    },
    {
        id: 16,
        name: "Apple Watch Series 9",
        price: "429.00",
        category: "Montres connectées",
        status: "en_stock",
        stock: "31",
        avatar: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=150",
        supplier: "Apple Inc.",
    },
    {
        id: 17,
        name: "HP Envy x360",
        price: "899.00",
        category: "Ordinateurs",
        status: "stock_epuise",
        stock: "0",
        avatar: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=150",
        supplier: "HP Inc.",
    },
    {
        id: 18,
        name: "Logitech MX Master 3S",
        price: "99.00",
        category: "Accessoires",
        status: "livree",
        stock: "67",
        avatar: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150",
        supplier: "Logitech International",
    },
    {
        id: 19,
        name: "Samsung 32\" Odyssey G7",
        price: "649.00",
        category: "Gaming",
        status: "en_commande",
        stock: "14",
        avatar: "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=150",
        supplier: "Samsung Electronics",
    },
    {
        id: 20,
        name: "Kindle Paperwhite",
        price: "139.00",
        category: "Livres électroniques",
        status: "en_stock",
        stock: "42",
        avatar: "https://images.unsplash.com/photo-1481887328591-3e277f9473dc?w=150",
        supplier: "Amazon.com Inc.",
    },
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

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

const statusColorMap = {
    en_stock: "success",
    stock_epuise: "danger",
    livraison_en_cours: "primary",
    livree: "success",
    en_attente_livraison: "warning",
    en_commande: "secondary",
    livraison_annulee: "danger",
    commande_annulee: "danger",
};


const INITIAL_VISIBLE_COLUMNS = ["name", "price", "category", "status", "actions"];


export default function TableList() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredProducts = [...products];

        if (hasSearchFilter) {
            filteredProducts = filteredProducts.filter((product) =>
                product.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredProducts = filteredProducts.filter((product) =>
                Array.from(statusFilter).includes(product.status),
            );
        }

        return filteredProducts;
    }, [products, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((product, columnKey) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: product.avatar }}
                        description={product.supplier}
                        name={cellValue}
                    >
                        {product.supplier}
                    </User>
                );
            case "price":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small">{cellValue} €</p>
                        <p className="text-bold text-tiny text-default-400">Stock: {product.stock}</p>
                    </div>
                );
            case "category":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{product.supplier}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">
                        {statusOptions.find(s => s.uid === product.status)?.name || cellValue}
                    </Chip>
                );
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
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Rechercher un produit..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
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
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
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
                        <Button color="primary" endContent={<PlusIcon />}>
                            Ajouter Produit
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {products.length} produits</span>
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
        products.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Tous les éléments sélectionnés"
                        : `${selectedKeys.size} sur ${filteredItems.length} sélectionnés`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
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
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

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
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
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
                <TableBody emptyContent={"Aucun produit trouvé"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

