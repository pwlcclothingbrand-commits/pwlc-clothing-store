export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'OSFA';

export type ProductCategory = 't-shirt' | 'headwear';

export interface SizeInventory {
  size: Size;
  stock: number;
  label: string;
}

export interface Colorway {
  id: string;
  category: ProductCategory;
  categoryName: string;
  name: string;
  colorName: string;
  hex: string;
  status: 'available' | 'coming_soon';
  releaseTag: string;
  dropNumber: string;
  image: string;
  price: number;
  description: string;
  washDetails: string;
  specs?: string[];
  sizeType?: 'standard' | 'one-size';
}

export interface CartItem {
  id: string;
  size: Size;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
  notes?: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: OrderCustomer;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
}
