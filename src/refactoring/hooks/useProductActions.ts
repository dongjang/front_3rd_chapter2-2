import { useState } from 'react';
import { INITIAL_PRODUCT } from '../constants/constants';
import useProductStore from '../store/useProductStore';

export const useProductActions = () => {
  const {
    products,
    addProduct,
    handleProductSotck,
    toggleProductAccordion,
    toggleNewProductForm,
    handleEditingProductInput,
    completeProductEdit,
    updateProduct,
    updateEditProduct,
  } = useProductStore();

  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCT);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: `p${products.length + 1}` };
    addProduct(productWithId);
    setNewProduct(INITIAL_PRODUCT);
    toggleNewProductForm();
  };

  return {
    products,
    addProduct,
    toggleNewProductForm,
    newProduct,
    handleNewProduct: setNewProduct,
    handleAddNewProduct,
    toggleProductAccordion,
    handleEditingProductInput,
    completeProductEdit,
    updateEditProduct,
    updateProduct,
    handleProductSotck,
  };
};
