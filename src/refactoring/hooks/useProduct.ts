import { useState } from 'react';
import { INITIAL_PRODUCT } from '../constants/constants';
import useProductStore from '../store/useProductStore';

export const useProducts = () => {
  const {
    products,
    addProduct,
    handleStockUpdate,
    openProductIds,
    handleAccordionToggle,
    selectedProducts,
    isNewProductForm,
    showNewProductAddForm,
    editingProduct,
    handleEditComplete,
    handleEditProduct,
    handleProductUpdate,
    updateProduct,
    initialProducts,
  } = useProductStore();

  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCT);

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: `p${products.length + 1}` };
    addProduct(productWithId);
    setNewProduct(INITIAL_PRODUCT);
    showNewProductAddForm();
  };

  return {
    products,
    showNewProductAddForm,
    isNewProductForm,
    newProduct,
    handleNewProduct: setNewProduct,
    handleAddNewProduct,
    handleAccordionToggle,
    handleEditComplete,
    handleEditProduct,
    handleStockUpdate,
    openProductIds,
    editingProduct,
    selectedProducts,
    handleProductUpdate,
    updateProduct,
    addProduct,
    initialProducts,
  };
};
