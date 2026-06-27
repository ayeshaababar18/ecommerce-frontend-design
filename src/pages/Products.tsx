import { useState, useMemo, MouseEvent } from 'react';
import { LayoutGrid, List, Heart, ChevronDown, ChevronUp, Check, Star } from 'lucide-react';
import { PRODUCTS, BRANDS, FEATURES, CATEGORIES } from '../data';
import { Product, Filters } from '../types';

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
}

export default function Products({ onSelectProduct, selectedCategory, setSelectedCategory, searchQuery }: ProductsProps) {
  // Grid vs List mode state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Sort state
  const [sortOption, setSortOption] = useState<string>('featured');

  // Favorites / Wishlist state
  const [favorites, setFavorites] = useState<string[]>([]);
  const toggleFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Pagination state
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Active filters state
  const [filters, setFilters] = useState<Filters>({
    category: selectedCategory === 'All category' ? '' : selectedCategory,
    brand: [],
    features: [],
    minPrice: 0,
    maxPrice: 2000,
    condition: 'any',
    rating: null,
    searchQuery: searchQuery
  });

  // Keep filters.category in sync with selectedCategory from header search
  useMemo(() => {
    setFilters(prev => ({
      ...prev,
      category: selectedCategory === 'All category' ? '' : selectedCategory,
      searchQuery: searchQuery
    }));
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Handle price filtering fields
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');

  const applyPriceFilter = () => {
    setFilters(prev => ({
      ...prev,
      minPrice: minPriceInput === '' ? 0 : parseFloat(minPriceInput) || 0,
      maxPrice: maxPriceInput === '' ? 2000 : parseFloat(maxPriceInput) || 2000
    }));
    setCurrentPage(1);
  };

  // Toggle Brands checkbox
  const handleBrandToggle = (brandName: string) => {
    setFilters(prev => {
      const isSelected = prev.brand.includes(brandName);
      const updatedBrands = isSelected
        ? prev.brand.filter(b => b !== brandName)
        : [...prev.brand, brandName];
      return { ...prev, brand: updatedBrands };
    });
    setCurrentPage(1);
  };

  // Toggle Features checkbox
  const handleFeatureToggle = (featName: string) => {
    setFilters(prev => {
      const isSelected = prev.features.includes(featName);
      const updatedFeatures = isSelected
        ? prev.features.filter(f => f !== featName)
        : [...prev.features, featName];
      return { ...prev, features: updatedFeatures };
    });
    setCurrentPage(1);
  };

  // Clear single active filter
  const clearFilterTag = (type: 'category' | 'brand' | 'features' | 'condition' | 'rating' | 'all', value?: string) => {
    if (type === 'all') {
      setFilters({
        category: '',
        brand: [],
        features: [],
        minPrice: 0,
        maxPrice: 2000,
        condition: 'any',
        rating: null,
        searchQuery: ''
      });
      setSelectedCategory('All category');
      setMinPriceInput('');
      setMaxPriceInput('');
    } else if (type === 'category') {
      setFilters(prev => ({ ...prev, category: '' }));
      setSelectedCategory('All category');
    } else if (type === 'brand' && value) {
      setFilters(prev => ({ ...prev, brand: prev.brand.filter(b => b !== value) }));
    } else if (type === 'features' && value) {
      setFilters(prev => ({ ...prev, features: prev.features.filter(f => f !== value) }));
    } else if (type === 'condition') {
      setFilters(prev => ({ ...prev, condition: 'any' }));
    } else if (type === 'rating') {
      setFilters(prev => ({ ...prev, rating: null }));
    }
    setCurrentPage(1);
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (filters.category && prod.category !== filters.category) return false;
      
      // Brand filter
      if (filters.brand.length > 0 && !filters.brand.includes(prod.brand)) return false;

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every(f => prod.features.includes(f));
        if (!hasAllFeatures) return false;
      }

      // Price filter
      if (prod.price < filters.minPrice || prod.price > filters.maxPrice) return false;

      // Condition filter
      if (filters.condition !== 'any' && prod.condition !== filters.condition) return false;

      // Rating filter
      if (filters.rating && Math.floor(prod.rating) < filters.rating) return false;

      // Search query filter
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = prod.title.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') {
        return a.price - b.price;
      } else if (sortOption === 'price-high') {
        return b.price - a.price;
      } else if (sortOption === 'rating') {
        return b.rating - a.rating;
      } else {
        // 'featured' standard sorting (ordersCount)
        return b.ordersCount - a.ordersCount;
      }
    });
  }, [filters, sortOption]);

  // Paginated elements
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return (
    <div className="bg-[#F7FAFC] pb-16 font-sans" id="products-view-container">
      {/* Breadcrumbs */}
      <div className="bg-[#EFF2F4] border-b border-[#E3E8EE] py-3.5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-base text-[#8B96A5] flex items-center gap-3">
          <span className="hover:text-[#0D6EFD] cursor-pointer transition-colors">Home</span>
          <span className="text-[#8B96A5] text-sm">&gt;</span>
          <span className="hover:text-[#0D6EFD] cursor-pointer transition-colors">Clothings</span>
          <span className="text-[#8B96A5] text-sm">&gt;</span>
          <span className="hover:text-[#0D6EFD] cursor-pointer transition-colors">Men's wear</span>
          <span className="text-[#8B96A5] text-sm">&gt;</span>
          <span className="text-[#8B96A5] cursor-pointer">{filters.category || 'All Products'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 flex gap-6">
        {/* Left Filter Sidebar */}
        <aside className="w-64 shrink-0 hidden lg:block" id="filters-sidebar">
          <div className="border-t border-[#E3E8EE] divide-y divide-[#E3E8EE]">
            
            {/* Category Accordion */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Category</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <ul className="space-y-3 text-base text-[#505050]">
                <li>
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, category: '' }));
                      setSelectedCategory('All category');
                    }}
                    className={`text-left hover:text-[#0D6EFD] transition-colors ${!filters.category ? 'font-medium text-[#1C1C1C]' : ''}`}
                  >
                    All categories
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, category: cat }));
                        setSelectedCategory(cat);
                      }}
                      className={`text-left hover:text-[#0D6EFD] transition-colors ${filters.category === cat ? 'font-medium text-[#1C1C1C]' : ''}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Filter */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Brands</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <div className="space-y-3">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center gap-3 text-base text-[#505050] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filters.brand.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-5 h-5 border-[#E3E8EE] rounded-md text-[#0D6EFD] focus:ring-[#0D6EFD]"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features Accordion */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Features</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <div className="space-y-3">
                {FEATURES.map(feat => (
                  <label key={feat} className="flex items-center gap-3 text-base text-[#505050] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feat)}
                      onChange={() => handleFeatureToggle(feat)}
                      className="w-5 h-5 border-[#E3E8EE] rounded-md text-[#0D6EFD] focus:ring-[#0D6EFD]"
                    />
                    <span>{feat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Price range</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm text-[#8B96A5] mb-1 block">Min</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      className="w-full border border-[#E3E8EE] rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD]"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-[#8B96A5] mb-1 block">Max</label>
                    <input
                      type="number"
                      placeholder="9999"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      className="w-full border border-[#E3E8EE] rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD]"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={applyPriceFilter}
                  className="w-full bg-white border border-[#E3E8EE] hover:bg-slate-50 text-[#0D6EFD] font-semibold py-2 rounded-md transition-colors shadow-xs"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Condition Accordion */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Condition</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <div className="space-y-3">
                {[
                  { value: 'any', label: 'Any condition' },
                  { value: 'refurbished', label: 'Refurbished' },
                  { value: 'new', label: 'Brand new' },
                  { value: 'old', label: 'Old items' }
                ].map((cond) => (
                  <label key={cond.value} className="flex items-center gap-3 text-base text-[#505050] cursor-pointer select-none">
                    <input
                      type="radio"
                      name="condition"
                      checked={filters.condition === cond.value}
                      onChange={() => {
                        setFilters(prev => ({ ...prev, condition: cond.value }));
                        setCurrentPage(1);
                      }}
                      className="w-5 h-5 text-[#0D6EFD] focus:ring-[#0D6EFD] border-[#E3E8EE]"
                    />
                    <span>{cond.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ratings Filter */}
            <div className="py-4">
              <h3 className="font-semibold text-[#1C1C1C] text-base mb-3 flex justify-between items-center">
                <span>Ratings</span>
                <ChevronUp className="w-4 h-4 text-[#8B96A5]" />
              </h3>
              <div className="space-y-3">
                {[5, 4, 3, 2].map((stars) => (
                  <label key={stars} className="flex items-center gap-3 text-base text-[#505050] cursor-pointer select-none">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === stars}
                      onChange={() => {
                        setFilters(prev => ({ ...prev, rating: stars }));
                        setCurrentPage(1);
                      }}
                      className="w-5 h-5 text-[#0D6EFD] focus:ring-[#0D6EFD] border-[#E3E8EE]"
                    />
                    <div className="flex items-center text-[#FF9017] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 fill-current ${i < stars ? '' : 'text-[#E3E8EE]'}`} />
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Listing Panel */}
        <main className="flex-1" id="listing-main-content">
          {/* Top Controls Row */}
          <div className="bg-white border border-[#E3E8EE] rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="text-base text-[#1C1C1C]">
              <span className="font-semibold">{filteredProducts.length}</span> items in{' '}
              <span className="font-semibold text-[#1C1C1C]">{filters.category || 'All Categories'}</span>
            </div>

            {/* Grid/List, Sorting */}
            <div className="flex items-center gap-4 self-end md:self-auto">
              {/* Sort selector */}
              <div className="flex items-center gap-2 text-base text-[#1C1C1C]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-[#E3E8EE] rounded-md px-3 py-2 bg-white text-[#1C1C1C] focus:outline-none font-medium"
                >
                  <option value="featured">Featured (orders)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Layout Switch Button */}
              <div className="border border-[#E3E8EE] rounded-md flex overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 focus:outline-none transition-colors ${viewMode === 'grid' ? 'bg-[#EFF2F4] text-[#8B96A5]' : 'bg-white text-[#1C1C1C] hover:bg-slate-50'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 border-l border-[#E3E8EE] focus:outline-none transition-colors ${viewMode === 'list' ? 'bg-[#EFF2F4] text-[#8B96A5]' : 'bg-white text-[#1C1C1C] hover:bg-slate-50'}`}
                  title="List Row View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Row */}
          {(filters.category || filters.brand.length > 0 || filters.features.length > 0 || filters.condition !== 'any' || filters.rating || filters.searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-5" id="active-tags-container">
              {filters.category && (
                <span className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Category: {filters.category}
                  <button onClick={() => clearFilterTag('category')} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors"><Check className="w-4 h-4 opacity-0 hidden" />×</button>
                </span>
              )}
              {filters.searchQuery && (
                <span className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Search: "{filters.searchQuery}"
                  <button onClick={() => clearFilterTag('all')} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors">×</button>
                </span>
              )}
              {filters.brand.map(b => (
                <span key={b} className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Brand: {b}
                  <button onClick={() => clearFilterTag('brand', b)} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors">×</button>
                </span>
              ))}
              {filters.features.map(f => (
                <span key={f} className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Feature: {f}
                  <button onClick={() => clearFilterTag('features', f)} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors">×</button>
                </span>
              ))}
              {filters.condition !== 'any' && (
                <span className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Condition: {filters.condition}
                  <button onClick={() => clearFilterTag('condition')} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors">×</button>
                </span>
              )}
              {filters.rating && (
                <span className="bg-white border border-[#0D6EFD] text-[#505050] text-sm font-medium px-2 py-1 rounded-md flex items-center gap-2 shadow-xs">
                  Rating: {filters.rating}★ +
                  <button onClick={() => clearFilterTag('rating')} className="text-[#8B96A5] hover:text-[#0D6EFD] transition-colors">×</button>
                </span>
              )}
              <button
                type="button"
                onClick={() => clearFilterTag('all')}
                className="text-[#0D6EFD] hover:underline text-sm font-medium ml-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Products Render */}
          {paginatedProducts.length === 0 ? (
            <div className="bg-white border border-[#E3E8EE] rounded-lg p-12 text-center" id="no-products-alert">
              <span className="text-4xl">🔍</span>
              <h3 className="text-[#1C1C1C] font-bold text-lg mt-3">No matching products found</h3>
              <p className="text-[#8B96A5] text-base mt-1 max-w-sm mx-auto">Try adjusting your filters or expanding your search queries to see more selection.</p>
              <button
                onClick={() => clearFilterTag('all')}
                className="bg-[#0D6EFD] hover:bg-blue-700 text-white font-semibold text-base px-6 py-2.5 rounded-md mt-5 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            /* GRID VIEW */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" id="products-grid-view">
              {paginatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="h-[200px] w-full flex items-center justify-center p-4 border-b border-[#E3E8EE]">
                      <img 
                        src={prod.image} 
                        alt={prod.title} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform mix-blend-multiply"
                      />
                    </div>

                    {/* Meta info */}
                    <div className="p-4 pt-3 pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[#1C1C1C] font-bold text-lg">${prod.price.toFixed(2)}</span>
                          {prod.originalPrice && (
                            <span className="text-[#8B96A5] text-sm line-through font-semibold">${prod.originalPrice.toFixed(2)}</span>
                          )}
                        </div>
                        {/* Heart button */}
                        <button
                          onClick={(e) => toggleFavorite(prod.id, e)}
                          className="bg-white hover:bg-blue-50 border border-[#E3E8EE] rounded-md w-9 h-9 flex items-center justify-center text-[#0D6EFD] transition-colors z-10 focus:outline-none"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(prod.id) ? 'fill-[#0D6EFD] text-[#0D6EFD]' : ''}`} />
                        </button>
                      </div>

                      {/* Ratings stars */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center text-[#FF9017] gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 fill-current ${i < Math.floor(prod.rating) ? '' : 'text-[#E3E8EE]'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[#FF9017] font-semibold text-sm">{prod.rating}</span>
                      </div>

                      <h3 className="text-[#505050] text-base font-normal line-clamp-2 leading-relaxed group-hover:text-[#0D6EFD] transition-colors mb-2">
                        {prod.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* LIST ROW VIEW */
            <div className="space-y-4" id="products-list-view">
              {paginatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white border border-[#E3E8EE] rounded-lg p-4 flex flex-col md:flex-row gap-4 cursor-pointer hover:shadow-md transition-shadow relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-48 shrink-0 flex items-center justify-center">
                    <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Descriptions columns */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-[#1C1C1C] group-hover:text-[#0D6EFD] font-medium text-base leading-snug mb-2 pr-10 transition-colors">
                        {prod.title}
                      </h3>
                      
                      {/* Pricing block */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[#1C1C1C] font-bold text-xl">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <span className="text-[#8B96A5] text-base line-through font-semibold">${prod.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {/* Stars & counts */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center text-[#FF9017] gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 fill-current ${i < Math.floor(prod.rating) ? '' : 'text-[#E3E8EE]'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-[#FF9017] font-semibold text-sm">{prod.rating}</span>
                        <span className="text-[#E3E8EE]">•</span>
                        <span className="text-sm text-[#8B96A5]">{prod.ordersCount} orders</span>
                        <span className="text-[#E3E8EE]">•</span>
                        <span className="text-sm text-[#00B517] font-medium">Free Shipping</span>
                      </div>

                      {/* Brief text description */}
                      <p className="text-[#505050] text-sm leading-relaxed mb-4 max-w-3xl">
                        {prod.description}
                      </p>
                      
                      <span className="text-[#0D6EFD] group-hover:underline text-sm font-medium">
                        View details
                      </span>
                    </div>
                  </div>
                  
                  {/* Heart button */}
                  <button
                    onClick={(e) => toggleFavorite(prod.id, e)}
                    className="absolute top-4 right-4 bg-white border border-[#E3E8EE] hover:bg-slate-50 rounded-md w-10 h-10 flex items-center justify-center text-[#0D6EFD] transition-colors shadow-xs z-10"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(prod.id) ? 'fill-[#0D6EFD] text-[#0D6EFD]' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Pagination Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-end gap-4">
            <div className="flex items-center gap-2 text-sm text-[#1C1C1C]">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value) || 10);
                  setCurrentPage(1);
                }}
                className="border border-[#E3E8EE] rounded-md px-3 py-2 bg-white text-[#1C1C1C] focus:outline-none text-base font-medium"
              >
                <option value={10}>Show 10</option>
                <option value={6}>Show 6</option>
                <option value={15}>Show 15</option>
              </select>
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center border border-[#E3E8EE] rounded-md overflow-hidden bg-white shadow-xs" id="pagination-controls">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 border-r border-[#E3E8EE] text-sm font-semibold text-[#1C1C1C] hover:bg-slate-50 disabled:opacity-40 focus:outline-none transition-colors"
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, idx) => {
                const pNo = idx + 1;
                return (
                  <button
                    key={pNo}
                    type="button"
                    onClick={() => setCurrentPage(pNo)}
                    className={`px-4 py-2 border-r border-[#E3E8EE] text-sm font-semibold focus:outline-none transition-colors ${
                      currentPage === pNo ? 'bg-[#EFF2F4] text-[#8B96A5]' : 'text-[#1C1C1C] hover:bg-slate-50'
                    }`}
                  >
                    {pNo}
                  </button>
                );
              })}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="px-4 py-2 text-sm font-semibold text-[#1C1C1C] hover:bg-slate-50 disabled:opacity-40 focus:outline-none transition-colors"
              >
                &gt;
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
