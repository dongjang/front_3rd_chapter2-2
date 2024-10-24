import CouponAdd from './couponAdd';
import CouponList from './couponList';

const index = () => {
  return (
    <div>
      <div className="bg-white p-4 rounded shadow">
        {/* 쿠폰 추가 */}
        <CouponAdd />
        {/* 쿠폰 리스트  */}
        <CouponList />
      </div>
    </div>
  );
};

export default index;
