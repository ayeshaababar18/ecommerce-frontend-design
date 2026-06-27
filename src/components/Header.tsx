import { useState, FormEvent } from 'react';
import { Search, User, MessageSquare, Heart, ShoppingCart, Menu, ChevronDown, Globe2, Truck } from 'lucide-react';
import { CATEGORIES } from '../data';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cart: CartItem[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onSearch: (query: string, category: string) => void;
}

export default function Header({
  currentView,
  setCurrentView,
  cart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onSearch,
}: HeaderProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, selectedCategory);
  };

  return (
    <header className="bg-white border-b border-[#E3E8EE] sticky top-0 z-50 font-sans" id="main-header">
      {/* Top Bar: Logo, Search, Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3 md:gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer select-none shrink-0"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All category');
                setCurrentView('home');
              }}
              id="header-logo-container"
            >
              <div className="bg-[#0D6EFD] text-white p-2 rounded-md flex items-center justify-center">
                <ShoppingCart className="w-6 h-6" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-[#8CB7F5] tracking-tight ml-1" style={{ color: '#8CB7F5' }}>
                <span className="text-[#0D6EFD]">Brand</span>
              </span>
            </div>
          </div>
          
          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden shrink-0">
            <button className="text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors focus:outline-none">
              <User className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCurrentView('cart')}
              className="relative text-[#1C1C1C] hover:text-[#0D6EFD] transition-colors focus:outline-none"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar with Category Selector */}
        <form 
          onSubmit={handleSearchSubmit}
          className="w-full md:flex-1 max-w-[660px] flex border-2 border-[#0D6EFD] rounded-lg overflow-hidden h-10"
          id="header-search-form"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-2 text-[#1C1C1C] focus:outline-none placeholder-gray-400 text-sm"
          />
          
          <div className="relative border-l border-[#0D6EFD] bg-white flex items-center shrink-0">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="px-3 py-2 w-36 text-sm text-[#1C1C1C] flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="truncate">{selectedCategory}</span>
              <ChevronDown className="w-4 h-4 text-[#8B96A5] ml-1 shrink-0" />
            </button>
            {isCategoryOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-[#E3E8EE] rounded-lg shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All category');
                    setIsCategoryOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#1C1C1C]"
                >
                  All category
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsCategoryOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-[#1C1C1C]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#0D6EFD] hover:bg-blue-700 text-white px-6 font-medium transition-colors text-sm"
          >
            Search
          </button>
        </form>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-6 shrink-0" id="header-actions">
          {/* Profile */}
          <div className="relative group">
            <button 
              className="flex flex-col items-center gap-1 text-[#8B96A5] hover:text-[#0D6EFD] transition-colors focus:outline-none"
            >
              <User className="w-5 h-5 text-[#8B96A5] group-hover:text-[#0D6EFD]" />
              <span className="text-xs font-normal">Profile</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#E3E8EE] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-3 border-b border-[#E3E8EE]">
                <p className="text-sm font-semibold text-[#1C1C1C]">Welcome back!</p>
              </div>
              <div className="py-2">
                <button onClick={() => alert('Sign in functionality coming soon!')} className="w-full text-left px-4 py-2 text-sm text-[#505050] hover:bg-slate-50 hover:text-[#0D6EFD] transition-colors">Sign In</button>
                <button onClick={() => alert('Registration functionality coming soon!')} className="w-full text-left px-4 py-2 text-sm text-[#505050] hover:bg-slate-50 hover:text-[#0D6EFD] transition-colors">Register</button>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="relative group">
            <button className="flex flex-col items-center gap-1 text-[#8B96A5] hover:text-[#0D6EFD] transition-colors focus:outline-none">
              <MessageSquare className="w-5 h-5 text-[#8B96A5] group-hover:text-[#0D6EFD]" />
              <span className="text-xs font-normal">Message</span>
            </button>
            <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#E3E8EE] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <div className="p-3 border-b border-[#E3E8EE] flex justify-between items-center">
                <p className="text-sm font-semibold text-[#1C1C1C]">Messages</p>
                <span className="text-xs bg-[#0D6EFD] text-white px-2 py-0.5 rounded-full">0 New</span>
              </div>
              <div className="p-4 text-center">
                <p className="text-sm text-[#8B96A5]">You have no new messages.</p>
              </div>
            </div>
          </div>

          {/* Orders */}
          <button 
            onClick={() => setCurrentView('products')} 
            className="flex flex-col items-center gap-1 text-[#8B96A5] hover:text-[#0D6EFD] transition-colors focus:outline-none"
          >
            <Heart className="w-5 h-5 text-[#8B96A5]" />
            <span className="text-xs font-normal">Orders</span>
          </button>

          {/* My Cart */}
          <button 
            onClick={() => setCurrentView('cart')}
            className="flex flex-col items-center gap-1 text-[#8B96A5] hover:text-[#0D6EFD] relative transition-colors focus:outline-none"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-[#8B96A5]" />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="text-xs font-normal">My cart</span>
          </button>
        </div>
      </div>

      {/* Sub Bar: Categories dropdown, links, ship to info */}
      <div className="hidden lg:block border-t border-[#E3E8EE] bg-white py-3" id="header-sub-bar">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-sm text-[#1C1C1C] font-medium">
          <div className="flex items-center gap-6">
            {/* Category Dropdown Toggle */}
            <button 
              onClick={() => setCurrentView('products')}
              className="flex items-center gap-2 hover:text-[#0D6EFD] transition-colors focus:outline-none"
            >
              <Menu className="w-5 h-5" />
              <span>All category</span>
            </button>

            <button onClick={() => setCurrentView('home')} className="hover:text-[#0D6EFD] transition-colors">Hot offers</button>
            <button onClick={() => setCurrentView('products')} className="hover:text-[#0D6EFD] transition-colors">Gift boxes</button>
            <button onClick={() => setCurrentView('products')} className="hover:text-[#0D6EFD] transition-colors">Projects</button>
            <button onClick={() => setCurrentView('products')} className="hover:text-[#0D6EFD] transition-colors">Menu item</button>
            
            <div className="relative group">
              <button className="hover:text-[#0D6EFD] transition-colors flex items-center gap-1 focus:outline-none">
                <span>Help</span>
                <ChevronDown className="w-4 h-4 text-[#8B96A5]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[#1C1C1C]">
            {/* Currency selector */}
            <div className="flex items-center gap-1.5 hover:text-[#0D6EFD] cursor-pointer transition-colors">
              <span>English, USD</span>
              <ChevronDown className="w-4 h-4 text-[#8B96A5]" />
            </div>

            <div className="w-px h-4 bg-[#E3E8EE]"></div>

            {/* Ship to selector */}
            <div className="flex items-center gap-1.5 hover:text-[#0D6EFD] cursor-pointer transition-colors">
              <span>Ship to</span>
              <span className="text-base leading-none rounded-sm overflow-hidden inline-flex">🇩🇪</span>
              <ChevronDown className="w-4 h-4 text-[#8B96A5]" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-[#E3E8EE] shadow-lg max-h-[80vh] overflow-y-auto z-50">
          <div className="p-4 space-y-4">
            <div className="border-b border-[#E3E8EE] pb-4">
              <h4 className="text-sm font-semibold text-[#1C1C1C] mb-2">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => {
                      setCurrentView('products');
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-[#505050] text-sm hover:text-[#0D6EFD]"
                  >
                    All category
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat);
                        setCurrentView('products');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-[#505050] text-sm hover:text-[#0D6EFD]"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b border-[#E3E8EE] pb-4">
              <h4 className="text-sm font-semibold text-[#1C1C1C] mb-2">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="text-[#505050] text-sm hover:text-[#0D6EFD]">Hot offers</button></li>
                <li><button onClick={() => { setCurrentView('products'); setIsMobileMenuOpen(false); }} className="text-[#505050] text-sm hover:text-[#0D6EFD]">Gift boxes</button></li>
                <li><button onClick={() => { setCurrentView('products'); setIsMobileMenuOpen(false); }} className="text-[#505050] text-sm hover:text-[#0D6EFD]">Projects</button></li>
                <li><button onClick={() => { setCurrentView('products'); setIsMobileMenuOpen(false); }} className="text-[#505050] text-sm hover:text-[#0D6EFD]">Menu item</button></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li><button className="flex items-center gap-2 text-[#505050] text-sm hover:text-[#0D6EFD]"><Globe2 className="w-4 h-4" /> English, USD</button></li>
                <li><button className="flex items-center gap-2 text-[#505050] text-sm hover:text-[#0D6EFD]"><Truck className="w-4 h-4" /> Ship to 🇩🇪</button></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
