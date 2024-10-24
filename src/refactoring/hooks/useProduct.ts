import useProductStore from '../store/useProductStore';

export const useProducts = () => {
  const { products, openProductIds, selectedProducts, isNewProductForm, editingProduct, initialProducts } =
    useProductStore();

  return {
    products,
    isNewProductForm,
    openProductIds,
    editingProduct,
    selectedProducts,
    initialProducts,
  };
};
