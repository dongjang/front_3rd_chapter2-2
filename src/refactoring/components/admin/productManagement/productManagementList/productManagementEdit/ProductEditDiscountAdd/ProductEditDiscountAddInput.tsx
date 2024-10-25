import Input from '../../../../../../atoms/input';
import { ProductEditDiscountAddInputProps } from '../../../../../../types/productType';

const ProductEditDiscountAddInput = ({
  newDiscount,
  handleNewDiscount,
  editingProduct,
}: ProductEditDiscountAddInputProps) => {
  if (!editingProduct) {
    return;
  }
  return (
    <>
      <Input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(value) => {
          handleNewDiscount({ ...newDiscount, quantity: typeof value === 'string' ? parseInt(value) : value });
        }}
      />
      <Input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(value) => {
          handleNewDiscount({ ...newDiscount, rate: typeof value === 'string' ? parseInt(value) : value / 100 });
        }}
      />
    </>
  );
};

export default ProductEditDiscountAddInput;
