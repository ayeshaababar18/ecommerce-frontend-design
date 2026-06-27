import { useState, useEffect } from 'react';
import { Star, Shield, ArrowLeft, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS } from '../data';

interface DetailProps {
  product: Product;
  onAddToCart: (product: Product, qty: number, size?: string, color?: string) => void;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
}

export default function Detail({ product, onAddToCart, onBack, onSelectProduct }: DetailProps) {
  // Gallery active image
  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Synchronize active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setActiveTab('description');
    setQuantity(1);
    setSelectedSize(product.sizes?.[0] || '');
    setSelectedColor(product.colors?.[0] || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Size/Color options
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '');

  // Quantity counter
  const [quantity, setQuantity] = useState<number>(1);

  // Tabs state
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping' | 'seller'>('description');

  // Success alert states
  const [addSuccess, setAddSuccess] = useState<boolean>(false);
  const [wishlistSuccess, setWishlistSuccess] = useState<boolean>(false);
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  // Get related products (same category, excluding current)
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 6);

  // Get "You may like" side panel list (different categories or items)
  const mayLikeProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 5);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setAddSuccess(true);
    setTimeout(() => {
      setAddSuccess(false);
    }, 3000);
  };

  const handleWishlist = () => {
    setWishlistSuccess(true);
    setTimeout(() => setWishlistSuccess(false), 3000);
  };

  const handleInquiry = () => {
    setInquirySuccess(true);
    setTimeout(() => setInquirySuccess(false), 3000);
  };

  return (
    <div className="bg-[#F7FAFC] pb-16 font-sans" id="detail-view-container">
      {/* Breadcrumbs & Back */}
      <div className="bg-[#EFF2F4] border-b border-[#E3E8EE] py-3.5">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span onClick={onBack} className="hover:text-blue-600 cursor-pointer">Home</span>
            <span>&gt;</span>
            <span onClick={onBack} className="hover:text-blue-600 cursor-pointer">{product.category}</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium truncate max-w-xs">{product.title}</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-semibold focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to listing</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6" id="product-detail-layout">
        {/* Main interactive product block */}
        <div className="bg-white border border-[#E3E8EE] rounded-lg p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          {/* Gallery area (4 columns) */}
          <div className="lg:col-span-4" id="gallery-container">
            <div className="border border-[#E3E8EE] rounded-lg h-80 md:h-[380px] flex items-center justify-center p-4 bg-gray-50 overflow-hidden mb-3">
              <img src={activeImage} alt={product.title} className="max-h-full max-w-full object-contain hover:scale-105 transition-transform" />
            </div>

            {/* Thumbnails list */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1" id="gallery-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 border rounded-md p-1 bg-white focus:outline-none shrink-0 flex items-center justify-center ${
                      activeImage === img ? 'border-[#0D6EFD] ring-2 ring-blue-100' : 'border-[#E3E8EE] hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info details (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="product-info-middle">
            <div>
              {/* In stock tag */}
              <div className="flex items-center gap-1.5 text-green-600 font-semibold text-sm mb-2">
                <span>✓</span>
                <span>In stock</span>
              </div>

              <h1 className="text-xl lg:text-2xl font-bold text-[#1C1C1C] leading-snug mb-3">
                {product.title}
              </h1>

              {/* Stars & orders meta */}
              <div className="flex flex-wrap items-center text-sm gap-y-2 text-gray-500 mb-4">
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-amber-500 font-semibold ml-1">{product.rating}</span>
                </div>
                <span className="text-gray-300 mx-2.5">|</span>
                <span className="hover:text-blue-600 cursor-pointer">{product.reviewsCount} reviews</span>
                <span className="text-gray-300 mx-2.5">|</span>
                <span className="font-medium text-gray-700">{product.ordersCount} sold</span>
              </div>

              {/* Wholesaler Tier Price column table (Figmas styled list) */}
              <div className="bg-[#FFF0DF] rounded-md p-3.5 grid grid-cols-3 divide-x divide-[#FFD2A1] mb-5">
                <div className="px-2">
                  <span className="text-red-600 font-bold text-lg block">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-gray-500 mt-0.5 block">50-100 pcs</span>
                </div>
                <div className="px-4">
                  <span className="text-[#1C1C1C] font-semibold text-base block">${(product.price * 0.92).toFixed(2)}</span>
                  <span className="text-xs text-gray-500 mt-0.5 block">100-700 pcs</span>
                </div>
                <div className="px-4">
                  <span className="text-[#1C1C1C] font-semibold text-base block">${(product.price * 0.8).toFixed(2)}</span>
                  <span className="text-xs text-gray-500 mt-0.5 block">700+ pcs</span>
                </div>
              </div>

              {/* Spec bullets */}
              <div className="space-y-2 text-sm border-b border-gray-100 pb-5 mb-5 text-[#505050]">
                <div className="grid grid-cols-3">
                  <span className="text-gray-400">Price:</span>
                  <span className="col-span-2 text-gray-700 font-medium">Negotiable</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-400">Type:</span>
                  <span className="col-span-2 text-gray-700 font-medium">{product.subcategory}</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-400">Material:</span>
                  <span className="col-span-2 text-gray-700 font-medium">Premium alloy/cotton blend</span>
                </div>
                <div className="grid grid-cols-3">
                  <span className="text-gray-400">Design:</span>
                  <span className="col-span-2 text-gray-700 font-medium">Modern aesthetic ergonomics</span>
                </div>
              </div>

              {/* Size & Color selection selectors */}
              <div className="space-y-4 mb-6">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Select Size:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 border text-xs font-semibold rounded-md transition-all ${
                            selectedSize === size
                              ? 'border-[#0D6EFD] bg-blue-50 text-[#0D6EFD]'
                              : 'border-gray-200 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Select Color:</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 border text-xs font-semibold rounded-md transition-all ${
                            selectedColor === color
                              ? 'border-[#0D6EFD] bg-blue-50 text-[#0D6EFD]'
                              : 'border-gray-200 hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity input */}
                <div>
                  <label className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Quantity:</label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="border border-gray-300 text-gray-600 rounded-md p-1.5 hover:bg-gray-50 transition-colors disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-800">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="border border-gray-300 text-gray-600 rounded-md p-1.5 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Alert & Actions */}
            <div>
              {addSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-medium p-3 rounded-lg mb-3" id="add-success-toast">
                  ✓ Added {quantity} items to your shopping cart successfully!
                </div>
              )}
              {wishlistSuccess && (
                <div className="bg-blue-50 border border-blue-200 text-[#0D6EFD] text-xs font-medium p-3 rounded-lg mb-3" id="wishlist-success-toast">
                  ✓ Added to your wishlist!
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-all shadow-xs flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="border border-[#E3E8EE] hover:border-[#0D6EFD] text-[#0D6EFD] hover:bg-slate-50 font-bold p-3 rounded-md transition-colors"
                  title="Save to Wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Supplier detail sidebar (3 columns) */}
          <div className="lg:col-span-3 border border-gray-200 rounded-lg p-4 bg-white self-start" id="detail-supplier-sidebar">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-lg bg-teal-100 flex items-center justify-center font-bold text-teal-800 text-lg">
                R
              </div>
              <div>
                <span className="text-gray-400 text-xs block">Supplier</span>
                <span className="text-[#1C1C1C] font-semibold text-sm leading-tight block">Guanjoi Trading LLC</span>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-b border-gray-100 py-4 my-4 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-base">🇩🇪</span>
                <span>Germany, Berlin</span>
              </div>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <span>✓</span>
                <span>Verified Seller</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500">🌐</span>
                <span>Worldwide Shipping</span>
              </div>
            </div>

            <div className="space-y-2">
              {inquirySuccess && (
                <div className="bg-green-50 border border-green-200 text-green-800 text-xs font-medium p-2 rounded-md mb-2 text-center">
                  ✓ Inquiry sent!
                </div>
              )}
              <button
                type="button"
                onClick={handleInquiry}
                className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-md transition-colors shadow-xs"
              >
                Send inquiry
              </button>
              <button
                type="button"
                onClick={() => alert('Seller profile coming soon!')}
                className="w-full border border-gray-200 hover:bg-gray-50 text-[#0D6EFD] font-bold text-xs py-2.5 rounded-md transition-colors"
              >
                Seller's profile
              </button>
            </div>
          </div>

        </div>

        {/* Tabs for detailed description / Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Tabs Content Block (3 columns) */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg overflow-hidden" id="details-tabs-block">
            {/* Tab Headers */}
            <div className="border-b border-gray-200 bg-gray-55 flex overflow-x-auto">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: `Reviews (${product.reviewsCount})` },
                { id: 'shipping', label: 'Shipping' },
                { id: 'seller', label: 'About seller' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-3.5 text-sm font-semibold transition-all border-b-2 shrink-0 ${
                    activeTab === tab.id
                      ? 'border-[#0D6EFD] text-[#0D6EFD] bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panel */}
            <div className="p-6 text-[#505050] text-sm leading-relaxed" id="details-tab-panel">
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 mb-4">{product.longDescription || product.description}</p>
                    <p className="text-gray-600">Equipped with state of the art safety locks, customizable logos and responsive design specifications according to user prerequisites.</p>
                  </div>

                  {/* Specifications Table */}
                  <div>
                    <h3 className="text-[#1C1C1C] font-bold text-base mb-3">Product Specifications</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden max-w-xl">
                      <table className="w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-100">
                          {Object.entries(product.specs).map(([key, val]) => (
                            <tr key={key} className="hover:bg-slate-50 transition-colors">
                              <td className="px-4 py-3 bg-gray-50 font-medium text-gray-500 w-1/3 text-xs uppercase tracking-wider">{key}</td>
                              <td className="px-4 py-3 text-gray-700 text-sm font-medium">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bullet features */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-[#1C1C1C] font-bold text-base mb-3">Key Features</h3>
                      <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                        {product.features.map((feat, idx) => (
                          <li key={idx} className="font-medium">{feat} - Integrated high performance specs.</li>
                        ))}
                        <li>Robust high quality finishing for maximum durability.</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-5">
                  <h3 className="text-[#1C1C1C] font-bold text-base">Customer Feedback</h3>
                  <div className="divide-y divide-gray-100">
                    {[
                      { user: 'Arthur Pendragon', rating: 5, date: '2026-05-12', text: 'Stellar item, absolutely perfectly matches the Figma layout and design quality. Speed is top notch.' },
                      { user: 'Elaine Carter', rating: 4, date: '2026-04-30', text: 'Very happy with the overall build quality and materials. Free delivery is a wonderful bonus.' }
                    ].map((rev, idx) => (
                      <div key={idx} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-[#1c1c1c] text-sm">{rev.user}</span>
                          <span className="text-gray-400 text-xs">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400 gap-0.5 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 fill-current ${i < rev.rating ? '' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <h3 className="text-[#1C1C1C] font-bold text-base">Logistics & Shipping Details</h3>
                  <p className="text-gray-600">All products are shipped within 24-48 hours of verification directly from the manufacturer hubs. Tracked ocean or air cargo solutions ensure prompt door-to-door deliveries.</p>
                  <div className="flex gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-900">
                    <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold mb-0.5">Secure Packing Shield Protection</p>
                      <p className="text-blue-700">Receive comprehensive compensation or free replacements if items are damaged or specs differ.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'seller' && (
                <div className="space-y-3">
                  <h3 className="text-[#1C1C1C] font-bold text-base">About the Supplier</h3>
                  <p className="text-gray-600">Guanjoi Trading LLC is an award-winning international logistics and supply company offering customizable electronic accessories and consumer wearables since 2012.</p>
                  <p className="text-gray-600 text-xs">Standard response time: &lt; 3 Hours • On-time delivery rate: 98.4%</p>
                </div>
              )}
            </div>
          </div>

          {/* "You May Like" Column panel (1 column) */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-4" id="may-like-panel">
            <h3 className="text-[#1C1C1C] font-bold text-sm mb-4">You may like</h3>
            <div className="space-y-4" id="may-like-list">
              {mayLikeProducts.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="flex gap-3 cursor-pointer group hover:opacity-90 border-b border-gray-100 last:border-b-0 pb-3 last:pb-0"
                >
                  <div className="w-16 h-16 shrink-0 border border-gray-200 rounded-md p-1 bg-gray-50 flex items-center justify-center">
                    <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xs text-gray-700 font-medium group-hover:text-blue-600 line-clamp-2 leading-snug">
                      {prod.title}
                    </h4>
                    <span className="text-gray-400 text-xs mt-1 block">${prod.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Related products horizontal listing */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-8" id="related-products-section">
            <h2 className="text-[#1C1C1C] text-lg font-bold mb-5 tracking-tight">Related products</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4" id="related-products-grid">
              {relatedProducts.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="bg-white border border-gray-200 rounded-lg p-3.5 cursor-pointer hover:shadow-md transition-shadow text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="h-28 w-full bg-gray-50 rounded-md p-1.5 flex items-center justify-center mb-2">
                      <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <h4 className="text-gray-700 text-xs font-semibold truncate leading-none mb-1.5">{prod.title}</h4>
                  </div>
                  <span className="text-[#8b96a5] text-xs font-medium">${prod.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Super Discount Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10 mb-6">
        <div className="bg-[#0D6EFD] rounded-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white relative">
          <div className="absolute inset-0 bg-blue-700/20 mix-blend-multiply"></div>
          <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Super discount on more than 100 USD</h2>
            <p className="text-blue-100 font-medium opacity-90">Have you ever finally just write dummy info</p>
          </div>
          <button onClick={onBack} className="relative z-10 bg-[#FF9017] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-md transition-colors shadow-xs">
            Shop now
          </button>
        </div>
      </section>
    </div>
  );
}
