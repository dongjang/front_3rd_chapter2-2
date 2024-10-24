import { ProductInfoProps } from '../../../../../types';
import { getAppliedDiscount } from '../../../../hooks/utils/cartUtils';

const CartProductInfo = ({ item }: ProductInfoProps) => {
  const appliedDiscount = getAppliedDiscount(item);
  return (
    <div>
      <span className="font-semibold">{item.product.name}</span>
      <br />
      <span className="text-sm text-gray-600">
        {item.product.price}원 x {item.quantity}
        {appliedDiscount > 0 && (
          <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
        )}
      </span>
    </div>
  );
};

export default CartProductInfo;
