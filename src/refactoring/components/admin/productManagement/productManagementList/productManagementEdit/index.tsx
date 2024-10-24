import { useProducts } from '../../../../../hooks';
import { productIdProps } from '../../../../../types';
import ProductDiscountInfo from './ProductDiscountInfo';
import ProductEditDiscountAdd from './ProductEditDiscountAdd';
import ProductEditDiscountInfo from './ProductEditDiscountInfo';
import ProductEditInput from './ProductEditInput';

const index = ({ productId }: productIdProps) => {
  const { editingProduct } = useProducts();
  const isEditing = editingProduct?.id === productId;

  return (
    <div>
      {isEditing ? (
        <div className="mt-2">
          {/* 상품 수정 input 폼 */}
          <ProductEditInput />
          {/* 상품 수정 시 할인 정보*/}
          <ProductEditDiscountInfo />

          {/* 상품 수정 시 할인 추가 */}
          <ProductEditDiscountAdd />
        </div>
      ) : (
        <div>
          {/* 상품 할인 정보 표시 */}
          <ProductDiscountInfo productId={productId} />
        </div>
      )}
    </div>
  );
};

export default index;
