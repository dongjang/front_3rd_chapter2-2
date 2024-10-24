import { create } from 'zustand';
import { Product, Discount, ProductStore } from '../../types';
import { INITIAL_PRODUCT_LIST, INITIAL_NEW_DISCOUNT } from '../constants/constants';

const useProductStore = create<ProductStore>((set) => ({
  products: INITIAL_PRODUCT_LIST,
  openProductIds: new Map<string, boolean>(),
  selectedProducts: new Map<string, Product | null>(),
  isNewProductForm: false,
  editingProduct: null as Product | null,
  newDiscount: INITIAL_NEW_DISCOUNT,

  toggleNewProductForm: () => set((state) => ({ isNewProductForm: !state.isNewProductForm })),

  updateProduct: (updatedProduct: Product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    })),

  addProduct: (newProduct: Product) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  handleProductSotck: (productId: string, newStock: number) => {
    set((state) => {
      const updatedProduct = state.products.find((p) => p.id === productId);
      if (updatedProduct) {
        const newProduct = { ...updatedProduct, stock: newStock ? newStock : 0 };
        state.updateProduct(newProduct);
        return {
          editingProduct: newProduct,
        };
      }
      return state;
    });
  },

  removeDiscount: (productId: string, index: number) =>
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            discounts: product.discounts.filter((_, i) => i !== index),
          };
        }
        return product;
      });

      const updatedEditingProduct =
        state.editingProduct && state.editingProduct.id === productId
          ? {
              ...state.editingProduct,
              discounts: state.editingProduct.discounts.filter((_, i) => i !== index),
            }
          : state.editingProduct;
      return {
        products: updatedProducts,
        editingProduct: updatedEditingProduct,
      };
    }),
  addProductDiscount: (productId: string) => {
    set((state) => {
      const updatedProduct = state.products.find((p) => p.id === productId);
      if (updatedProduct) {
        const newProduct = {
          ...updatedProduct,
          discounts: [...updatedProduct.discounts, state.newDiscount],
        };

        return {
          products: state.products.map((p) => (p.id === newProduct.id ? newProduct : p)),
          editingProduct: newProduct,
          newDiscount: { quantity: 0, rate: 0 },
        };
      }
      return state;
    });
  },
  toggleProductAccordion: (product: Product) => {
    set((state) => {
      const productId = product.id;
      const newAccordionMap = new Map(state.openProductIds);
      const newProductsMap = new Map(state.selectedProducts);

      const isOpen = newAccordionMap.get(productId);
      newAccordionMap.set(productId, !isOpen);

      if (isOpen) {
        newProductsMap.set(productId, null);
      } else {
        newProductsMap.set(productId, product);
      }

      return {
        openProductIds: newAccordionMap,
        selectedProducts: newProductsMap,
      };
    });
  },
  updateEditProduct: (productId: string) => {
    set((state) => {
      const editingProduct = state.products.find((p) => p.id === productId);
      return {
        editingProduct: editingProduct || null,
      };
    });
  },
  handleEditingProductInput: (productId: string, key: keyof Product, value: string | number) =>
    set((state) => {
      if (state.editingProduct && state.editingProduct.id === productId) {
        const updatedProduct = { ...state.editingProduct, [key]: value };
        return { editingProduct: updatedProduct };
      }
      return state;
    }),

  completeProductEdit: () =>
    set((state) => {
      if (state.editingProduct) {
        const updatedProducts = state.products.map((p) =>
          p.id === state.editingProduct?.id ? state.editingProduct : p,
        );

        return {
          products: updatedProducts.filter((product): product is Product => product !== null),
          editingProduct: null,
        };
      }
      return state;
    }),

  handleNewDiscount: (discount: Discount) =>
    set(() => ({
      newDiscount: discount,
    })),
  //테스트 코드 통과용
  initialProducts: (products: Product[]) =>
    set(() => ({
      products: products,
    })),
}));

export default useProductStore;
