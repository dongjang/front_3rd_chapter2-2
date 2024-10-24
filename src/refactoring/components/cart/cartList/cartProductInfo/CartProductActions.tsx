import { CartProductActionsProps } from '../../../../../types';
import { useCart } from '../../../../hooks';

const CartProductActions = ({ productId, quantity }: CartProductActionsProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div>
      <button
        onClick={() => updateQuantity(productId, quantity - 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400">
        -
      </button>
      <button
        onClick={() => updateQuantity(productId, quantity + 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400">
        +
      </button>
      <button
        onClick={() => removeFromCart(productId)}
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
        삭제
      </button>
    </div>
  );
};

export default CartProductActions;
