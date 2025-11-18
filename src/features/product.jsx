import DrawerForm from "../components/common/drawer";
import TableList from "../components/common/Table";
import { useDisclosure } from "@heroui/react";
import { columnsProduct, statusOptionsProduct, products, INITIAL_VISIBLE_COLUMNS } from "../config/tableColumn";
import ProductForm from "../formulaire/productForm";

export default function ProductFeature() {
  // const { status, error } = useSelector((state) => state.commande);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="mb-8 p-4 bg-content1 dark:bg-content2 rounded-2xl">
            <TableList
              data={products}
              columns={columnsProduct}
              statusOptions={statusOptionsProduct}
              openDrawer={onOpen}
              INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
              searchPlaceholder="Rechercher un produit..."
            />
            <DrawerForm
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              WrappedFormComponent={(props) => <ProductForm {...props} />}
              title="Nouveau Produit"
            />
      </div>
    </div>
  );


};
