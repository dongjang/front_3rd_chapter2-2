import useProductStore from '../store/useProductStore';

export const useProductActions = () => {
  const { products, addProduct, completeProductEdit, updateProduct, updateEditProduct } = useProductStore();

  return {
    products,
    addProduct,
    completeProductEdit,
    updateEditProduct,
    updateProduct,
  };
};
