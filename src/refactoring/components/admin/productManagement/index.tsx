import { useProducts } from '../../../hooks';
import ProductAdd from './productManagementAdd';
import ProductList from './productManagementList';

const index = () => {
  const { showNewProductAddForm, isNewProductForm } = useProducts();
  return (
    <div>
      <button
        onClick={showNewProductAddForm}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
        {isNewProductForm ? '취소' : '새 상품 추가'}
      </button>
      {/* 상품 추가 */}
      <ProductAdd />
      {/* 상품 리스트 */}
      <ProductList />
    </div>
  );
};

export default index;
