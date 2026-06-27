import { useState, FormEvent } from 'react';
import { Trash2, ArrowLeft, Heart, CheckCircle2, ShoppingCart, ShieldCheck, Headphones, Truck } from 'lucide-react';
import { CartItem, Product } from '../types';
import { SAVED_FOR_LATER_ITEMS } from '../data';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddToCart: (product: Product, qty: number, size?: string, color?: string) => void;
  setCurrentView: (view: string) => void;
}

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddToCart,
  setCurrentView,
}: CartProps) {
  // Coupon State
  const [coupon, setCoupon] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponError, setCouponError] = useState<string>('');

  // Save for later local list
  const [savedLaterList, setSavedLaterList] = useState<Product[]>(SAVED_FOR_LATER_ITEMS);

  // Checkout modal state
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');

  // Calculates pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = couponApplied ? subtotal * 0.10 : 0; // 10% discount
  const tax = subtotal > 0 ? 14.00 : 0; // flat tax representation
  const total = subtotal > 0 ? subtotal - discountAmount + tax : 0;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "SAVE10"');
      setCouponApplied(false);
    }
  };

  const handleSaveForLater = (item: CartItem) => {
    // Add to saved list
    setSavedLaterList(prev => [...prev, item.product]);
    // Remove from active cart
    onRemoveItem(item.product.id);
  };

  const handleMoveToCart = (prod: Product) => {
    // Add back to active cart
    onAddToCart(prod, 1);
    // Remove from saved list
    setSavedLaterList(prev => prev.filter(p => p.id !== prod.id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('success');
  };

  const handleCloseSuccess = () => {
    onClearCart();
    setCheckoutStep('cart');
    setCurrentView('home');
  };

  return (
    <div className="bg-[#F7FAFC] pb-16 font-sans" id="cart-view-container">
      {/* Checkout Success Modal Overlay */}
      {checkoutStep === 'success' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="checkout-success-modal">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl relative">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Thank you for your purchase. Your order has been placed successfully. A receipt has been sent to your registered email.
            </p>

            <div className="border-t border-b border-gray-100 py-3 mb-6 text-left space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Total Paid:</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Method:</span>
                <span className="font-semibold text-gray-900">Standard Express Courier</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Arrival:</span>
                <span className="font-semibold text-gray-900">3-5 Business Days</span>
              </div>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full bg-[#0D6EFD] hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      {/* Header state banner */}
      <div className="bg-[#EFF2F4] border-b border-[#E3E8EE] py-4 mb-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#1C1C1C]" id="cart-heading-title">
            My cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left main cart column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {cart.length === 0 ? (
            <div className="bg-white border border-[#E3E8EE] rounded-lg p-12 text-center" id="empty-cart-message">
              <ShoppingCart className="w-14 h-14 text-[#8B96A5] mx-auto mb-4" />
              <h3 className="text-[#1C1C1C] font-bold text-xl">Your Shopping Cart is Empty</h3>
              <p className="text-[#505050] text-base mt-1 mb-6">You haven't added any items to your cart yet. Explore our top recommended items.</p>
              <button
                onClick={() => setCurrentView('products')}
                className="bg-[#0D6EFD] hover:bg-blue-700 text-white font-semibold text-base px-6 py-3 rounded-md transition-colors shadow-xs"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden divide-y divide-[#E3E8EE]" id="cart-items-card">
              {cart.map((item) => (
                <div key={item.product.id} className="p-5 flex gap-4">
                  {/* Thumbnail frame */}
                  <div className="w-20 h-20 bg-[#F7FAFC] border border-[#E3E8EE] rounded-md p-1.5 shrink-0 flex items-center justify-center">
                    <img src={item.product.image} alt={item.product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Product title and action row */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-4">
                        <h3 
                          onClick={() => {
                            setCurrentView('products');
                          }}
                          className="text-[#1C1C1C] font-semibold text-base hover:text-[#0D6EFD] transition-colors leading-snug line-clamp-2 cursor-pointer"
                        >
                          {item.product.title}
                        </h3>
                        <span className="text-[#1C1C1C] font-bold text-base shrink-0">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Info labels */}
                      <p className="text-base text-[#8B96A5] mt-1 space-x-2">
                        <span>Size: {item.selectedSize || 'Standard'}</span>
                        <span>•</span>
                        <span>Color: {item.selectedColor || 'Default'}</span>
                        <span>•</span>
                        <span>Seller: Artel Market</span>
                      </p>
                    </div>

                    {/* Quantity selectors & action links */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3.5 gap-3">
                      <div className="flex items-center gap-4">
                        {/* Remove text button */}
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#FA3434] hover:bg-red-50 px-2 py-1 -ml-2 rounded-md text-base font-medium flex items-center gap-1 focus:outline-none transition-colors"
                        >
                          <span>Remove</span>
                        </button>
                        <span className="text-[#E3E8EE]">|</span>
                        {/* Save for later text button */}
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="text-[#0D6EFD] hover:bg-blue-50 px-2 py-1 rounded-md text-base font-medium flex items-center gap-1 focus:outline-none transition-colors"
                        >
                          <span>Save for later</span>
                        </button>
                      </div>

                      {/* Dropdown for Qty */}
                      <div className="flex items-center gap-2 text-base text-[#505050]">
                        <span>Qty:</span>
                        <select
                          value={item.quantity}
                          onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                          className="border border-[#E3E8EE] rounded-md bg-white px-3 py-1.5 text-[#1C1C1C] font-medium text-base focus:outline-none"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i+1} value={i+1}>{i+1}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Back & Clear controls footer bar */}
              <div className="p-4 flex items-center justify-between bg-white" id="cart-actions-bar">
                <button
                  onClick={() => setCurrentView('products')}
                  className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-base font-semibold px-5 py-2.5 rounded-md transition-colors flex items-center gap-2 shadow-xs"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to shop</span>
                </button>
                <button
                  onClick={onClearCart}
                  className="bg-white border border-[#E3E8EE] hover:bg-slate-50 text-[#0D6EFD] text-base font-semibold px-5 py-2.5 rounded-md transition-colors shadow-xs"
                >
                  Remove all
                </button>
              </div>
            </div>
          )}

          {/* Secure / Support Badges (matching bottom of Figmas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4" id="cart-trust-badges">
            <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1C1C1C] mb-0.5">Secure payment</p>
                <p className="text-gray-400">Guaranteed credit card shield validation.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1C1C1C] mb-0.5">Customer support</p>
                <p className="text-gray-400">24/7 dedicated customer success agents.</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-lg p-4 flex gap-3.5 items-center">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1C1C1C] mb-0.5">Free delivery</p>
                <p className="text-gray-400">On-time free international ocean logistics.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right billing summary column (4 cols) */}
        <div className="lg:col-span-4 space-y-4" id="cart-billing-sidebar">
          {/* Coupon Code Panel */}
          <div className="bg-white border border-[#E3E8EE] rounded-lg p-4">
            <p className="text-[#505050] font-semibold text-base mb-3">Have a coupon?</p>
            <form onSubmit={handleApplyCoupon} className="flex border border-[#E3E8EE] rounded-md overflow-hidden bg-white mb-2">
              <input
                type="text"
                placeholder="Add coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 px-3 py-2 text-base uppercase focus:outline-none placeholder-[#8B96A5]"
              />
              <button
                type="submit"
                className="bg-white border-l border-[#E3E8EE] text-[#0D6EFD] font-semibold px-5 hover:bg-slate-50 text-base transition-colors"
              >
                Apply
              </button>
            </form>
            {couponApplied && (
              <p className="text-[#00B517] text-sm font-semibold mt-2">✓ Coupon applied! 10% discount subtracted.</p>
            )}
            {couponError && (
              <p className="text-[#FA3434] text-sm font-semibold mt-2">{couponError}</p>
            )}
          </div>

          {/* Checkout billing grid panel */}
          <div className="bg-white border border-[#E3E8EE] rounded-lg p-4">
            <div className="space-y-3.5 text-[#505050] text-base pb-4 mb-4 border-b border-[#E3E8EE]">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-[#505050]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#FA3434]">
                <span>Discount:</span>
                <span>- ${discountAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#00B517]">
                <span>Tax:</span>
                <span>+ ${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-[#1C1C1C] font-bold text-base mb-5">
              <span>Total:</span>
              <span className="text-xl">${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-[#00B517] hover:bg-green-700 text-white font-semibold py-4 rounded-md transition-all text-lg shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              <span>Checkout</span>
            </button>

            {/* Credit cards payment gateway icons list */}
            <div className="flex items-center justify-center gap-2 mt-4 opacity-50">
              <span className="text-2xl font-bold">💳</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">VISA • MASTERCARD • PAYPAL • APPLE PAY</span>
            </div>
          </div>
        </div>

      </div>

      {/* "Saved For Later" section block */}
      {savedLaterList.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 mt-5" id="saved-for-later-section">
          <div className="bg-white border border-[#E3E8EE] rounded-lg p-5">
            <h2 className="text-[#1C1C1C] text-xl font-bold mb-5">Saved for later</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="saved-later-grid">
              {savedLaterList.map((prod) => (
                <div key={prod.id} className="border border-[#E3E8EE] rounded-md p-3.5 flex flex-col justify-between hover:shadow-xs transition-shadow">
                  <div>
                    {/* Thumbnail */}
                    <div className="h-32 w-full bg-[#F7FAFC] flex items-center justify-center rounded-md p-2 mb-2.5">
                      <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <span className="text-[#1C1C1C] font-semibold text-lg block">${prod.price.toFixed(2)}</span>
                    <h4 className="text-[#505050] text-base mt-1.5 leading-snug font-medium line-clamp-2">
                      {prod.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleMoveToCart(prod)}
                    className="w-full bg-white border border-[#E3E8EE] text-[#0D6EFD] hover:bg-slate-50 font-semibold py-2 rounded-md transition-colors mt-4 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Move to cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Super Discount Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mt-10 mb-6">
        <div className="bg-[#0D6EFD] rounded-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-8 text-white relative">
          <div className="absolute inset-0 bg-blue-700/20 mix-blend-multiply"></div>
          <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Super discount on more than 100 USD</h2>
            <p className="text-blue-100 font-medium opacity-90">Have you ever finally just write dummy info</p>
          </div>
          <button className="relative z-10 bg-[#FF9017] hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-md transition-colors shadow-xs">
            Shop now
          </button>
        </div>
      </section>
    </div>
  );
}
