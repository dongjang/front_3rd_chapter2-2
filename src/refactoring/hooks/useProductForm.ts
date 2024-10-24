import { useState } from 'react';
import { INITIAL_PRODUCT } from '../constants/constants';
import useProductStore from '../store/useProductStore';
import { Product } from '../types/productType';

export const useProductForm = () => {
  const {
    products,
    addProduct,
    handleProductSotck,
    toggleProductAccordion,
    toggleNewProductForm,
    handleEditingProductInput,
  } = useProductStore();

  const [newProduct, setNewProduct] = useState(INITIAL_PRODUCT);

  function handleAddNewProduct() {
    const productWithId: Product = { ...newProduct, id: `p${products.length + 1}` };
    addProduct(productWithId);
    setNewProduct(INITIAL_PRODUCT);
    toggleNewProductForm();
  }

  return {
    toggleNewProductForm,
    newProduct,
    handleNewProduct: setNewProduct,
    handleAddNewProduct,
    toggleProductAccordion,
    handleEditingProductInput,
    handleProductSotck,
  };
};
