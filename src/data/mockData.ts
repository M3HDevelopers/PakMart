import { Product, Category, User, Order, Review, Coupon, Banner } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', icon: '📱', image: '', productCount: 1250, subcategories: [{ id: '1a', name: 'Mobile Phones', slug: 'mobile-phones', productCount: 450 }, { id: '1b', name: 'Laptops', slug: 'laptops', productCount: 320 }, { id: '1c', name: 'Tablets', slug: 'tablets', productCount: 180 }, { id: '1d', name: 'Accessories', slug: 'accessories', productCount: 300 }] },
  { id: '2', name: 'Fashion', slug: 'fashion', icon: '👗', image: '', productCount: 3400, subcategories: [{ id: '2a', name: 'Men', slug: 'men', productCount: 1200 }, { id: '2b', name: 'Women', slug: 'women', productCount: 1500 }, { id: '2c', name: 'Kids', slug: 'kids', productCount: 700 }] },
  { id: '3', name: 'Home & Living', slug: 'home-living', icon: '🏠', image: '', productCount: 890, subcategories: [{ id: '3a', name: 'Furniture', slug: 'furniture', productCount: 340 }, { id: '3b', name: 'Kitchen', slug: 'kitchen', productCount: 280 }, { id: '3c', name: 'Decor', slug: 'decor', productCount: 270 }] },
  { id: '4', name: 'Beauty', slug: 'beauty', icon: '💄', image: '', productCount: 1600, subcategories: [{ id: '4a', name: 'Skincare', slug: 'skincare', productCount: 600 }, { id: '4b', name: 'Makeup', slug: 'makeup', productCount: 500 }, { id: '4c', name: 'Fragrances', slug: 'fragrances', productCount: 500 }] },
  { id: '5', name: 'Sports', slug: 'sports', icon: '⚽', image: '', productCount: 720, subcategories: [{ id: '5a', name: 'Fitness', slug: 'fitness', productCount: 300 }, { id: '5b', name: 'Outdoor', slug: 'outdoor', productCount: 220 }, { id: '5c', name: 'Team Sports', slug: 'team-sports', productCount: 200 }] },
  { id: '6', name: 'Groceries', slug: 'groceries', icon: '🛒', image: '', productCount: 2100, subcategories: [{ id: '6a', name: 'Fresh Produce', slug: 'fresh-produce', productCount: 400 }, { id: '6b', name: 'Beverages', slug: 'beverages', productCount: 350 }, { id: '6c', name: 'Snacks', slug: 'snacks', productCount: 500 }] },
  { id: '7', name: 'Computers', slug: 'computers', icon: '💻', image: '', productCount: 980, subcategories: [{ id: '7a', name: 'Desktops', slug: 'desktops', productCount: 200 }, { id: '7b', name: 'Monitors', slug: 'monitors', productCount: 180 }, { id: '7c', name: 'Components', slug: 'components', productCount: 600 }] },
  { id: '8', name: 'Appliances', slug: 'appliances', icon: '🔌', image: '', productCount: 650, subcategories: [{ id: '8a', name: 'Refrigerators', slug: 'refrigerators', productCount: 120 }, { id: '8b', name: 'Washing Machines', slug: 'washing-machines', productCount: 100 }, { id: '8c', name: 'ACs', slug: 'acs', productCount: 150 }] },
];

const productImages = [
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1608571423902-eed4a5ad8008?w=400&h=400&fit=crop',
];

const sellers = [
  { id: 's1', name: 'TechZone Pakistan', rating: 4.8 },
  { id: 's2', name: 'Fashion Hub', rating: 4.6 },
  { id: 's3', name: 'Home Essentials', rating: 4.5 },
  { id: 's4', name: 'Beauty Palace', rating: 4.7 },
  { id: 's5', name: 'Sports World', rating: 4.4 },
  { id: 's6', name: 'Gadget Store', rating: 4.9 },
];

