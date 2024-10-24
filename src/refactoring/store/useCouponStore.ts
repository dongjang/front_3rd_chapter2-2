import { create } from 'zustand';
import { INITIAL_COUPON_LIST, INITIAL_NEW_COUPON } from '../constants/constants.ts';
import { Coupon, CouponStore } from '../types/couponType.ts';

const useCouponStore = create<CouponStore>((set) => ({
  coupons: INITIAL_COUPON_LIST,
  newCoupon: INITIAL_NEW_COUPON,
  addCoupon: (newCoupon: Coupon) => set((state) => ({ coupons: [...state.coupons, newCoupon] })),
  updateCoupon: () => {
    set((state) => {
      const newCoupon = state.newCoupon;
      return {
        coupons: [...state.coupons, newCoupon],
        newCoupon: INITIAL_NEW_COUPON,
      };
    });
  },
  handleNewCoupon: (newCoupon: Coupon) => set({ newCoupon }),
  //테스트 코드 통과용
  initialCoupons: (coupons: Coupon[]) =>
    set(() => ({
      coupons: coupons,
    })),
}));

export default useCouponStore;
