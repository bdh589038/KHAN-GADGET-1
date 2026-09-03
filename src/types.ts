export type CategoryName = 'Food Items' | 'Man Fashion' | 'Woman Fashion' | 'Electrical Gadget Items' | string;

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: CategoryName;
  price: number;
  discountPrice?: number;
  stock: number;
  description: string;
  imageUrl: string;
  additionalImages?: string[];
  featured?: boolean;
  bestseller?: boolean;
  active: boolean;
  rating: number;
  reviewsCount: number;
  specifications?: Record<string, string>;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  itemCount?: number;
  isPreset?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ShippingZone = 'inside_dhaka' | 'outside_dhaka';

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  shippingZone: ShippingZone;
  shippingCost: number;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export type AdminTab = 'overview' | 'products' | 'categories' | 'orders' | 'customers' | 'coupons';
