import { Product } from '../../../../../types';

interface productManagementAddInputProps {
  newProduct: Omit<Product, 'id'>;
  handleNewProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductManagementAddInput = ({ newProduct, handleNewProduct }: productManagementAddInputProps) => {
  return (
    <div>
      <div className="mb-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={(e) => handleNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            handleNewProduct({
              ...newProduct,
              price: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={(e) =>
            handleNewProduct({
              ...newProduct,
              stock: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default ProductManagementAddInput;
