export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  description: string;
  longDescription?: string;
  specs: Record<string, string>;
  features: string[];
  brand: string;
  condition: 'any' | 'refurbished' | 'new' | 'old';
  verified: boolean;
  isPromo?: boolean;
  promoDiscount?: string;
  shipping?: string;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Filters {
  category: string;
  brand: string[];
  features: string[];
  minPrice: number;
  maxPrice: number;
  condition: string;
  rating: number | null;
  searchQuery: string;
}

export interface Supplier {
  name: string;
  country: string;
  verified: boolean;
  shipping: boolean;
}