const productNames = [
  { name: 'Samsung Galaxy S24 Ultra', cat: 'electronics', sub: 'mobile-phones', brand: 'Samsung', price: 289999, orig: 329999 },
  { name: 'iPhone 15 Pro Max', cat: 'electronics', sub: 'mobile-phones', brand: 'Apple', price: 459999, orig: 499999 },
  { name: 'Sony WH-1000XM5 Headphones', cat: 'electronics', sub: 'accessories', brand: 'Sony', price: 54999, orig: 69999 },
  { name: 'MacBook Air M3', cat: 'computers', sub: 'laptops', brand: 'Apple', price: 349999, orig: 379999 },
  { name: 'Nike Air Max 270', cat: 'fashion', sub: 'men', brand: 'Nike', price: 18999, orig: 24999 },
  { name: 'Adidas Ultraboost 22', cat: 'fashion', sub: 'men', brand: 'Adidas', price: 22999, orig: 28999 },
  { name: 'Dyson V15 Vacuum Cleaner', cat: 'appliances', sub: 'acs', brand: 'Dyson', price: 89999, orig: 109999 },
  { name: 'Canon EOS R6 Mark II', cat: 'electronics', sub: 'accessories', brand: 'Canon', price: 459999, orig: 499999 },
  { name: 'LG 55" OLED TV', cat: 'electronics', sub: 'accessories', brand: 'LG', price: 279999, orig: 329999 },
  { name: 'JBL Flip 6 Speaker', cat: 'electronics', sub: 'accessories', brand: 'JBL', price: 14999, orig: 18999 },
  { name: 'The Ordinary Niacinamide Serum', cat: 'beauty', sub: 'skincare', brand: 'The Ordinary', price: 2499, orig: 3499 },
  { name: 'Maybelline Fit Me Foundation', cat: 'beauty', sub: 'makeup', brand: 'Maybelline', price: 1899, orig: 2499 },
  { name: 'Wooden Coffee Table', cat: 'home-living', sub: 'furniture', brand: 'HomeStyle', price: 34999, orig: 44999 },
  { name: 'Philips Air Fryer XXL', cat: 'appliances', sub: 'kitchen', brand: 'Philips', price: 29999, orig: 36999 },
  { name: 'Yoga Mat Premium', cat: 'sports', sub: 'fitness', brand: 'FitPro', price: 3999, orig: 5499 },
  { name: 'Xiaomi Redmi Note 13 Pro', cat: 'electronics', sub: 'mobile-phones', brand: 'Xiaomi', price: 64999, orig: 74999 },
  { name: 'Gaming Mouse RGB', cat: 'computers', sub: 'accessories', brand: 'Razer', price: 8999, orig: 11999 },
  { name: 'Mechanical Keyboard', cat: 'computers', sub: 'accessories', brand: 'Corsair', price: 15999, orig: 19999 },
  { name: 'Leather Wallet Men', cat: 'fashion', sub: 'men', brand: 'LeatherCraft', price: 3499, orig: 4999 },
  { name: 'Women Handbag Designer', cat: 'fashion', sub: 'women', brand: 'StyleQueen', price: 7999, orig: 12999 },
  { name: 'Bluetooth Earbuds Pro', cat: 'electronics', sub: 'accessories', brand: 'SoundMax', price: 6999, orig: 9999 },
  { name: 'Smart Watch Fitness', cat: 'electronics', sub: 'accessories', brand: 'FitBand', price: 12999, orig: 17999 },
  { name: 'Organic Green Tea Set', cat: 'groceries', sub: 'beverages', brand: 'NaturalLife', price: 1499, orig: 1999 },
  { name: 'Protein Powder 2kg', cat: 'sports', sub: 'fitness', brand: 'MuscleMax', price: 8999, orig: 11999 },
  { name: 'Kids Educational Tablet', cat: 'electronics', sub: 'tablets', brand: 'KidTech', price: 19999, orig: 24999 },
  { name: 'Cotton Bedsheet Set', cat: 'home-living', sub: 'decor', brand: 'ComfortHome', price: 4999, orig: 6999 },
  { name: 'Running Shoes Women', cat: 'fashion', sub: 'women', brand: 'Puma', price: 14999, orig: 19999 },
  { name: 'Stainless Steel Cookware Set', cat: 'home-living', sub: 'kitchen', brand: 'ChefPro', price: 12999, orig: 16999 },
  { name: 'Wireless Charging Pad', cat: 'electronics', sub: 'accessories', brand: 'ChargeFast', price: 2999, orig: 4499 },
  { name: 'Men Casual Shirt', cat: 'fashion', sub: 'men', brand: 'UrbanWear', price: 2499, orig: 3999 },
];

