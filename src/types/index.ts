export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  seller: string;
  sellerId: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  variants: ProductVariant[];
  specifications: Record<string, string>;
  tags: string[];
  featured: boolean;
  trending: boolean;
  isNew: boolean;
  freeShipping: boolean;
  verified: boolean;
  sponsored: boolean;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  subcategories: Subcategory[];
  productCount: number;
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  product: Product;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'seller' | 'admin' | 'superadmin';
  avatar?: string;
  address?: Address;
  store?: SellerStore;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface SellerStore {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  rating: number;
  productCount: number;
  followerCount: number;
  joinedDate: string;
  responseRate: number;
  shipOnTime: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  trackingNumber?: string;
  courierName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variant?: string;
  quantity: number;
  price: number;
  sellerId: string;
  sellerName: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'return_requested'
  | 'returned'
  | 'refunded';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'promotion' | 'system' | 'support';
  read: boolean;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  active: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  position: 'hero' | 'sidebar' | 'mid';
  active: boolean;
}
