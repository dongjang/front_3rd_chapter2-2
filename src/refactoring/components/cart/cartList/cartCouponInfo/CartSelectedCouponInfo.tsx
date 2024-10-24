import { useCart } from '../../../../hooks';

const CartSelectedCouponInfo = () => {
  const { selectedCoupon } = useCart();

  if (!selectedCoupon) return;

  return (
    <p className="text-green-600">
      적용된 쿠폰: {selectedCoupon.name}(
      {selectedCoupon.discountType === 'amount'
        ? `${selectedCoupon.discountValue}원`
        : `${selectedCoupon.discountValue}%`}{' '}
      할인)
    </p>
  );
};

export default CartSelectedCouponInfo;
