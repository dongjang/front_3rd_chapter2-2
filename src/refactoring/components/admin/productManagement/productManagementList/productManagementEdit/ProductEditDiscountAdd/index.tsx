import { useProducts, useProductDiscount, useProductActions } from '../../../../../../hooks/';
import ProductEditDiscountAddButton from './ProductEditDiscountAddButton';
import ProductEditDiscountAddInput from './ProductEditDiscountAddInput';
import ProductEditDiscountEditButton from './ProductEditDiscountEditButton';

const index = () => {
  const { editingProduct } = useProducts();
  const { newDiscount, handleNewDiscount, addProductDiscount } = useProductDiscount();
  const { completeProductEdit } = useProductActions();

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
        <ProductEditDiscountAddButton onClick={() => addProductDiscount(editingProduct.id)} />
      </div>
      <ProductEditDiscountEditButton onClick={completeProductEdit} />
    </div>
  );
};

export default index;
