export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[];
}

export interface Discount {
  quantity: number;
  rate: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  name: string;
  code: string;
  discountType: 'amount' | 'percentage';
  discountValue: number;
}

export interface CartProps {
  products?: Product[];
  coupons: Coupon[];
}

export interface AdminProps {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export interface ProductStore {
  products: Product[];
  openProductIds: Map<string, boolean>;
  selectedProducts: Map<string, Product | null>;
  isNewProductForm: boolean;
  editingProduct: Product | null;
  newDiscount: Discount;
  handleNewDiscount: (discount: Discount) => void;
  toggleNewProductForm: () => void;
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  handleProductSotck: (productId: string, newStock: number) => void;
  removeDiscount: (productId: string, index: number) => void;
  addProductDiscount: (productId: string) => void;
  toggleProductAccordion: (product: Product) => void;
  handleEditingProductInput: (productId: string, key: keyof Product, value: string | number) => void;
  completeProductEdit: () => void;
  updateEditProduct: (productId: string) => void;
  initialProducts(Products: Product[]): void;
}

export interface ProductProps {
  editingProduct?: Product | null;
  selectedProduct?: Product | null;
}

export interface CalculateTotalType {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
}

export interface productIdProps {
  productId: string;
}

export interface CounponsProps {
  coupons: Coupon[];
}

export interface ProductInfoProps {
  item: CartItem;
}

export interface CartProductActionsProps {
  productId: string;
  quantity: number;
}

export interface CartProductProps {
  product: Product;
}

export interface CartProductStockInfoProps {
  product: Product;
  remainingStock: number;
}

export interface CartProductAddButtonProps {
  onClick: () => void;
  remainingStock: number;
}

export interface ProductEditDiscountAddInputProps {
  newDiscount: Discount;
  handleNewDiscount: (discount: Discount) => void;
  editingProduct: Product | null;
}

export interface CouponAddInputProps {
  newCoupon: Coupon;
  handleNewCoupon: (coupon: Coupon) => void;
}