export const products: Product[] = productNames.map((p, i) => ({
  id: `p${i + 1}`,
  name: p.name,
  slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  description: `Premium quality ${p.name}. This product offers exceptional value with superior build quality and performance. Perfect for everyday use with advanced features that set it apart from competitors. Comes with manufacturer warranty and after-sales support.`,
  shortDescription: `High-quality ${p.name} at best price in Pakistan.`,
  price: p.price,
  originalPrice: p.orig,
  discount: Math.round(((p.orig - p.price) / p.orig) * 100),
  images: [productImages[i % productImages.length], productImages[(i + 3) % productImages.length], productImages[(i + 6) % productImages.length]],
  category: p.cat,
  subcategory: p.sub,
  brand: p.brand,
  seller: sellers[i % sellers.length].name,
  sellerId: sellers[i % sellers.length].id,
  rating: (3.5 + Math.random() * 1.5),
  reviewCount: Math.floor(50 + Math.random() * 500),
  stock: Math.floor(Math.random() * 200),
  sold: Math.floor(100 + Math.random() * 2000),
  variants: [{ id: `v${i}-1`, name: 'Default', price: p.price, stock: Math.floor(Math.random() * 100), sku: `SKU-${i}-1` }],
  specifications: { 'Brand': p.brand, 'Category': p.cat, 'Condition': 'New', 'Warranty': '1 Year' },
  tags: [p.brand.toLowerCase(), p.cat],
  featured: i < 10,
  trending: i % 3 === 0,
  isNew: i % 4 === 0,
  freeShipping: i % 2 === 0,
  verified: true,
  sponsored: i % 7 === 0,
  createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
}));

export const mockUsers: User[] = [
  { id: 'u1', name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '03001234567', role: 'customer', createdAt: '2024-01-15' },
  { id: 'u2', name: 'TechZone Pakistan', email: 'seller@techzone.pk', phone: '03121234567', role: 'seller', store: { id: 'st1', name: 'TechZone Pakistan', slug: 'techzone-pakistan', logo: '', banner: '', description: 'Best electronics store in Pakistan', rating: 4.8, productCount: 150, followerCount: 5200, joinedDate: '2023-06-01', responseRate: 95, shipOnTime: 92 }, createdAt: '2023-06-01' },
  { id: 'u3', name: 'Admin User', email: 'admin@pakmart.pk', phone: '03009876543', role: 'admin', createdAt: '2023-01-01' },
  { id: 'u4', name: 'Super Admin', email: 'superadmin@pakmart.pk', phone: '03001111111', role: 'superadmin', createdAt: '2023-01-01' },
];

