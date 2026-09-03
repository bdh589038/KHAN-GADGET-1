import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  Customer,
  Coupon,
  OrderStatus,
  ShippingZone,
  AdminTab
} from '../types';
import {
  ADMIN_PASSCODE,
  PRESET_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS
} from '../data/seedData';
import { sendOrderEmailNotification } from '../utils/orderNotification';

interface StoreContextType {
  // Store Data
  products: Product[];
  categories: Category[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;

  // Filter / Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: 'featured' | 'bestseller' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (val: 'featured' | 'bestseller' | 'price-low' | 'price-high' | 'rating') => void;

  // UI Modals & Drawers
  activeProductModal: Product | null;
  setActiveProductModal: (p: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutItem: { product: Product; quantity: number } | null;
  setCheckoutItem: (item: { product: Product; quantity: number } | null) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (o: Order | null) => void;

  // Admin Auth & Portal
  isAdminAuthenticated: boolean;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (view: boolean) => void;
  activeAdminTab: AdminTab;
  setActiveAdminTab: (tab: AdminTab) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Cart Operations
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  buyNow: (product: Product, quantity?: number) => void;

  // Coupon Operations
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string, currentSubtotal: number) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Order Operations
  placeOrder: (details: {
    customerName: string;
    phone: string;
    address: string;
    shippingZone: ShippingZone;
    paymentMethod: Order['paymentMethod'];
    notes?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;

  // Admin Crud
  addProduct: (data: Omit<Product, 'id'>) => void;
  editProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (data: Omit<Category, 'id'>) => void;
  editCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addCoupon: (data: Omit<Coupon, 'id' | 'usedCount'>) => void;
  deleteCoupon: (id: string) => void;
  toggleCustomerStatus: (id: string) => void;
  resetToDefaultData: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage`, err);
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State from LocalStorage
  const [products, setProducts] = useState<Product[]>(() =>
    loadFromStorage('kg_products', INITIAL_PRODUCTS)
  );
  const [categories, setCategories] = useState<Category[]>(() =>
    loadFromStorage('kg_categories', PRESET_CATEGORIES)
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage('kg_orders', INITIAL_ORDERS)
  );
  const [customers, setCustomers] = useState<Customer[]>(() =>
    loadFromStorage('kg_customers', INITIAL_CUSTOMERS)
  );
  const [coupons, setCoupons] = useState<Coupon[]>(() =>
    loadFromStorage('kg_coupons', INITIAL_COUPONS)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    loadFromStorage('kg_cart', [])
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() =>
    loadFromStorage('kg_admin_auth', false)
  );

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'bestseller' | 'price-low' | 'price-high' | 'rating'>('featured');

  // Modals & Drawers
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<{ product: Product; quantity: number } | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Admin View State
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');

  // Save to LocalStorage on updates
  useEffect(() => {
    saveToStorage('kg_products', products);
  }, [products]);

  useEffect(() => {
    saveToStorage('kg_categories', categories);
  }, [categories]);

  useEffect(() => {
    saveToStorage('kg_orders', orders);
  }, [orders]);

  useEffect(() => {
    saveToStorage('kg_customers', customers);
  }, [customers]);

  useEffect(() => {
    saveToStorage('kg_coupons', coupons);
  }, [coupons]);

  useEffect(() => {
    saveToStorage('kg_cart', cart);
  }, [cart]);

  useEffect(() => {
    saveToStorage('kg_admin_auth', isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => {
    const unitPrice = item.product.discountPrice ?? item.product.price;
    return total + unitPrice * item.quantity;
  }, 0);

  // Cart Functions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: Math.min(newQty, item.product.stock) };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const buyNow = (product: Product, quantity = 1) => {
    setCheckoutItem({ product, quantity });
    setIsCheckoutOpen(true);
  };

  // Coupons
  const applyCoupon = (code: string, currentSubtotal: number) => {
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed && c.active);

    if (!found) {
      return { success: false, message: 'Invalid or inactive promo code.' };
    }
    if (new Date(found.expiryDate) < new Date()) {
      return { success: false, message: 'This coupon has expired.' };
    }
    if (found.usedCount >= found.usageLimit) {
      return { success: false, message: 'Coupon usage limit reached.' };
    }
    if (currentSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Minimum order of ৳${found.minOrderValue.toLocaleString()} required for this coupon.`
      };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Order Placement
  const placeOrder = ({
    customerName,
    phone,
    address,
    shippingZone,
    paymentMethod,
    notes
  }: {
    customerName: string;
    phone: string;
    address: string;
    shippingZone: ShippingZone;
    paymentMethod: Order['paymentMethod'];
    notes?: string;
  }): Order => {
    // Determine items: single direct buy-now item or full cart
    const orderProducts: { product: Product; quantity: number }[] = checkoutItem
      ? [checkoutItem]
      : cart;

    const subtotal = orderProducts.reduce((sum, item) => {
      const price = item.product.discountPrice ?? item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const shippingCost = shippingZone === 'inside_dhaka' ? 70 : 130;

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
      } else {
        discount = appliedCoupon.discountValue;
      }
    }

    const grandTotal = Math.max(0, subtotal - discount) + shippingCost;
    const orderNumber = `KG-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      customerName,
      phone,
      address,
      shippingZone,
      shippingCost,
      items: orderProducts.map(p => ({
        productId: p.product.id,
        productTitle: p.product.title,
        productImage: p.product.imageUrl,
        price: p.product.discountPrice ?? p.product.price,
        quantity: p.quantity,
        total: (p.product.discountPrice ?? p.product.price) * p.quantity
      })),
      subtotal,
      discount,
      couponCode: appliedCoupon ? appliedCoupon.code : undefined,
      total: grandTotal,
      paymentMethod,
      status: 'Pending',
      notes,
      createdAt: new Date().toISOString()
    };

    // Deduct stock for ordered items
    setProducts(prevProducts =>
      prevProducts.map(prod => {
        const matching = orderProducts.find(op => op.product.id === prod.id);
        if (matching) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - matching.quantity)
          };
        }
        return prod;
      })
    );

    // Save order
    setOrders(prev => [newOrder, ...prev]);

    // Update customer history
    setCustomers(prev => {
      const existingIndex = prev.findIndex(c => c.phone === phone);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          name: customerName,
          address,
          totalOrders: updated[existingIndex].totalOrders + 1,
          totalSpent: updated[existingIndex].totalSpent + grandTotal,
          lastOrderDate: new Date().toLocaleDateString()
        };
        return updated;
      } else {
        const newCustomer: Customer = {
          id: `cust_${Date.now()}`,
          name: customerName,
          phone,
          address,
          totalOrders: 1,
          totalSpent: grandTotal,
          lastOrderDate: new Date().toLocaleDateString(),
          status: 'Active'
        };
        return [newCustomer, ...prev];
      }
    });

    // If coupon used, increment used count
    if (appliedCoupon) {
      setCoupons(prev =>
        prev.map(c =>
          c.id === appliedCoupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
        )
      );
    }

    // Clean up
    if (!checkoutItem) {
      clearCart();
    } else {
      setCheckoutItem(null);
    }
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);
    setLastPlacedOrder(newOrder);

    // Dispatch email copy of order to esaali391@gmail.com
    sendOrderEmailNotification(newOrder);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  // Admin Auth
  const loginAdmin = (passcode: string) => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAdminAuthenticated(true);
      setIsAdminLoginOpen(false);
      setIsAdminView(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setIsAdminView(false);
  };

  // Product CRUD
  const addProduct = (data: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...data,
      id: `prod_${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const editProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Category CRUD
  const addCategory = (data: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...data,
      id: `cat_${Date.now()}`
    };
    setCategories(prev => [...prev, newCat]);
  };

  const editCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Coupon CRUD
  const addCoupon = (data: Omit<Coupon, 'id' | 'usedCount'>) => {
    const newC: Coupon = {
      ...data,
      id: `coup_${Date.now()}`,
      usedCount: 0
    };
    setCoupons(prev => [newC, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const toggleCustomerStatus = (id: string) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
      )
    );
  };

  const resetToDefaultData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(PRESET_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCoupons(INITIAL_COUPONS);
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        customers,
        coupons,
        cart,
        cartCount,
        cartSubtotal,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        activeProductModal,
        setActiveProductModal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutItem,
        setCheckoutItem,
        lastPlacedOrder,
        setLastPlacedOrder,
        isAdminAuthenticated,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isAdminView,
        setIsAdminView,
        activeAdminTab,
        setActiveAdminTab,
        loginAdmin,
        logoutAdmin,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        buyNow,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateOrderStatus,
        addProduct,
        editProduct,
        deleteProduct,
        addCategory,
        editCategory,
        deleteCategory,
        addCoupon,
        deleteCoupon,
        toggleCustomerStatus,
        resetToDefaultData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
};
