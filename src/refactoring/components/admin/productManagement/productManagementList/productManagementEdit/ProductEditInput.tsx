import { useProducts } from '../../../../../hooks';

const ProductEditInput = () => {
  const { editingProduct, handleProductUpdate, handleStockUpdate } = useProducts();

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
          onChange={(e) => handleProductUpdate(productId, 'name', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct?.price}
          onChange={(e) => handleProductUpdate(productId, 'price', parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct?.stock}
          onChange={(e) => handleStockUpdate(productId, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ProductEditInput;
