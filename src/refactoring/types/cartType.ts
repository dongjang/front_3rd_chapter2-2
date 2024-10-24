import { Coupon } from './couponType';
import { Product } from './productType';

export interface CartItem {
  product: Product;
  quantity: number;
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

export interface CalculateTotalType {
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalDiscount: number;
}

export interface CartState {
  cart: CartItem[];
  selectedCoupon: Coupon | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => CalculateTotalType;
}
