import { useCart } from '../../../../hooks';
import CartProductActions from './CartProductActions';
import CartProductInfo from './CartProductinfo';

const index = () => {
  const { cart } = useCart();
  return (
    <div>
      <div className="space-y-2">
        {cart.map((item) => {
          const productid = item.product.id;
          return (
            <div key={productid} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <CartProductInfo item={item} />
              <div>
                <CartProductActions productId={productid} quantity={item.quantity} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
