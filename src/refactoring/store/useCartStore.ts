import { create } from 'zustand';
import { calculateCartTotal, updateCartItemQuantity } from '../hooks/utils/cartUtils';
import { CartState } from '../types/cartType';

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  selectedCoupon: null,
  addToCart: (product) => {
    const { cart } = get();
    const existingItem = cart.find((item) => item.product.id === product.id);
    const remainingStock = product.stock - (existingItem?.quantity || 0);

    if (remainingStock < 1) return;
    if (existingItem) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item,
        ),
      });
    } else {
      set({ cart: [...cart, { product, quantity: 1 }] });
    }
  },
  removeFromCart: (productId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.product.id !== productId),
    }));
  },
  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      cart: updateCartItemQuantity(state.cart, productId, newQuantity),
    }));
  },
  applyCoupon: (coupon) => {
    set({ selectedCoupon: coupon });
  },
  calculateTotal: () => {
    const { cart, selectedCoupon } = get();
    return calculateCartTotal(cart, selectedCoupon);
  },
}));
