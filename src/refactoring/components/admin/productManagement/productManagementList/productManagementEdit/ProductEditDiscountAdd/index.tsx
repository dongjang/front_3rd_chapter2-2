import { useProducts } from '../../../../../../hooks';
import ProductEditDiscountAddButton from './ProductEditDiscountAddButton';
import ProductEditDiscountAddInput from './ProductEditDiscountAddInput';
import ProductEditDiscountEditButton from './ProductEditDiscountEditButton';

const index = () => {
  const { editingProduct, newDiscount, handleNewDiscount, handleAddDiscount, handleEditComplete } = useProducts();

  if (!editingProduct) {
    return;
  }
  return (
    <div>
      <div className="flex space-x-2">
        <ProductEditDiscountAddInput
          newDiscount={newDiscount}
          handleNewDiscount={handleNewDiscount}
          editingProduct={editingProduct}
        />
        <ProductEditDiscountAddButton onClick={() => handleAddDiscount(editingProduct.id)} />
      </div>
      <ProductEditDiscountEditButton onClick={handleEditComplete} />
    </div>
  );
};

export default index;
