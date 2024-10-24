export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export interface CounponsProps {
  coupons: Coupon[];
}

export interface CouponAddInputProps {
  newCoupon: Coupon;
  handleNewCoupon: (coupon: Coupon) => void;
}

export interface CouponAddButtonProps {
  onClick: () => void;
}

export interface CouponStore {
  coupons: Coupon[];
  newCoupon: Coupon;
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: () => void;
  handleNewCoupon: (coupon: Coupon) => void;
  initialCoupons: (coupon: Coupon[]) => void;
}
