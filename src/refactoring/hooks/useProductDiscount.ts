import useProductStore from '../store/useProductStore';

export const useProductDiscount = () => {
  const { removeDiscount, addProductDiscount, newDiscount, handleNewDiscount } = useProductStore();

  return {
    removeDiscount,
    handleNewDiscount,
    newDiscount,
    addProductDiscount,
  };
};
