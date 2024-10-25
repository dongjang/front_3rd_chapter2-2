import Input from '../../../../atoms/input';
import { useProducts, useProductForm } from '../../../../../hooks';

const ProductEditInput = () => {
  const { editingProduct } = useProducts();
  const { handleEditingProductInput, handleProductSotck } = useProductForm();

  if (!editingProduct) {
    return;
  }

  const productId = editingProduct?.id;
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <Input
          id="productName"
          value={editingProduct?.name}
          onChange={(value) => handleEditingProductInput(productId, 'name', value.toString())}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <Input
          type="number"
          value={editingProduct?.price}
          onChange={(value) => {
            handleEditingProductInput(productId, 'price', typeof value === 'string' ? parseInt(value) : value);
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <Input
          type="number"
          value={editingProduct?.stock}
          onChange={(value) => {
            handleProductSotck(productId, typeof value === 'string' ? parseInt(value) : value);
          }}
        />
      </div>
    </div>
  );
};

export default ProductEditInput;
