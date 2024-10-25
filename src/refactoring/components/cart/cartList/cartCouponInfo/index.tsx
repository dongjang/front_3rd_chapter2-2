import { useCart, useCoupons } from '../../../../hooks';
import Title from '../../../atoms/Title';
import CartCouponSelect from './CartCouponSelect';
import CartSelectedCouponInfo from './CartSelectedCouponInfo';

const index = () => {
  const { selectedCoupon } = useCart();
  const { coupons } = useCoupons();
  return (
    <div>
      <div className="mt-6 bg-white p-4 rounded shadow">
        <Title level={2} mbNum={2} text="쿠폰 적용" />
        <CartCouponSelect coupons={coupons} />
        {selectedCoupon && <CartSelectedCouponInfo />}
      </div>
    </div>
  );
};

export default index;
