import { ProductEditDiscountAddButtonProps } from '../../../../../../types/productType';

const ProductEditDiscountAddButton = ({ onClick }: ProductEditDiscountAddButtonProps) => {
  return (
    <button onClick={onClick} className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
      할인 추가
    </button>
  );
};

export default ProductEditDiscountAddButton;
