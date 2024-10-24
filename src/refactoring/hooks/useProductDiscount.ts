import useProductStore from '../store/useProductStore';

export const useProductDiscount = () => {
  const { handleRemoveDiscount, handleAddDiscount, newDiscount, handleAddNewDiscount } = useProductStore();

  return {
    handleRemoveDiscount,
    handleNewDiscount: handleAddNewDiscount,
    newDiscount,
    handleAddDiscount,
  };
};
