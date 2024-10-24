import { useProductForm, useProducts } from '../../../../hooks';
import Title from '../../../../atom/Title';
import ProductManagementAddButton from './ProductManagementAddButton';
import ProductManagementAddInput from './ProductManagementAddInput';

const index = () => {
  const { isNewProductForm } = useProducts();
  const { newProduct, handleNewProduct, handleAddNewProduct } = useProductForm();
  return (
    <div>
      {isNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <Title level={3} text="새 상품 추가" />
          {/* 상품관리에서 상품 추가 input */}
          <ProductManagementAddInput newProduct={newProduct} handleNewProduct={handleNewProduct} />
          {/* 상품관리에서 상품 추가 button */}
          <ProductManagementAddButton onClick={handleAddNewProduct} />
        </div>
      )}
    </div>
  );
};

export default index;
