import { CartItem } from './cartType';

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

export interface ProductInfoProps {
  item: CartItem;
}

export interface ProductProps {
  editingProduct?: Product | null;
  selectedProduct?: Product | null;
}

export interface productIdProps {
  productId: string;
}

export interface ProductEditDiscountAddInputProps {
  newDiscount: Discount;
  handleNewDiscount: (discount: Discount) => void;
  editingProduct: Product | null;
}

export interface productManagementAddButtonProps {
  onClick: () => void;
}

export interface productManagementAddInputProps {
  newProduct: Omit<Product, 'id'>;
  handleNewProduct: (product: Omit<Product, 'id'>) => void;
}

export interface ProductEditDiscountAddButtonProps {
  onClick: () => void;
}

export interface ProductEditDiscountEditButtonProds {
  onClick: () => void;
}
