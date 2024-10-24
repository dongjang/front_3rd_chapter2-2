import { useProductActions, useProducts } from '../../../../hooks';
import ProductManagementEdit from './productManagementEdit';

const index = () => {
  const { products, openProductIds } = useProducts();
  const { toggleProductAccordion } = useProductActions();
  return (
    <div>
      <div className="space-y-2">
        {products.map((product, index) => (
          <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
            <button
              data-testid="toggle-button"
              onClick={() => toggleProductAccordion(product)}
              className="w-full text-left font-semibold">
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
            {openProductIds.get(product.id) && <ProductManagementEdit productId={product.id} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
