import { useCoupons } from '../../../../hooks';
import CouponAddButton from './CouponAddButton';
import CouponAddInput from './CouponAddInput';

const index = () => {
  const { newCoupon, handleAddCoupon, addNewCoupon } = useCoupons();
  return (
    <div className="space-y-2 mb-4">
      <CouponAddInput newCoupon={newCoupon} addNewCoupon={addNewCoupon} />
      <CouponAddButton onClick={handleAddCoupon} />
    </div>
  );
};

export default index;
