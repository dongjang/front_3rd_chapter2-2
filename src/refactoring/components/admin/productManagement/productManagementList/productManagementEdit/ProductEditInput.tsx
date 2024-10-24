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
        <input
          type="text"
          value={editingProduct?.name}
          onChange={(e) => handleEditingProductInput(productId, 'name', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct?.price}
          onChange={(e) => handleEditingProductInput(productId, 'price', parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct?.stock}
          onChange={(e) => handleProductSotck(productId, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ProductEditInput;
