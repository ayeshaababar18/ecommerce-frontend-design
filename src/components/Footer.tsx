import { ShoppingCart } from 'lucide-react';

export default function Footer() {
  const socialIcons = [
    { name: 'facebook', icon: 'f', bgClass: 'bg-gray-200 hover:bg-[#3b5998]' },
    { name: 'twitter', icon: 't', bgClass: 'bg-gray-200 hover:bg-[#1da1f2]' },
    { name: 'linkedin', icon: 'in', bgClass: 'bg-gray-200 hover:bg-[#0077b5]' },
    { name: 'instagram', icon: 'ig', bgClass: 'bg-gray-200 hover:bg-[#e1306c]' },
    { name: 'youtube', icon: 'yt', bgClass: 'bg-gray-200 hover:bg-[#ff0000]' }
  ];

  return (
    <footer className="bg-white border-t border-[#E3E8EE] text-gray-600 font-sans" id="main-footer">
      {/* Top section: Main grid columns */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4 select-none">
              <div className="bg-[#0D6EFD] text-white p-2 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-[#1C1C1C] tracking-tight">Brand</span>
            </div>
            <p className="text-[#505050] text-sm leading-relaxed mb-6 max-w-xs">
              Best information about the company gies here but now lorem ipsum is.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700 hover:text-white transition-all ${social.bgClass}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column: About */}
          <div>
            <h4 className="text-[#1C1C1C] font-semibold text-sm mb-4">About</h4>
            <ul className="space-y-2 text-sm text-[#8B96A5]">
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Find store</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Column: Partnership */}
          <div>
            <h4 className="text-[#1C1C1C] font-semibold text-sm mb-4">Partnership</h4>
            <ul className="space-y-2 text-sm text-[#8B96A5]">
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Find store</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Column: Information */}
          <div>
            <h4 className="text-[#1C1C1C] font-semibold text-sm mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-[#8B96A5]">
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Money Refund</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-[#0D6EFD] transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Column: Get App */}
          <div>
            <h4 className="text-[#1C1C1C] font-semibold text-sm mb-4">Get app</h4>
            <div className="space-y-3">
              <a 
                href="#" 
                className="flex items-center gap-3 bg-[#1C1C1C] hover:bg-black text-white px-3 py-1.5 rounded-md transition-colors w-36"
              >
                <span className="text-xl"></span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wide leading-none text-gray-400">Download on the</span>
                  <span className="text-xs font-bold leading-none mt-0.5">App Store</span>
                </div>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 bg-[#1C1C1C] hover:bg-black text-white px-3 py-1.5 rounded-md transition-colors w-36"
              >
                <span className="text-sm">🤖</span>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wide leading-none text-gray-400">Get it on</span>
                  <span className="text-xs font-bold leading-none mt-0.5">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright and language selection */}
      <div className="bg-[#EFF2F4] py-5 border-t border-[#E3E8EE]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between text-sm text-[#606060]">
          <span>© 2023 Ecommerce.</span>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#0D6EFD] transition-colors">
            <span className="text-base">🇺🇸</span>
            <span>English</span>
            <span className="text-xs">▲</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
