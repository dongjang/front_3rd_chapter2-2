import CartProductList from '../components/cart/cartProductList/index.tsx';
import CartList from '../components/cart/cartList/index.tsx';
import Title from '../atom/Title.tsx';

export const CartPage = () => {
  return (
    <div className="container mx-auto p-4">
      <Title level={1} text={'장바구니'} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CartProductList />
        </div>
        <div>
          <Title level={2} mbNum={4} text={'장바구니 내역'} />
          <CartList />
        </div>
      </div>
    </div>
  );
};