export const mockOrders: Order[] = [
  { id: 'o1', orderNumber: 'PM-20240001', customerId: 'u1', customerName: 'Ahmed Khan', items: [{ productId: 'p1', productName: 'Samsung Galaxy S24 Ultra', productImage: productImages[0], quantity: 1, price: 289999, sellerId: 's1', sellerName: 'TechZone Pakistan' }], subtotal: 289999, shippingFee: 0, discount: 0, tax: 0, total: 289999, status: 'delivered', paymentMethod: 'cod', paymentStatus: 'paid', shippingAddress: { id: 'a1', label: 'Home', fullName: 'Ahmed Khan', phone: '03001234567', address: 'House 45, Street 12, F-8/3', city: 'Islamabad', state: 'ICT', postalCode: '44000', isDefault: true }, createdAt: '2024-11-01', updatedAt: '2024-11-05' },
  { id: 'o2', orderNumber: 'PM-20240002', customerId: 'u1', customerName: 'Ahmed Khan', items: [{ productId: 'p5', productName: 'Nike Air Max 270', productImage: productImages[3], quantity: 1, price: 18999, sellerId: 's2', sellerName: 'Fashion Hub' }, { productId: 'p10', productName: 'JBL Flip 6 Speaker', productImage: productImages[9], quantity: 1, price: 14999, sellerId: 's6', sellerName: 'Gadget Store' }], subtotal: 33998, shippingFee: 250, discount: 1000, tax: 0, total: 33248, status: 'shipped', paymentMethod: 'card', paymentStatus: 'paid', shippingAddress: { id: 'a1', label: 'Home', fullName: 'Ahmed Khan', phone: '03001234567', address: 'House 45, Street 12, F-8/3', city: 'Islamabad', state: 'ICT', postalCode: '44000', isDefault: true }, trackingNumber: 'TRK123456789', courierName: 'TCS', createdAt: '2024-11-10', updatedAt: '2024-11-12' },
  { id: 'o3', orderNumber: 'PM-20240003', customerId: 'u1', customerName: 'Ahmed Khan', items: [{ productId: 'p4', productName: 'MacBook Air M3', productImage: productImages[10], quantity: 1, price: 349999, sellerId: 's1', sellerName: 'TechZone Pakistan' }], subtotal: 349999, shippingFee: 0, discount: 5000, tax: 0, total: 344999, status: 'processing', paymentMethod: 'card', paymentStatus: 'paid', shippingAddress: { id: 'a1', label: 'Home', fullName: 'Ahmed Khan', phone: '03001234567', address: 'House 45, Street 12, F-8/3', city: 'Islamabad', state: 'ICT', postalCode: '44000', isDefault: true }, createdAt: '2024-11-14', updatedAt: '2024-11-14' },
];

export const mockReviews: Review[] = [
  { id: 'r1', productId: 'p1', userId: 'u1', userName: 'Ahmed Khan', rating: 5, title: 'Amazing phone!', comment: 'Best phone I have ever owned. Camera is incredible and battery life is outstanding.', verified: true, helpful: 24, createdAt: '2024-11-02' },
  { id: 'r2', productId: 'p1', userId: 'u2', userName: 'Bilal Ahmed', rating: 4, title: 'Great value', comment: 'Phone is excellent. Only issue is the price but worth every penny.', verified: true, helpful: 12, createdAt: '2024-11-03' },
  { id: 'r3', productId: 'p5', userId: 'u1', userName: 'Ahmed Khan', rating: 5, title: 'Super comfortable', comment: 'These shoes are incredibly comfortable for daily wear.', verified: true, helpful: 8, createdAt: '2024-11-06' },
  { id: 'r4', productId: 'p4', userId: 'u3', userName: 'Sara Ali', rating: 4, title: 'Lightweight and fast', comment: 'The M3 chip is blazing fast. Perfect for my work needs.', verified: false, helpful: 15, createdAt: '2024-11-08' },
];

export const mockCoupons: Coupon[] = [
  { id: 'c1', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 5000, maxDiscount: 1000, usageLimit: 1000, usedCount: 234, startDate: '2024-01-01', endDate: '2025-12-31', active: true },
  { id: 'c2', code: 'FLAT500', type: 'fixed', value: 500, minOrder: 3000, usageLimit: 500, usedCount: 89, startDate: '2024-01-01', endDate: '2025-06-30', active: true },
  { id: 'c3', code: 'MEGA20', type: 'percentage', value: 20, minOrder: 10000, maxDiscount: 5000, usageLimit: 200, usedCount: 45, startDate: '2024-11-01', endDate: '2024-12-31', active: true },
];

export const mockBanners: Banner[] = [
  { id: 'b1', title: 'Mega Sale', subtitle: 'Up to 70% Off on Electronics', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop', link: '/category/electronics', position: 'hero', active: true },
  { id: 'b2', title: 'Fashion Week', subtitle: 'New Arrivals - Flat 40% Off', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop', link: '/category/fashion', position: 'hero', active: true },
  { id: 'b3', title: 'Home Makeover', subtitle: 'Transform Your Space', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop', link: '/category/home-living', position: 'hero', active: true },
];

export const cities = ['Islamabad', 'Karachi', 'Lahore', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'];
