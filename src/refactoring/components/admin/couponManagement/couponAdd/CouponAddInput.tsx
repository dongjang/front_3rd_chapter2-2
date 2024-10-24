import { Coupon } from '../../../../../types';

interface CouponAddInputProps {
  newCoupon: Coupon;
  addNewCoupon: (coupon: Coupon) => void;
}
const CouponAddInput = ({ newCoupon, addNewCoupon }: CouponAddInputProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        onChange={(e) => addNewCoupon({ ...newCoupon, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        onChange={(e) => addNewCoupon({ ...newCoupon, code: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          onChange={(e) =>
            addNewCoupon({
              ...newCoupon,
              discountType: e.target.value as 'amount' | 'percentage',
            })
          }
          className="w-full p-2 border rounded">
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          onChange={(e) =>
            addNewCoupon({
              ...newCoupon,
              discountValue: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>{' '}
    </>
  );
};

export default CouponAddInput;
