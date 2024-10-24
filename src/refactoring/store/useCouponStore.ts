import { create } from 'zustand';
import { Coupon } from '../../types.ts';
import { INITIAL_COUPON_LIST, INITIAL_NEW_COUPON } from '../constants/constants.ts';

interface CouponStore {
  coupons: Coupon[];
  newCoupon: Coupon;
  addCoupon: (coupon: Coupon) => void;
  handleAddCoupon: () => void;
  setNewCoupon: (coupon: Coupon) => void;
  addNewCoupon: (coupon: Coupon) => void;
  initialCoupons: (coupon: Coupon[]) => void;
}

const useCouponStore = create<CouponStore>((set) => ({
  coupons: INITIAL_COUPON_LIST,
  newCoupon: INITIAL_NEW_COUPON,
  addCoupon: (newCoupon: Coupon) => set((state) => ({ coupons: [...state.coupons, newCoupon] })),
  handleAddCoupon: () => {
    set((state) => {
      const newCoupon = state.newCoupon;
      return {
        coupons: [...state.coupons, newCoupon],
        newCoupon: INITIAL_NEW_COUPON,
      };
    });
  },
  setNewCoupon: (newCoupon: Coupon) => set({ newCoupon }),
  addNewCoupon: (newCoupon: Coupon) => set({ newCoupon }),
  //테스트 코드 통과용
  initialCoupons: (coupons: Coupon[]) =>
    set(() => ({
      coupons: coupons,
    })),
}));

export default useCouponStore;
