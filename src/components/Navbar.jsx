import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline docked w-full">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-base max-w-container-max mx-auto">
        <div className="hidden md:flex gap-6">
          <a className="text-on-surface-variant dark:text-on-primary-container font-label-sm text-label-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-250" href="#">Boutique</a>
          <a className="text-on-surface-variant dark:text-on-primary-container font-label-sm text-label-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-250" href="#">New Arrivals</a>
          <a className="text-on-surface-variant dark:text-on-primary-container font-label-sm text-label-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-250" href="#">Pre-loved</a>
          <a className="text-on-surface-variant dark:text-on-primary-container font-label-sm text-label-sm hover:text-secondary dark:hover:text-secondary-fixed transition-colors duration-250" href="#">Contact</a>
        </div>
        <a className="font-headline-lg text-2xl md:text-headline-lg tracking-widest text-on-surface dark:text-inverse-on-surface font-bold text-center absolute left-1/2 -translate-x-1/2" href="#">SLIM SHERRY</a>
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <div className="relative hidden md:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]" style={{ fontVariationSettings: "'wght' 300" }}>search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-4 py-1.5 border border-outline-variant rounded-full bg-transparent font-label-sm text-sm focus:outline-none focus:border-on-surface transition-colors w-48 text-on-surface placeholder:text-on-surface-variant/70"
            />
          </div>

          <button 
            className="md:hidden text-primary dark:text-primary-fixed-dim min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 200" }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 border-t border-outline-variant' : 'max-h-0'}`}>
        <div className="flex flex-col px-margin-mobile py-4 bg-surface dark:bg-surface-dim gap-4">
          <a className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block py-2" href="#">Boutique</a>
          <a className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block py-2" href="#">New Arrivals</a>
          <a className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block py-2" href="#">Pre-loved</a>
          <a className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider block py-2" href="#">Contact</a>
        </div>
      </div>
    </nav>
  );
}
