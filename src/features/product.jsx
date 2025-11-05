import TableList from "../components/common/Table";
import { columnsProduct, statusOptionsProduct, products, INITIAL_VISIBLE_COLUMNS } from "../config/tableColumn";

const ProductFeature = () => {
  return (
    <div>
      <TableList
        data={products}
        columns={columnsProduct}
        statusOptions={statusOptionsProduct}
        INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
        searchPlaceholder="Rechercher un produit..."
      />
    </div>
  );
};

export default ProductFeature;