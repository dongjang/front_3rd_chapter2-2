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
      <input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={(e) =>
          handleNewDiscount({
            ...newDiscount,
            quantity: parseInt(e.target.value),
          })
        }
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={(e) =>
          handleNewDiscount({
            ...newDiscount,
            rate: parseInt(e.target.value) / 100,
          })
        }
        className="w-1/3 p-2 border rounded"
      />
    </>
  );
};

export default ProductEditDiscountAddInput;
