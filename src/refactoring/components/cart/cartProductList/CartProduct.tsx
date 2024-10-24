import { CartProductProps } from '../../../types';

const CartProduct = ({ product }: CartProductProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default CartProduct;
