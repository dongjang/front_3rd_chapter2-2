import CartProductInfo from './cartProductInfo';
import CartCouponInfo from './cartCouponInfo';
import CartOrderInfo from './cartOrderInfo';

const index = () => {
  return (
    <div>
      <CartProductInfo />
      <CartCouponInfo />
      <CartOrderInfo />
    </div>
  );
};

export default index;
