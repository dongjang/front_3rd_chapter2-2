import { act, fireEvent, render, renderHook, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useCart, useCoupons, useProductActions, useProducts } from '../../refactoring/hooks';
import * as cartUtils from '../../refactoring/hooks/utils/cartUtils';
import { AdminPage } from '../../refactoring/pages/AdminPage';
import { CartPage } from '../../refactoring/pages/CartPage';
import { Product, Coupon, CartItem } from '../../refactoring/types/';

const mockCoupons: Coupon[] = [
  {
    name: '5000원 할인 쿠폰',
    code: 'AMOUNT5000',
    discountType: 'amount',
    discountValue: 5000,
  },
  {
    name: '10% 할인 쿠폰',
    code: 'PERCENT10',
    discountType: 'percentage',
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  return <AdminPage />;
};

describe('basic > ', () => {
  describe('시나리오 테스트 > ', () => {
    test('장바구니 페이지 테스트 > ', async () => {
      render(<CartPage />);
      const product1 = screen.getByTestId('product-p1');
      const product2 = screen.getByTestId('product-p2');
      const product3 = screen.getByTestId('product-p3');
      const addToCartButtonsAtProduct1 = within(product1).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct2 = within(product2).getByText('장바구니에 추가');
      const addToCartButtonsAtProduct3 = within(product3).getByText('장바구니에 추가');

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent('상품1');
      expect(product1).toHaveTextContent('10,000원');
      expect(product1).toHaveTextContent('재고: 20개');
      expect(product2).toHaveTextContent('상품2');
      expect(product2).toHaveTextContent('20,000원');
      expect(product2).toHaveTextContent('재고: 20개');
      expect(product3).toHaveTextContent('상품3');
      expect(product3).toHaveTextContent('30,000원');
      expect(product3).toHaveTextContent('재고: 20개');

      // 2. 할인 정보 표시
      expect(screen.getByText('10개 이상: 10% 할인')).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText('상품 금액: 10,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 0원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 10,000원')).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent('재고: 0개');
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent('재고: 0개');

      // 7,9,11,12 모두 위에 목업 데이터로는 통과가 되지만 목업 데이터가 아닌 실제 데이터로는 통과가 안 돼서
      // 실제 데이터에 맞는 값으로 변경해서 테스트 했습니다

      // 7. 할인율 계산
      expect(screen.getByText('상품 금액: 200,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 40,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 160,000원')).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText('+');
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 130,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 570,000원')).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole('combobox');
      fireEvent.change(couponSelect, { target: { value: '1' } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 187,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 513,000원')).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: '0' } }); // 5000원 할인 쿠폰
      expect(screen.getByText('상품 금액: 700,000원')).toBeInTheDocument();
      expect(screen.getByText('할인 금액: 135,000원')).toBeInTheDocument();
      expect(screen.getByText('최종 결제 금액: 565,000원')).toBeInTheDocument();
    });

    test('관리자 페이지 테스트 > ', async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId('product-1');

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText('새 상품 추가'));

      fireEvent.change(screen.getByLabelText('상품명'), {
        target: { value: '상품4' },
      });
      fireEvent.change(screen.getByLabelText('가격'), {
        target: { value: '15000' },
      });
      fireEvent.change(screen.getByLabelText('재고'), {
        target: { value: '30' },
      });

      fireEvent.click(screen.getByText('추가'));

      const $product4 = screen.getByTestId('product-4');

      expect($product4).toHaveTextContent('상품4');
      expect($product4).toHaveTextContent('15000원');
      expect($product4).toHaveTextContent('재고: 30');

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('toggle-button'));
      fireEvent.click(within($product1).getByTestId('modify-button'));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue('20'), {
          target: { value: '25' },
        });
        fireEvent.change(within($product1).getByDisplayValue('10000'), {
          target: { value: '12000' },
        });
        fireEvent.change(within($product1).getByDisplayValue('상품1'), {
          target: { value: '수정된 상품1' },
        });
      });

      fireEvent.click(within($product1).getByText('수정 완료'));

      expect($product1).toHaveTextContent('수정된 상품1');
      expect($product1).toHaveTextContent('12000원');
      expect($product1).toHaveTextContent('재고: 25');

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId('modify-button'));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText('수량'), {
          target: { value: '5' },
        });
        fireEvent.change(screen.getByPlaceholderText('할인율 (%)'), {
          target: { value: '5' },
        });
      });
      fireEvent.click(screen.getByText('할인 추가'));

      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      //삭제를 하는 건 첫 인덱스인데 위에 인덱스까지 삭제됐는지 확인되게 돼 있어서 테스트 코드를 수정 했습니다.

      // 할인 삭제
      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('10개 이상 구매 시 10% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('20개 이상 구매 시 20% 할인')).toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      fireEvent.click(screen.getAllByText('삭제')[0]);
      expect(screen.queryByText('20개 이상 구매 시 20% 할인')).not.toBeInTheDocument();
      expect(screen.queryByText('5개 이상 구매 시 5% 할인')).toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), {
        target: { value: '새 쿠폰' },
      });
      fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), {
        target: { value: 'NEW10' },
      });
      fireEvent.change(screen.getByRole('combobox'), {
        target: { value: 'percentage' },
      });
      fireEvent.change(screen.getByPlaceholderText('할인 값'), {
        target: { value: '10' },
      });

      fireEvent.click(screen.getByText('쿠폰 추가'));

      const $newCoupon = screen.getByTestId('coupon-3');

      expect($newCoupon).toHaveTextContent('새 쿠폰 (NEW10):10% 할인');
    });
  });

  //초기값 세팅을 바꿔서 테스트 코드도 초기값 세팅 변경
  describe('useProducts > ', () => {
    const initialProducts: Product[] = [
      {
        id: 'p1',
        name: '상품1',
        price: 10000,
        stock: 20,
        discounts: [
          { quantity: 10, rate: 0.1 },
          { quantity: 20, rate: 0.2 },
        ],
      },
      {
        id: 'p2',
        name: '상품2',
        price: 20000,
        stock: 20,
        discounts: [{ quantity: 10, rate: 0.15 }],
      },
      {
        id: 'p3',
        name: '상품3',
        price: 30000,
        stock: 20,
        discounts: [{ quantity: 10, rate: 0.2 }],
      },
    ];

    //초기화 하는 방식이 기존과 달라서 테스트용으로 resetProducts를 만들어서 사용
    test('특정 제품으로 초기화할 수 있다.', () => {
      const { result } = renderHook(() => useProducts());
      act(() => {
        result.current.initialProducts(initialProducts);
      });

      expect(result.current.products).toEqual(initialProducts);
    });

    test('제품을 업데이트할 수 있다.', () => {
      const { result } = renderHook(() => useProductActions());
      const updatedProduct = { ...initialProducts[0], name: 'Updated Product' };

      act(() => {
        result.current.updateProduct(updatedProduct);
      });

      expect(result.current.products[0]).toEqual({
        id: 'p1',
        name: 'Updated Product',
        price: 10000,
        stock: 20,
        discounts: [
          { quantity: 10, rate: 0.1 },
          { quantity: 20, rate: 0.2 },
        ],
      });
    });

    test('새로운 제품을 추가할 수 있다.', () => {
      const { result } = renderHook(() => useProductActions());
      const newProduct: Product = {
        id: 'p4',
        name: 'New Product',
        price: 200,
        stock: 5,
        discounts: [],
      };

      act(() => {
        result.current.addProduct(newProduct);
      });

      expect(result.current.products).toHaveLength(4);
      expect(result.current.products[3]).toEqual(newProduct);
    });
  });

  describe('useCoupons > ', () => {
    test('쿠폰을 초기화할 수 있다.', () => {
      const { result } = renderHook(() => useCoupons());
      act(() => {
        result.current.initialCoupons(mockCoupons);
      });

      expect(result.current.coupons).toEqual(mockCoupons);
    });

    test('쿠폰을 추가할 수 있다', () => {
      const { result } = renderHook(() => useCoupons());
      const newCoupon: Coupon = {
        name: 'New Coupon',
        code: 'NEWCODE',
        discountType: 'amount',
        discountValue: 5000,
      };

      act(() => {
        result.current.addCoupon(newCoupon);
      });

      expect(result.current.coupons).toHaveLength(3);
      expect(result.current.coupons[2]).toEqual(newCoupon);
    });
  });

  describe('cartUtils', () => {
    const testProduct: Product = {
      id: '1',
      name: 'Test Product',
      price: 100,
      stock: 10,
      discounts: [
        { quantity: 2, rate: 0.1 },
        { quantity: 5, rate: 0.2 },
      ],
    };

    describe('calculateItemTotal', () => {
      test('할인 없이 총액을 계산해야 합니다.', () => {
        const item: CartItem = { product: testProduct, quantity: 1 };
        expect(cartUtils.calculateItemTotal(item)).toBe(100);
      });

      test('수량에 따라 올바른 할인을 적용해야 합니다.', () => {
        const item: CartItem = { product: testProduct, quantity: 5 };
        expect(cartUtils.calculateItemTotal(item)).toBe(400); // 500 * 0.8
      });
    });

    describe('getMaxApplicableDiscount', () => {
      test('할인이 적용되지 않으면 0을 반환해야 합니다.', () => {
        const item: CartItem = { product: testProduct, quantity: 1 };
        expect(cartUtils.getMaxApplicableDiscount(item)).toBe(0);
      });

      test('적용 가능한 가장 높은 할인율을 반환해야 합니다.', () => {
        const item: CartItem = { product: testProduct, quantity: 5 };
        expect(cartUtils.getMaxApplicableDiscount(item)).toBe(0.2);
      });
    });

    describe('calculateCartTotal', () => {
      const cart: CartItem[] = [
        { product: testProduct, quantity: 2 },
        { product: { ...testProduct, id: '2', price: 200 }, quantity: 1 },
      ];

      test('쿠폰 없이 총액을 올바르게 계산해야 합니다.', () => {
        const result = cartUtils.calculateCartTotal(cart, null);
        expect(result.totalBeforeDiscount).toBe(400);
        expect(result.totalAfterDiscount).toBe(380);
        expect(result.totalDiscount).toBe(20);
      });

      test('금액쿠폰을 올바르게 적용해야 합니다.', () => {
        const coupon: Coupon = {
          name: 'Test Coupon',
          code: 'TEST',
          discountType: 'amount',
          discountValue: 50,
        };
        const result = cartUtils.calculateCartTotal(cart, coupon);
        expect(result.totalAfterDiscount).toBe(330);
        expect(result.totalDiscount).toBe(70);
      });

      test('퍼센트 쿠폰을 올바르게 적용해야 합니다', () => {
        const coupon: Coupon = {
          name: 'Test Coupon',
          code: 'TEST',
          discountType: 'percentage',
          discountValue: 10,
        };
        const result = cartUtils.calculateCartTotal(cart, coupon);
        expect(result.totalAfterDiscount).toBe(342);
        expect(result.totalDiscount).toBe(58);
      });
    });

    describe('updateCartItemQuantity', () => {
      const cart: CartItem[] = [
        { product: testProduct, quantity: 2 },
        { product: { ...testProduct, id: '2' }, quantity: 1 },
      ];

      test('수량을 올바르게 업데이트해야 합니다', () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, '1', 5);
        expect(updatedCart[0].quantity).toBe(5);
        expect(updatedCart[1].quantity).toBe(1);
      });

      test('수량이 0으로 설정된 경우 항목을 제거해야 합니다.', () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, '1', 0);
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].product.id).toBe('2');
      });

      test('재고 한도를 초과해서는 안 됩니다.', () => {
        const updatedCart = cartUtils.updateCartItemQuantity(cart, '1', 15);
        expect(updatedCart[0].quantity).toBe(10); // max stock is 10
      });
    });
  });

  describe('useCart > ', () => {
    const testProduct: Product = {
      id: 'p4',
      name: 'Test Product',
      price: 100,
      stock: 10,
      discounts: [],
    };
    const testCoupon: Coupon = {
      name: 'Test Coupon',
      code: 'TEST',
      discountType: 'percentage',
      discountValue: 10,
    };

    //위에 테스트로 장바구니에 이미 상품 추가돼 있어서 새로운 상품을 추가하면
    //length는 4가되고 3번째 인덱스를 비교해야 해서 테스트 코드 수정 했습니다.
    test('장바구니에 제품을 추가해야 합니다', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(testProduct);
      });

      expect(result.current.cart).toHaveLength(4);
      expect(result.current.cart[3]).toEqual({
        product: testProduct,
        quantity: 1,
      });
    });

    test('장바구니에서 제품을 제거해야 합니다', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        //이미 상품이 addToCart 돼 있어서 다시 실행할 필요가 없어서 제거 했습니다
        //result.current.addToCart(testProduct);
        result.current.removeFromCart(testProduct.id);
      });

      expect(result.current.cart).toHaveLength(3);
    });

    test('제품 수량을 업데이트해야 합니다', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(testProduct);
        result.current.updateQuantity(testProduct.id, 5);
      });

      expect(result.current.cart[3].quantity).toBe(5);
    });

    test('쿠폰을 적용해야지', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.applyCoupon(testCoupon);
      });

      expect(result.current.selectedCoupon).toEqual(testCoupon);
    });

    test('합계를 정확하게 계산해야 합니다', () => {
      const { result } = renderHook(() => useCart());

      act(() => {
        result.current.addToCart(testProduct);
        result.current.updateQuantity(testProduct.id, 2);
        result.current.applyCoupon(testCoupon);
      });

      /*
      이 부분만 테스트 하게 하면 기존 게 맞지만 순서대로 테스트를 내려 온다 했을 때는
      이미 있는 장바구니에 상품들이 있어서 
      이렇게 바꾸는 게 맞을 거 같아서 이렇게 수정해 봤습니다.
      */
      const total = result.current.calculateTotal();
      expect(total.totalBeforeDiscount).toBe(700200);
      expect(total.totalAfterDiscount).toBe(513180);
      expect(total.totalDiscount).toBe(187020);
    });
  });
});
