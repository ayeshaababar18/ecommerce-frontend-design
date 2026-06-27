import { Product } from './types';

export const CATEGORIES = [
  'Automobiles',
  'Clothes and wear',
  'Home interiors',
  'Computer and tech',
  'Tools, equipments',
  'Sports and outdoor',
  'Animal and pets',
  'Machinery tools',
  'More category'
];

export const BRANDS = [
  'Samsung',
  'Apple',
  'Huawei',
  'Pocco',
  'Lenovo',
  'Canon',
  'GoPro',
  'Xiaomi'
];

export const FEATURES = [
  'Metallic',
  'Plastic cover',
  '8GB RAM',
  'Super power',
  'Large Memory'
];

export const REGIONS = [
  { name: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪' },
  { name: 'Australia', domain: 'shopname.au', flag: '🇦🇺' },
  { name: 'United States', domain: 'shopname.us', flag: '🇺🇸' },
  { name: 'Russia', domain: 'shopname.ru', flag: '🇷🇺' },
  { name: 'Italy', domain: 'shopname.it', flag: '🇮🇹' },
  { name: 'Denmark', domain: 'shopname.dk', flag: '🇩🇰' },
  { name: 'France', domain: 'shopname.fr', flag: '🇫🇷' },
  { name: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪' },
  { name: 'China', domain: 'shopname.ae', flag: '🇨🇳' },
  { name: 'Great Britain', domain: 'shopname.co.uk', flag: '🇬🇧' }
];

export const EXTRA_SERVICES = [
  {
    id: 's1',
    title: 'Source from Industry Hubs',
    desc: 'Connect with verified manufacturers in high-efficiency hubs.',
    icon: 'industry',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 's2',
    title: 'Customize Your Products',
    desc: 'Request tailored designs, branding, and packaging options.',
    icon: 'customize',
    bgImage: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 's3',
    title: 'Fast, reliable shipping by ocean or air',
    desc: 'Consolidated logistics solutions with door-to-door tracking.',
    icon: 'shipping',
    bgImage: 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: 's4',
    title: 'Product monitoring and inspection',
    desc: 'Verify quality and specifications before items leave the factory.',
    icon: 'inspection',
    bgImage: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=400&auto=format&fit=crop&q=60'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle',
    price: 98.00,
    originalPrice: 128.00,
    rating: 4.5,
    reviewsCount: 32,
    ordersCount: 154,
    category: 'Clothes and wear',
    subcategory: 'Summer clothing',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    longDescription: 'This premium Men\'s long sleeve activewear represents the height of modern ergonomic apparel. Crafted from ultra-soft long-staple cotton combined with flexible elastane, it follows the natural contours of your muscle structure while delivering excellent thermal regulation and moisture-wicking capability.',
    specs: {
      'Model': '#8786867',
      'Style': 'Classic style',
      'Certificate': 'ISO-898921212',
      'Size': '34mm x 450mm x 19mm',
      'Memory': '36GB RAM'
    },
    features: ['Metallic', 'Plastic cover'],
    brand: 'Samsung', // Let's match a filterable brand
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: ['Off-white', 'Navy Blue', 'Charcoal', 'Heather Grey']
  },
  {
    id: '2',
    title: 'GoPro HERO6 4K Action Camera - Black Edition',
    price: 998.00,
    originalPrice: 1128.00,
    rating: 4.8,
    reviewsCount: 154,
    ordersCount: 380,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Capture stunning ultra HD 4K60 video and high-resolution 12MP photos with the powerful GoPro HERO6 Black action camera. Features advanced electronic image stabilization, a rugged waterproof chassis up to 33ft (10m) without a housing, and a 2-inch touch display for quick playback and framing.',
    longDescription: 'With its next-generation GP1 chip, HERO6 Black delivers 2x the performance of HERO5. Experience crystal-clear, incredibly smooth video, and transfer footage to your phone over ultra-fast 5GHz Wi-Fi. Ideal for adventurous filmmakers and creators.',
    specs: {
      'Model': 'GoPro Hero 6 Black',
      'Style': 'Sport Action',
      'Certificate': 'FCC-GOPRO6',
      'Resolution': '4K at 60fps',
      'Sensor': '12 Megapixel'
    },
    features: ['Metallic', 'Super power', 'Large Memory'],
    brand: 'GoPro',
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping',
    sizes: ['Standard Pack', 'Travel Kit', 'Ultimate Bundle']
  },
  {
    id: '3',
    title: 'Canon Camera EOS 200D DSLR, Black 10x Zoom Lens Kit',
    price: 998.00,
    originalPrice: 1128.00,
    rating: 4.7,
    reviewsCount: 112,
    ordersCount: 240,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1519638396437-ea5c23455928?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519638396437-ea5c23455928?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'The world\'s lightest DSLR with a Vari-angle screen, the EOS 200D is an elegant companion for travel, portraits, and street photography. Equipped with an advanced 24.2 Megapixel sensor, Dual Pixel CMOS autofocus, and high-speed shooting.',
    specs: {
      'Model': 'EOS 200D',
      'Style': 'DSLR Camera',
      'Resolution': '24.2 MP',
      'Lens Type': '18-55mm IS STM'
    },
    features: ['Metallic', 'Plastic cover'],
    brand: 'Canon',
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping'
  },
  {
    id: '4',
    title: 'Apple Watch Series Space Gray Aluminum Case with Sport Band',
    price: 998.00,
    originalPrice: 1128.00,
    rating: 4.9,
    reviewsCount: 254,
    ordersCount: 890,
    category: 'Computer and tech',
    subcategory: 'Smartwatches',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Track your workouts, check heart rates, control your calendar, and stream your favorite playlists with this sleek, highly connected smartwatch featuring an Always-On Retina display.',
    specs: {
      'Model': 'Series Watch',
      'Style': 'Sportive Smartwatch',
      'Material': 'Aluminum & Silicon'
    },
    features: ['Metallic', '8GB RAM', 'Super power', 'Large Memory'],
    brand: 'Apple',
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping',
    sizes: ['41mm', '45mm']
  },
  {
    id: '5',
    title: 'Xiaomi Redmi 8 Original Smartphone - Dual Sim, Blue',
    price: 99.50,
    originalPrice: 128.00,
    rating: 4.3,
    reviewsCount: 84,
    ordersCount: 420,
    category: 'Computer and tech',
    subcategory: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'The Redmi 8 comes with a high-capacity 5000mAh battery, custom 12MP AI dual camera, and high-performance Snapdragon processor paired with a beautiful 6.22" Dot Notch Display.',
    specs: {
      'Model': 'Redmi 8',
      'Style': 'Smartphone',
      'Battery': '5000 mAh'
    },
    features: ['Plastic cover', '8GB RAM', 'Large Memory'],
    brand: 'Xiaomi',
    condition: 'refurbished',
    verified: false,
    shipping: 'Standard Shipping'
  },
  {
    id: '6',
    title: 'Wireless Gaming Over-Ear Headphones with Active Mic',
    price: 8.99,
    originalPrice: 15.99,
    rating: 4.4,
    reviewsCount: 310,
    ordersCount: 1100,
    category: 'Computer and tech',
    subcategory: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Immersive surround sound, high-sensitivity microphone, comfortable memory foam ear cushions, and reliable low-latency Bluetooth connectivity for all-day gaming comfort.',
    specs: {
      'Model': 'G-Heads 90',
      'Style': 'Gaming Over-ear',
      'Battery Life': '30 hrs'
    },
    features: ['Plastic cover', 'Super power'],
    brand: 'Pocco',
    condition: 'new',
    verified: true,
    shipping: 'Standard Shipping'
  },
  {
    id: '7',
    title: 'Premium Ergonomic Soft Leather Single Sofa Armchair',
    price: 10.30,
    originalPrice: 19.99,
    rating: 4.6,
    reviewsCount: 12,
    ordersCount: 45,
    category: 'Home interiors',
    subcategory: 'Sofa & chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Bring clean lines and luxurious comfort to your living room or study. Upholstered in selected soft grain leather with solid oak legs and premium high-density memory foam padding.',
    specs: {
      'Model': 'Sofa-Chair-Lux',
      'Material': 'Leather & Oak Wood',
      'Weight Capacity': '150 kg'
    },
    features: ['Metallic'],
    brand: 'Samsung',
    condition: 'new',
    verified: true,
    shipping: 'Custom Logistics'
  },
  {
    id: '8',
    title: 'Professional Desktop Stand Mixer & Dough Blender',
    price: 10.30,
    originalPrice: 18.00,
    rating: 4.5,
    reviewsCount: 38,
    ordersCount: 190,
    category: 'Home interiors',
    subcategory: 'Kitchen appliances',
    image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'The ideal solution for effortless baking, dough kneading, and whipping. Powered by a high-torque 1000W motor with 6 variable speed settings and a solid 5L stainless steel bowl.',
    specs: {
      'Model': 'MixMaster 5000',
      'Power': '1000 Watts',
      'Bowl Capacity': '5 Liters'
    },
    features: ['Metallic', 'Super power'],
    brand: 'Lenovo',
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping'
  },
  {
    id: '9',
    title: 'Genuine Leather Travel Wallet & Card Holder Bag',
    price: 34.00,
    originalPrice: 45.00,
    rating: 4.2,
    reviewsCount: 42,
    ordersCount: 220,
    category: 'Clothes and wear',
    subcategory: 'Bags & Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Compact, handmade, and highly secure wallet containing dedicated compartments for up to 8 credit cards, boarding passes, currency notes, and dual zippered coin pockets.',
    specs: {
      'Model': 'Travel-Zip-X',
      'Material': 'Full-grain Leather',
      'RFID Block': 'Yes'
    },
    features: ['Plastic cover'],
    brand: 'Huawei',
    condition: 'new',
    verified: false,
    shipping: 'Standard Shipping'
  },
  {
    id: '10',
    title: 'Double-Walled Electric Stainless Steel Boiling Kettle',
    price: 80.95,
    originalPrice: 99.00,
    rating: 4.6,
    reviewsCount: 95,
    ordersCount: 410,
    category: 'Home interiors',
    subcategory: 'Kitchen appliances',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80'
    ],
    description: 'Boil water with maximum security and thermal retention. Features a premium seamless double-walled interior, auto shutoff, dry-boil safety protection, and a sleek modern matte-black exterior.',
    specs: {
      'Model': 'Kettle-Pro-200',
      'Capacity': '1.7 Liters',
      'Power': '1500W'
    },
    features: ['Metallic', 'Super power'],
    brand: 'Samsung',
    condition: 'new',
    verified: true,
    shipping: 'Free Shipping'
  }
];

export const DEALS_PRODUCTS = [
  {
    id: 'd1',
    title: 'Smart watches',
    discount: '-25%',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200&auto=format&fit=crop&q=60',
    price: 15.00
  },
  {
    id: 'd2',
    title: 'Laptops',
    discount: '-15%',
    image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=200&auto=format&fit=crop&q=60',
    price: 340.00
  },
  {
    id: 'd3',
    title: 'GoPro cameras',
    discount: '-40%',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&auto=format&fit=crop&q=60',
    price: 39.00
  },
  {
    id: 'd4',
    title: 'Headphones',
    discount: '-25%',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60',
    price: 10.00
  },
  {
    id: 'd5',
    title: 'Canon cameras',
    discount: '-25%',
    image: 'https://images.unsplash.com/photo-1519638396437-ea5c23455928?w=200&auto=format&fit=crop&q=60',
    price: 240.00
  }
];

export const HOME_AND_OUTDOOR_ITEMS = [
  { id: 'ho1', title: 'Soft chairs', price: 16, image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho2', title: 'Sofa & chair', price: 18, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho3', title: 'Kitchen dishes', price: 19, image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho4', title: 'Smart watches', price: 18, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho5', title: 'Kitchen mixer', price: 100, image: 'https://images.unsplash.com/photo-1578643463396-0997cb5328c1?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho6', title: 'Blenders', price: 39, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho7', title: 'Home appliance', price: 19, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60' },
  { id: 'ho8', title: 'Coffee maker', price: 10, image: 'https://images.unsplash.com/photo-1517686469429-8faf88b9f7af?w=150&auto=format&fit=crop&q=60' }
];

export const ELECTRONICS_ITEMS = [
  { id: 'el1', title: 'Smart watches', price: 19, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=150&auto=format&fit=crop&q=60' },
  { id: 'el2', title: 'Cameras', price: 89, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=60' },
  { id: 'el3', title: 'Headphones', price: 10, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=60' },
  { id: 'el4', title: 'Smart watches', price: 80, image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=150&auto=format&fit=crop&q=60' },
  { id: 'el5', title: 'Gaming set', price: 35, image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=150&auto=format&fit=crop&q=60' },
  { id: 'el6', title: 'Laptops & PC', price: 340, image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=150&auto=format&fit=crop&q=60' },
  { id: 'el7', title: 'Smartphones', price: 19, image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=150&auto=format&fit=crop&q=60' },
  { id: 'el8', title: 'Electric kettle', price: 240, image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=150&auto=format&fit=crop&q=60' }
];

export const SAVED_FOR_LATER_ITEMS: Product[] = [
  {
    id: 'sfl1',
    title: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    rating: 4.8,
    reviewsCount: 30,
    ordersCount: 50,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop&q=60'],
    description: 'Camera - Black Edition',
    specs: {},
    features: [],
    brand: 'GoPro',
    condition: 'new',
    verified: true
  },
  {
    id: 'sfl2',
    title: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    rating: 4.8,
    reviewsCount: 30,
    ordersCount: 50,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=60'],
    description: 'Camera - Black Edition',
    specs: {},
    features: [],
    brand: 'GoPro',
    condition: 'new',
    verified: true
  },
  {
    id: 'sfl3',
    title: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    rating: 4.8,
    reviewsCount: 30,
    ordersCount: 50,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=60'],
    description: 'Camera - Black Edition',
    specs: {},
    features: [],
    brand: 'GoPro',
    condition: 'new',
    verified: true
  },
  {
    id: 'sfl4',
    title: 'GoPro HERO6 4K Action Camera - Black',
    price: 99.50,
    rating: 4.8,
    reviewsCount: 30,
    ordersCount: 50,
    category: 'Computer and tech',
    subcategory: 'Cameras',
    image: 'https://images.unsplash.com/photo-1496181130204-755241524eab?w=400&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1496181130204-755241524eab?w=400&auto=format&fit=crop&q=60'],
    description: 'Camera - Black Edition',
    specs: {},
    features: [],
    brand: 'GoPro',
    condition: 'new',
    verified: true
  }
];
