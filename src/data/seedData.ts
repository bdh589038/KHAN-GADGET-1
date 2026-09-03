import { Category, Product, Order, Customer, Coupon } from '../types';

export const ADMIN_PASSCODE = 'ESA006##';

export const PRESET_CATEGORIES: Category[] = [
  {
    id: 'cat_gadget',
    name: 'Electrical Gadget Items',
    slug: 'electrical-gadget-items',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Cutting-edge wireless audio, smart watches, fast chargers & premium accessories',
    isPreset: true,
  },
  {
    id: 'cat_man',
    name: 'Man Fashion',
    slug: 'man-fashion',
    imageUrl: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=800&q=80',
    description: 'Sharp urban apparel, luxury timepieces, genuine leather essentials & footwear',
    isPreset: true,
  },
  {
    id: 'cat_woman',
    name: 'Woman Fashion',
    slug: 'woman-fashion',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    description: 'Designer handbags, stylish jewellery, modern chic dresses and designer accessories',
    isPreset: true,
  },
  {
    id: 'cat_food',
    name: 'Food Items',
    slug: 'food-items',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    description: 'Premium organic raw honey, exotic dry fruits, artisanal nuts and organic blends',
    isPreset: true,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // Electrical Gadget Items
  {
    id: 'prod_1',
    sku: 'KG-TWS-PRO9',
    title: 'Khan SoundPulse ANC Wireless Earbuds',
    category: 'Electrical Gadget Items',
    price: 3200,
    discountPrice: 2450,
    stock: 28,
    description: 'Flagship active noise-cancelling wireless earbuds with 42dB hybrid ANC, transparency mode, deep bass dynamic drivers, and 36-hour total battery life with wireless charging case.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    active: true,
    rating: 4.9,
    reviewsCount: 142,
    specifications: {
      'Bluetooth': 'v5.3 Low Latency',
      'Battery Life': '8 hrs (Buds) + 28 hrs (Case)',
      'Water Resistance': 'IPX5 Sweatproof',
      'Noise Cancellation': 'Hybrid ANC 42dB'
    }
  },
  {
    id: 'prod_2',
    sku: 'KG-WAT-ULTRA',
    title: 'Titan AMOLED Ultra Smartwatch (Calling + SpO2)',
    category: 'Electrical Gadget Items',
    price: 4500,
    discountPrice: 3690,
    stock: 14,
    description: 'Titanium alloy frame featuring a 1.96-inch high-brightness AMOLED display, crystal-clear Bluetooth calling, heart rate & sleep monitoring, 100+ sports modes, and 10-day standby.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    bestseller: true,
    active: true,
    rating: 4.8,
    reviewsCount: 98,
    specifications: {
      'Display': '1.96" Ultra AMOLED (60Hz)',
      'Calling': 'Built-in Speaker & Mic',
      'Battery': '380mAh (7-10 days)',
      'Body': 'Aerospace Grade Zinc Alloy'
    }
  },
  {
    id: 'prod_3',
    sku: 'KG-GAN-65W',
    title: 'HyperCharge 65W GaN 3-Port Turbo Wall Charger',
    category: 'Electrical Gadget Items',
    price: 2200,
    discountPrice: 1750,
    stock: 4, // Low stock for dashboard alert
    description: 'Ultra-compact Gallium Nitride (GaN III) fast charger capable of powering your MacBook, iPhone, and Android device simultaneously with intelligent power distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: true,
    active: true,
    rating: 4.9,
    reviewsCount: 65,
    specifications: {
      'Output Ports': '2x USB-C (PD 3.0), 1x USB-A (QC 4.0)',
      'Total Power': '65W Max Turbo',
      'Technology': 'GaN III Semiconductor'
    }
  },
  {
    id: 'prod_4',
    sku: 'KG-MAG-10K',
    title: 'MagSafe Wireless 10,000mAh Power Bank with Foldable Stand',
    category: 'Electrical Gadget Items',
    price: 2800,
    discountPrice: 2190,
    stock: 19,
    description: 'Strong magnetic snap-on 15W wireless charging powerbank with 20W PD Type-C bidirectional port and an ergonomic aluminum kickstand for video calls while charging.',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: false,
    active: true,
    rating: 4.7,
    reviewsCount: 53,
    specifications: {
      'Capacity': '10,000mAh Lithium Polymer',
      'Wireless': '15W Magnetic Fast Charge',
      'Wired': '20W PD Fast Charging'
    }
  },

  // Man Fashion
  {
    id: 'prod_5',
    sku: 'KG-MEN-POLO',
    title: 'Executive Pique Heavyweight Cotton Polo Shirt',
    category: 'Man Fashion',
    price: 1800,
    discountPrice: 1350,
    stock: 45,
    description: 'Tailored regular-fit polo crafted from 240 GSM 100% combed organic long-staple cotton with ribbed collar, horn buttons, and anti-shrink enzyme treatment.',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
    active: true,
    rating: 4.8,
    reviewsCount: 88,
    specifications: {
      'Fabric': '100% Organic Pique Cotton (240 GSM)',
      'Fit': 'Smart Tailored Fit',
      'Colors': 'Charcoal, Navy, Olive'
    }
  },
  {
    id: 'prod_6',
    sku: 'KG-MEN-WLT',
    title: 'Handcrafted Vintage Full-Grain Leather Bi-Fold Wallet',
    category: 'Man Fashion',
    price: 1600,
    discountPrice: 1190,
    stock: 3, // Low stock alert
    description: 'Genuine cowhide leather with natural vegetable tanning that develops a rich patina over time. Features RFID blocking shield, 8 card slots, and dual currency compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: true,
    active: true,
    rating: 4.9,
    reviewsCount: 112,
    specifications: {
      'Material': '100% Full-Grain Cow Leather',
      'Security': 'RFID Blocking Shield',
      'Capacity': '8 Cards + 2 Cash Slots'
    }
  },
  {
    id: 'prod_7',
    sku: 'KG-MEN-WTC',
    title: 'Aviator Chronograph Minimalist Sapphire Watch',
    category: 'Man Fashion',
    price: 5200,
    discountPrice: 4250,
    stock: 12,
    description: 'Japanese quartz movement encased in 316L surgical stainless steel, scratch-proof sapphire crystal glass, and interchangeable top-grain calfskin leather strap.',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: false,
    active: true,
    rating: 4.9,
    reviewsCount: 46,
    specifications: {
      'Movement': 'Precision Japanese Quartz',
      'Glass': 'Anti-reflective Sapphire Crystal',
      'Waterproof': '5 ATM / 50M'
    }
  },

  // Woman Fashion
  {
    id: 'prod_8',
    sku: 'KG-WOM-BAG',
    title: 'Parisian Quilted Crossbody Chain Shoulder Bag',
    category: 'Woman Fashion',
    price: 3400,
    discountPrice: 2650,
    stock: 22,
    description: 'Sophisticated diamond-quilted vegan leather bag with antique gold-tone chain strap, dual magnetic flap closures, and silk-lined interior compartments.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
    active: true,
    rating: 4.9,
    reviewsCount: 79,
    specifications: {
      'Material': 'Premium Quilted Vegan Leather',
      'Hardware': 'Brushed Brass / Antique Gold',
      'Dimensions': '24cm x 16cm x 8cm'
    }
  },
  {
    id: 'prod_9',
    sku: 'KG-WOM-GLS',
    title: 'Cat-Eye Gradient Polarized Sunglasses for Women',
    category: 'Woman Fashion',
    price: 1500,
    discountPrice: 1100,
    stock: 35,
    description: 'Timeless feminine silhouette with UV400 polarized gradient nylon lenses and lightweight hypoallergenic acetate frame. Comes with a luxury magnetic travel box.',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: false,
    active: true,
    rating: 4.7,
    reviewsCount: 38,
    specifications: {
      'Protection': '100% UV400 Polarization',
      'Frame': 'Handmade Cellulose Acetate',
      'Weight': '28 grams'
    }
  },
  {
    id: 'prod_10',
    sku: 'KG-WOM-JWL',
    title: '18K Gold Plated Emerald Minimalist Pendant Necklace',
    category: 'Woman Fashion',
    price: 2100,
    discountPrice: 1590,
    stock: 18,
    description: 'Dainty waterproof hypoallergenic snake chain with deep green lab-crafted emerald cut pendant in 18K triple-dip gold plating.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
    active: true,
    rating: 4.8,
    reviewsCount: 62,
    specifications: {
      'Plating': '18K Real Gold PVD Coating',
      'Stone': 'Lab Grown Colombian Emerald',
      'Hypoallergenic': 'Lead & Nickel Free'
    }
  },

  // Food Items
  {
    id: 'prod_11',
    sku: 'KG-FOOD-HNY',
    title: 'Sundarbans Natural Raw Honey (Khalisha Flower 500g)',
    category: 'Food Items',
    price: 1150,
    discountPrice: 890,
    stock: 50,
    description: '100% unpasteurized raw forest honey collected directly from the wild hives of Sundarbans Khalisha blooms. Rich in natural active enzymes, pollen, and distinctive floral aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    featured: true,
    bestseller: true,
    active: true,
    rating: 5.0,
    reviewsCount: 168,
    specifications: {
      'Origin': 'Sundarbans Mangrove Forest',
      'Purity': '100% Raw, Unfiltered & Lab Tested',
      'Net Weight': '500 Grams Glass Jar'
    }
  },
  {
    id: 'prod_12',
    sku: 'KG-FOOD-NUT',
    title: 'Royal California Roasted Salted Mixed Nuts & Berries (400g)',
    category: 'Food Items',
    price: 1450,
    discountPrice: 1190,
    stock: 2, // Low stock alert
    description: 'Crisp, jumbo-grade California almonds, premium cashews, pistachios, Turkish figs, and tart dried cranberries. Lightly roasted with Himalayan pink crystal salt.',
    imageUrl: 'https://images.unsplash.com/photo-1536591375315-1b838865320a?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: true,
    active: true,
    rating: 4.9,
    reviewsCount: 94,
    specifications: {
      'Ingredients': 'Almonds, Cashews, Pistachio, Cranberry, Fig',
      'Roast': 'Slow Drum Roasted (No Oil)',
      'Packaging': 'Nitrogen Flushed Zip Pouch'
    }
  },
  {
    id: 'prod_13',
    sku: 'KG-FOOD-TEA',
    title: 'Sreemangal Premium First Flush Organic Black Tea (250g)',
    category: 'Food Items',
    price: 650,
    discountPrice: 520,
    stock: 40,
    description: 'Hand-picked tender whole leaf tea from the high-altitude gardens of Sreemangal, Sylhet. Brews a bright golden cup with muscatel notes and velvety brisk finish.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    featured: false,
    bestseller: false,
    active: true,
    rating: 4.8,
    reviewsCount: 41,
    specifications: {
      'Origin': 'Sreemangal, Sylhet, Bangladesh',
      'Grade': 'TGFOP Whole Leaf First Flush',
      'Weight': '250g Airtight Tin'
    }
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup_1',
    code: 'KHAN10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1000,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usedCount: 84,
    active: true
  },
  {
    id: 'coup_2',
    code: 'FLAT150',
    discountType: 'fixed',
    discountValue: 150,
    minOrderValue: 1500,
    expiryDate: '2026-11-30',
    usageLimit: 300,
    usedCount: 52,
    active: true
  },
  {
    id: 'coup_3',
    code: 'GADGET200',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 2500,
    expiryDate: '2026-12-31',
    usageLimit: 200,
    usedCount: 29,
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'KG-ORD-8821',
    customerName: 'Tanvir Hossain',
    phone: '01712345678',
    address: 'House 24, Road 7, Block D, Banani, Dhaka',
    shippingZone: 'inside_dhaka',
    shippingCost: 70,
    items: [
      {
        productId: 'prod_1',
        productTitle: 'Khan SoundPulse ANC Wireless Earbuds',
        productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
        price: 2450,
        quantity: 1,
        total: 2450
      }
    ],
    subtotal: 2450,
    discount: 245,
    couponCode: 'KHAN10',
    total: 2275,
    paymentMethod: 'cod',
    status: 'Delivered',
    notes: 'Please call before delivery.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ord_1002',
    orderNumber: 'KG-ORD-8822',
    customerName: 'Farhana Rahman',
    phone: '01898765432',
    address: 'Flat 4B, Shanta Tower, GEC Circle, Chittagong',
    shippingZone: 'outside_dhaka',
    shippingCost: 130,
    items: [
      {
        productId: 'prod_8',
        productTitle: 'Parisian Quilted Crossbody Chain Shoulder Bag',
        productImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
        price: 2650,
        quantity: 1,
        total: 2650
      },
      {
        productId: 'prod_10',
        productTitle: '18K Gold Plated Emerald Minimalist Pendant Necklace',
        productImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        price: 1590,
        quantity: 1,
        total: 1590
      }
    ],
    subtotal: 4240,
    discount: 150,
    couponCode: 'FLAT150',
    total: 4220,
    paymentMethod: 'bkash',
    status: 'Shipped',
    notes: 'Fragile jewelry items.',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'ord_1003',
    orderNumber: 'KG-ORD-8823',
    customerName: 'Shakil Ahmed',
    phone: '01911223344',
    address: 'Plot 18, Sector 11, Uttara, Dhaka',
    shippingZone: 'inside_dhaka',
    shippingCost: 70,
    items: [
      {
        productId: 'prod_2',
        productTitle: 'Titan AMOLED Ultra Smartwatch (Calling + SpO2)',
        productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        price: 3690,
        quantity: 1,
        total: 3690
      }
    ],
    subtotal: 3690,
    discount: 0,
    total: 3760,
    paymentMethod: 'cod',
    status: 'Confirmed',
    notes: 'Urgent delivery request.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'ord_1004',
    orderNumber: 'KG-ORD-8824',
    customerName: 'Nusrat Jahan',
    phone: '01677889900',
    address: 'Apartment 2A, Green Road, Dhanmondi, Dhaka',
    shippingZone: 'inside_dhaka',
    shippingCost: 70,
    items: [
      {
        productId: 'prod_11',
        productTitle: 'Sundarbans Natural Raw Honey (Khalisha Flower 500g)',
        productImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
        price: 890,
        quantity: 2,
        total: 1780
      }
    ],
    subtotal: 1780,
    discount: 0,
    total: 1850,
    paymentMethod: 'cod',
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Tanvir Hossain',
    phone: '01712345678',
    address: 'House 24, Road 7, Block D, Banani, Dhaka',
    totalOrders: 3,
    totalSpent: 7850,
    lastOrderDate: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
    status: 'Active'
  },
  {
    id: 'cust_2',
    name: 'Farhana Rahman',
    phone: '01898765432',
    address: 'Flat 4B, Shanta Tower, GEC Circle, Chittagong',
    totalOrders: 2,
    totalSpent: 6420,
    lastOrderDate: new Date(Date.now() - 86400000 * 1).toLocaleDateString(),
    status: 'Active'
  },
  {
    id: 'cust_3',
    name: 'Shakil Ahmed',
    phone: '01911223344',
    address: 'Plot 18, Sector 11, Uttara, Dhaka',
    totalOrders: 1,
    totalSpent: 3760,
    lastOrderDate: new Date(Date.now() - 3600000 * 5).toLocaleDateString(),
    status: 'Active'
  },
  {
    id: 'cust_4',
    name: 'Nusrat Jahan',
    phone: '01677889900',
    address: 'Apartment 2A, Green Road, Dhanmondi, Dhaka',
    totalOrders: 1,
    totalSpent: 1850,
    lastOrderDate: new Date().toLocaleDateString(),
    status: 'Active'
  }
];
