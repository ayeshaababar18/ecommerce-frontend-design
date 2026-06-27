import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Detail from './pages/Detail';
import Cart from './pages/Cart';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

export default function App() {
  // App views: 'home' | 'products' | 'detail' | 'cart'
  const [currentView, setCurrentView] = useState<string>('home');
  
  // Selected product for Detail page
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state stored in localStorage for persistence!
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('brand_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Keep localStorage in sync with Cart state
  useEffect(() => {
    localStorage.setItem('brand_cart', JSON.stringify(cart));
  }, [cart]);

  // Header search & category filter query parameters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All category');

  // Triggered when clicking search in header
  const handleSearchSubmit = (query: string, category: string) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setCurrentView('products');
  };

  // Navigating directly to a selected category from the Home page
  const handleNavigateToCategory = (category: string) => {
    setSearchQuery('');
    setSelectedCategory(category);
    setCurrentView('products');
  };

  // Select a product to view on Details screen
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  // Add items to standard cart
  const handleAddToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    setCart((prevCart) => {
      // Check if product with same size/color already exists
      const existingIndex = prevCart.findIndex(
        (item) => 
          item.product.id === product.id && 
          item.selectedSize === size && 
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity, selectedSize: size, selectedColor: color }];
      }
    });
  };

  // Update item quantity directly in the Cart page
  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCart((prevCart) => 
      prevCart.map((item) => 
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove individual item from cart
  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Empty the cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Always scroll to top when changing screens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#505050] flex flex-col justify-between" id="app-root-layout">
      {/* Dynamic Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cart={cart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={handleSearchSubmit}
      />

      {/* Main Screen Router Body */}
      <main className="flex-1">
        {currentView === 'home' && (
          <Home
            onSelectProduct={handleSelectProduct}
            onNavigateToCategory={handleNavigateToCategory}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'products' && (
          <Products
            onSelectProduct={handleSelectProduct}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
          />
        )}

        {currentView === 'detail' && selectedProduct && (
          <Detail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBack={() => {
              // Return to products page if search is active or list, else home
              setCurrentView('products');
            }}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onAddToCart={handleAddToCart}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
}
