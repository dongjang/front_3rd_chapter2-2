interface ProductEditDiscountEditButtonProds {
  onClick: () => void;
}

const ProductEditDiscountEditButton = ({ onClick }: ProductEditDiscountEditButtonProds) => {
  return (
    <div>
      <button onClick={onClick} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2">
        수정 완료
      </button>{' '}
    </div>
  );
};

export default ProductEditDiscountEditButton;
