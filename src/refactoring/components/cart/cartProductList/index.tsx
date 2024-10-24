import { useCart, useProducts } from '../../../hooks';
import Title from '../../../title/Title';
import CartProduct from './CartProduct';
import CartProductAddButton from './CartProductAddButton';
import CartProductDiscountList from './CartProductDiscountList';
import CartProductStockInfo from './CartProductStockInfo';

const index = () => {
  const { addToCart, getRemainingStock } = useCart();
  const { products } = useProducts();
  return (
    <div>
      <Title level={2} mbNum={4} text="상품 목록" />
      <div className="space-y-2">
        {products.map((product) => {
          const remainingStock = getRemainingStock(product);
          return (
            <div key={product.id} data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
              {/* 상품 명, 가격 */}
              <CartProduct product={product} />
              {/* 상품 할인 재고 정보*/}
              <CartProductStockInfo product={product} remainingStock={remainingStock} />
              {/* 상품의 할인 정보가 있으면 표시 하는 리스트 */}
              {product.discounts.length > 0 && <CartProductDiscountList product={product} />}
              {/* 상품을 카트에 추가하는 버튼 */}
              <CartProductAddButton onClick={() => addToCart(product)} remainingStock={remainingStock} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
