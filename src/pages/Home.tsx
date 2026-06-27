import { useState, useEffect, FormEvent } from 'react';
import { Mail, Clock, Shield, Globe2, Truck, Settings as SettingsIcon, ChevronRight } from 'lucide-react';
import { 
  CATEGORIES, 
  DEALS_PRODUCTS, 
  HOME_AND_OUTDOOR_ITEMS, 
  ELECTRONICS_ITEMS, 
  EXTRA_SERVICES, 
  REGIONS, 
  PRODUCTS 
} from '../data';
import { Product } from '../types';

interface HomeProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToCategory: (category: string) => void;
  setCurrentView: (view: string) => void;
}

export default function Home({ onSelectProduct, onNavigateToCategory, setCurrentView }: HomeProps) {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 13,
    minutes: 44,
    seconds: 56
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(interval);
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // RFQ (Request For Quote) Form state
  const [rfqSuccess, setRfqSuccess] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    item: '',
    details: '',
    quantity: 1,
    unit: 'Pcs'
  });

  const handleRfqSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRfqSuccess(true);
    setTimeout(() => {
      setRfqSuccess(false);
      setRfqForm({ item: '', details: '', quantity: 1, unit: 'Pcs' });
    }, 4000);
  };

  // Newsletter subscription
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="bg-[#F7FAFC] pb-16 space-y-7" id="home-view-container">
      {/* 1. HERO CONTAINER (Main layout) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-5" id="hero-section">
        <div className="bg-white border border-[#E3E8EE] rounded-lg p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Category Menu */}
          <div className="hidden lg:block col-span-1" id="hero-category-menu">
            <nav className="flex flex-col space-y-1">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  onClick={() => onNavigateToCategory(cat)}
                  className={`w-full text-left px-3 py-2 text-base rounded-md font-medium transition-colors hover:bg-[#E5F1FF] text-[#505050] hover:text-[#1C1C1C] flex items-center justify-between ${
                    i === 0 ? 'bg-[#E5F1FF] text-[#1C1C1C]' : ''
                  }`}
                >
                  <span>{cat}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Center Banner */}
          <div className="col-span-1 lg:col-span-2 relative rounded-lg overflow-hidden h-[380px] bg-sky-100 flex flex-col justify-center p-10 text-slate-800" id="hero-center-banner">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" 
                alt="Banner Backdrop" 
                className="w-full h-full object-cover opacity-35 filter brightness-95"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#0D6EFD]/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 text-[#1C1C1C] max-w-sm">
              <span className="text-[28px] font-normal leading-none block mb-1">Latest trending</span>
              <h1 className="text-3xl md:text-[32px] font-bold tracking-tight mb-5 leading-tight">
                Electronic items
              </h1>
              <button 
                onClick={() => onNavigateToCategory('Computer and tech')}
                className="bg-white hover:bg-gray-100 text-[#1C1C1C] font-semibold text-base px-4 py-2 rounded-md transition-all shadow-xs"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Right Login/Promo Cards Stack */}
          <div className="col-span-1 flex flex-col gap-3" id="hero-right-promos">
            {/* Login Widget */}
            <div className="bg-[#E3F0FF] rounded-lg p-4 flex flex-col justify-between h-[120px]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-300 overflow-hidden border border-white">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="text-sm">
                  <p className="text-[#1C1C1C] font-medium leading-tight">Hi, user</p>
                  <p className="text-gray-600 text-xs">let's get started</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={() => setCurrentView('products')}
                  className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-md transition-colors"
                >
                  Join now
                </button>
                <button 
                  onClick={() => setCurrentView('products')}
                  className="bg-white hover:bg-slate-50 text-[#0D6EFD] border border-[#E3E8EE] text-sm font-semibold py-2 rounded-md transition-colors"
                >
                  Log in
                </button>
              </div>
            </div>

            {/* Orange Banner */}
            <div className="bg-[#F38332] text-white rounded-lg p-4 flex flex-col justify-center h-[120px] relative overflow-hidden">
              <span className="text-sm font-medium leading-relaxed max-w-[160px]">
                Get US $10 off with a new supplier
              </span>
              <div className="absolute -right-5 bottom-0 opacity-20 text-6xl select-none font-bold">
                $
              </div>
            </div>

            {/* Teal Banner */}
            <div className="bg-[#55BDB3] text-white rounded-lg p-4 flex flex-col justify-center h-[120px] relative overflow-hidden">
              <span className="text-sm font-medium leading-relaxed max-w-[160px]">
                Send quotes with supplier preferences
              </span>
              <div className="absolute -right-2 bottom-0 opacity-20 text-6xl select-none font-bold">
                ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEALS AND OFFERS SECTION (Countdown) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="deals-offers-section">
        <div className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* Left Timer Panel */}
          <div className="md:w-64 p-6 border-b md:border-b-0 md:border-r border-[#E3E8EE] flex flex-col justify-between shrink-0 bg-white" id="deals-timer-panel">
            <div>
              <h2 className="text-[#1C1C1C] text-xl font-bold tracking-tight">Deals and offers</h2>
              <span className="text-[#8B96A5] text-base font-normal block mt-1">Hygiene equipments</span>
            </div>

            {/* Timer digits */}
            <div className="flex gap-2.5 mt-5 md:mt-0" id="countdown-timer">
              <div className="flex flex-col items-center">
                <div className="bg-[#606060] text-white text-sm font-bold w-11 h-11 rounded-md flex items-center justify-center">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#606060] text-white text-sm font-bold w-11 h-11 rounded-md flex items-center justify-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">Hour</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#606060] text-white text-sm font-bold w-11 h-11 rounded-md flex items-center justify-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">Min</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-[#606060] text-white text-sm font-bold w-11 h-11 rounded-md flex items-center justify-center">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">Sec</span>
              </div>
            </div>
          </div>

          {/* Right Product Items (5 cols) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#E3E8EE]" id="deals-product-grid">
            {DEALS_PRODUCTS.map((deal) => {
              // Try to find the actual product id or just go to general products listing
              const matchingProduct = PRODUCTS.find(p => p.title.toLowerCase().includes(deal.title.toLowerCase().split(' ')[0]));
              return (
                <div 
                  key={deal.id}
                  onClick={() => {
                    if (matchingProduct) {
                      onSelectProduct(matchingProduct);
                    } else {
                      onNavigateToCategory('Computer and tech');
                    }
                  }}
                  className="p-5 flex flex-col items-center text-center cursor-pointer group hover:bg-slate-50 transition-colors bg-white"
                >
                  <div className="w-28 h-28 mb-3 overflow-hidden flex items-center justify-center">
                    <img 
                      src={deal.image} 
                      alt={deal.title} 
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" 
                    />
                  </div>
                  <h4 className="text-[#1C1C1C] text-xs font-medium mb-2 truncate w-full">{deal.title}</h4>
                  <span className="bg-[#FFE5E5] text-[#EB001B] text-xs font-semibold px-2.5 py-1 rounded-full">
                    {deal.discount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. HOME AND OUTDOOR BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="home-outdoor-section">
        <div className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left large Banner Cover */}
          <div className="lg:w-72 relative shrink-0 p-6 flex flex-col justify-between text-[#1C1C1C] h-60 lg:h-auto min-h-[260px] overflow-hidden" id="home-outdoor-cover">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&auto=format&fit=crop&q=80" 
                alt="Home Banner" 
                className="w-full h-full object-cover brightness-90 filter"
              />
              <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/50 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold tracking-tight text-[#1C1C1C]">Home and outdoor</h3>
              <p className="text-[#1C1C1C] text-sm mt-1 max-w-[180px]">Elegant home interiors and styling solutions</p>
            </div>
            <div className="relative z-10">
              <button 
                onClick={() => onNavigateToCategory('Home interiors')}
                className="bg-white border border-[#E3E8EE] hover:bg-gray-50 text-[#1C1C1C] font-semibold text-sm px-4 py-2.5 rounded-md transition-all shadow-xs w-32"
              >
                Source now
              </button>
            </div>
          </div>

          {/* Right Grid (4 columns x 2 rows) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E3E8EE] border-t lg:border-t-0 lg:border-l border-[#E3E8EE]" id="home-outdoor-grid">
            {HOME_AND_OUTDOOR_ITEMS.map((item) => {
              const matchingProduct = PRODUCTS.find(p => p.title.toLowerCase().includes(item.title.toLowerCase().split(' ')[0]));
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    if (matchingProduct) {
                      onSelectProduct(matchingProduct);
                    } else {
                      onNavigateToCategory('Home interiors');
                    }
                  }}
                  className="p-4 flex flex-col justify-between min-h-[140px] cursor-pointer group hover:bg-slate-50 transition-colors bg-white"
                >
                  <div>
                    <h4 className="text-[#1C1C1C] text-sm font-medium leading-tight group-hover:text-[#0D6EFD] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[#8B96A5] text-xs mt-1 block">From USD {item.price}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-18 h-18 object-contain group-hover:scale-105 transition-transform mix-blend-multiply"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CONSUMER ELECTRONICS BENTO GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="consumer-electronics-section">
        <div className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden flex flex-col lg:flex-row">
          {/* Left large Banner Cover */}
          <div className="lg:w-72 relative shrink-0 p-6 flex flex-col justify-between text-[#1C1C1C] h-60 lg:h-auto min-h-[260px] overflow-hidden" id="consumer-electronics-cover">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1496181130204-755241524eab?w=400&auto=format&fit=crop&q=80" 
                alt="Electronics Banner" 
                className="w-full h-full object-cover brightness-95 filter"
              />
              <div className="absolute inset-0 bg-linear-to-b from-[#e3f0ff]/95 via-[#e3f0ff]/50 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold tracking-tight text-[#1C1C1C]">Consumer electronics and gadgets</h3>
              <p className="text-[#1C1C1C] text-sm mt-1 max-w-[180px]">Hot electronic appliances & smartphones</p>
            </div>
            <div className="relative z-10">
              <button 
                onClick={() => onNavigateToCategory('Computer and tech')}
                className="bg-white border border-[#E3E8EE] hover:bg-gray-50 text-[#1C1C1C] font-semibold text-sm px-4 py-2.5 rounded-md transition-all shadow-xs w-32"
              >
                Source now
              </button>
            </div>
          </div>

          {/* Right Grid (4 columns x 2 rows) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E3E8EE] border-t lg:border-t-0 lg:border-l border-[#E3E8EE]" id="consumer-electronics-grid">
            {ELECTRONICS_ITEMS.map((item) => {
              const matchingProduct = PRODUCTS.find(p => p.title.toLowerCase().includes(item.title.toLowerCase().split(' ')[0]));
              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    if (matchingProduct) {
                      onSelectProduct(matchingProduct);
                    } else {
                      onNavigateToCategory('Computer and tech');
                    }
                  }}
                  className="p-4 flex flex-col justify-between min-h-[140px] cursor-pointer group hover:bg-slate-50 transition-colors bg-white"
                >
                  <div>
                    <h4 className="text-[#1C1C1C] text-sm font-medium leading-tight group-hover:text-[#0D6EFD] transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-[#8B96A5] text-xs mt-1 block">From USD {item.price}</span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-18 h-18 object-contain group-hover:scale-105 transition-transform mix-blend-multiply"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. REQUEST FOR QUOTE (RFQ) SUPPLIER SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="rfq-supplier-section">
        <div className="rounded-lg overflow-hidden relative min-h-[380px] flex items-center bg-[#2B6CB0] text-white p-8 lg:p-12">
          {/* Blue Background with curves */}
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-30 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80')" }}></div>
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-[#2B6CB0]/60 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full relative z-10">
            {/* Left intro text */}
            <div className="flex flex-col justify-center max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight mb-4 leading-tight">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                Tell us what you need, specify details, and receive verified proposals from certified international manufacturers in hours.
              </p>
            </div>

            {/* Right Form Card */}
            <div className="bg-white text-slate-800 rounded-lg p-6 shadow-xl max-w-md ml-auto w-full" id="rfq-card">
              <h3 className="text-[#1C1C1C] font-bold text-lg mb-4">Send quote to suppliers</h3>
              {rfqSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg text-center" id="rfq-success-alert">
                  <p className="font-semibold text-sm">Quote Sent Successfully!</p>
                  <p className="text-xs text-green-600 mt-1">Verified suppliers will contact you soon with custom offers.</p>
                </div>
              ) : (
                <form onSubmit={handleRfqSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="What item do you need?"
                      value={rfqForm.item}
                      onChange={(e) => setRfqForm({ ...rfqForm, item: e.target.value })}
                      required
                      className="w-full border border-[#E3E8EE] rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD]"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Type more details"
                      rows={3}
                      value={rfqForm.details}
                      onChange={(e) => setRfqForm({ ...rfqForm, details: e.target.value })}
                      className="w-full border border-[#E3E8EE] rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD] resize-none"
                    ></textarea>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Quantity"
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: parseInt(e.target.value) || 1 })}
                        className="w-full border border-[#E3E8EE] rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD]"
                      />
                    </div>
                    <div className="w-1/2">
                      <select
                        value={rfqForm.unit}
                        onChange={(e) => setRfqForm({ ...rfqForm, unit: e.target.value })}
                        className="w-full border border-[#E3E8EE] bg-white rounded-md px-3 py-2 text-base focus:outline-none focus:border-[#0D6EFD]"
                      >
                        <option value="Pcs">Pcs</option>
                        <option value="Boxes">Boxes</option>
                        <option value="Liters">Liters</option>
                        <option value="Tons">Tons</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#0D6EFD] hover:bg-blue-700 text-white font-semibold text-base px-5 py-2.5 rounded-md transition-colors shadow-xs mt-2"
                  >
                    Send inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECOMMENDED ITEMS (Grid layout) */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="recommended-items-section">
        <h2 className="text-[#1C1C1C] text-xl font-bold mb-5 tracking-tight">Recommended items</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4" id="recommended-items-grid">
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod)}
              className="bg-white border border-[#E3E8EE] rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-40 w-full mb-3 overflow-hidden flex items-center justify-center bg-gray-50 rounded-md p-2">
                  <img src={prod.image} alt={prod.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <span className="text-[#1C1C1C] font-semibold text-base block">${prod.price.toFixed(2)}</span>
                <h4 className="text-[#8B96A5] text-sm mt-1.5 line-clamp-3 leading-relaxed group-hover:text-[#0D6EFD] transition-colors font-medium">
                  {prod.title}
                </h4>
              </div>
              {prod.shipping && (
                <span className="text-[#8B96A5] text-[10px] mt-2 block font-normal">{prod.shipping}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. OUR EXTRA SERVICES */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="extra-services-section">
        <h2 className="text-[#1C1C1C] text-xl font-bold mb-5 tracking-tight">Our extra services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="extra-services-grid">
          {EXTRA_SERVICES.map((serv, index) => {
            const iconsMap = [
              <Clock className="w-5 h-5 text-[#1C1C1C]" />,
              <SettingsIcon className="w-5 h-5 text-[#1C1C1C]" />,
              <Truck className="w-5 h-5 text-[#1C1C1C]" />,
              <Shield className="w-5 h-5 text-[#1C1C1C]" />
            ];
            return (
              <div key={serv.id} className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden group">
                <div className="h-32 relative overflow-hidden bg-slate-200">
                  <img src={serv.bgImage} alt={serv.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/15"></div>
                </div>
                <div className="p-5 relative pt-7">
                  {/* Absolute icon overlay */}
                  <div className="absolute -top-6 right-5 bg-[#D1E7DD] border-4 border-white w-12 h-12 rounded-full flex items-center justify-center shadow-xs">
                    {iconsMap[index] || <Globe2 className="w-5 h-5 text-gray-700" />}
                  </div>
                  <h4 className="text-[#1C1C1C] font-semibold text-sm leading-snug mb-2 pr-8">{serv.title}</h4>
                  <p className="text-[#8B96A5] text-xs leading-relaxed">{serv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. SUPPLIERS BY REGION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6" id="suppliers-region-section">
        <h2 className="text-[#1C1C1C] text-xl font-bold mb-5 tracking-tight">Suppliers by region</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-6" id="suppliers-region-grid">
          {REGIONS.map((reg, idx) => (
            <div key={idx} className="flex items-center gap-3 cursor-pointer group hover:opacity-80">
              <span className="text-2xl select-none" role="img" aria-label={reg.name}>{reg.flag}</span>
              <div>
                <span className="text-[#1C1C1C] text-sm font-medium block leading-none">{reg.name}</span>
                <span className="text-[#8B96A5] text-xs">{reg.domain}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SUBSCRIBE ON NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-4" id="newsletter-section">
        <div className="bg-[#EFF2F4] rounded-lg py-10 px-6 text-center mx-auto border border-[#E3E8EE] flex flex-col items-center">
          <Mail className="w-10 h-10 text-[#8B96A5] mb-3" />
          <h2 className="text-[#1C1C1C] text-xl font-bold tracking-tight mb-1">
            Subscribe on our newsletter
          </h2>
          <p className="text-[#606060] text-sm mb-6 max-w-md leading-relaxed">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          
          {subscribed ? (
            <div className="bg-white border border-green-200 text-green-800 px-6 py-2.5 rounded-md text-sm font-medium inline-block shadow-xs" id="newsletter-success">
              ✓ Successfully subscribed! Stay tuned for daily discounts.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md w-full" id="newsletter-form">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B96A5]" />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white border border-[#E3E8EE] rounded-md pl-10 pr-4 py-2.5 text-base focus:outline-none focus:border-[#0D6EFD]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#0D6EFD] hover:bg-blue-700 text-white text-base font-semibold px-6 py-2.5 rounded-md transition-colors shadow-xs"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
