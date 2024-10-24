import useCouponStore from '../store/useCouponStore';

export const useCoupons = () => {
  const { coupons, newCoupon, addCoupon, handleAddCoupon, addNewCoupon, initialCoupons } = useCouponStore();

  return { coupons, newCoupon, addCoupon, handleAddCoupon, addNewCoupon, initialCoupons };
};
