export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface SizeInventory {
  size: Size;
  stock: number;
  label: string;
}

export interface Colorway {
  id: string;
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
}

export interface CartItem {
  id: string;
  size: Size;
  quantity: number;
  price: number;
  title: string;
  image: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
}
