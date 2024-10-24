import { CartItem, Coupon } from '../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;

  let total = product.price * quantity;
  if (quantity >= 5) {
    total *= 0.8;
  }
  return total;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { quantity } = item;

  if (quantity >= 5) {
    return 0.2;
  }

  return 0;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const { price } = item.product;
    const { quantity } = item;
    totalBeforeDiscount += price * quantity;

    const discount = item.product.discounts.reduce((maxDiscount, d) => {
      return quantity >= d.quantity && d.rate > maxDiscount ? d.rate : maxDiscount;
    }, 0);

    totalAfterDiscount += price * quantity * (1 - discount);
  });

  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
  maxStock: number = 10,
): CartItem[] => {
  const itemIndex = cart.findIndex((item) => item.product.id === productId);

  if (itemIndex === -1) {
    return cart;
  }

  if (0 >= newQuantity) {
    return cart.filter((_, index) => index !== itemIndex);
  }

  const updatedQuantity = Math.min(newQuantity, maxStock);

  return cart.map((item, index) => (index === itemIndex ? { ...item, quantity: updatedQuantity } : item));
};

export const getAppliedDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  let appliedDiscount = 0;
  for (const discount of discounts) {
    if (quantity >= discount.quantity) {
      appliedDiscount = Math.max(appliedDiscount, discount.rate);
    }
  }
  return appliedDiscount;
};

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};
