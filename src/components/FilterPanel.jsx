import React, { useEffect } from 'react';

export default function FilterPanel({ isOpen, onClose }) {
  // Prevent scrolling on body when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Centered Modal */}
      <div className="relative w-full max-w-sm bg-surface shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 ease-out border border-outline-variant max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-outline-variant">
          <h2 className="font-headline-md text-xl uppercase tracking-widest">Filter & Sort</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-variant transition-colors rounded-full">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow overflow-y-auto font-body-md flex flex-col gap-8">
          <div>
            <h3 className="uppercase tracking-wider text-sm font-bold mb-4">Sort By</h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="sort" className="accent-on-surface" defaultChecked />
                <span className="group-hover:text-secondary transition-colors">Newest Arrivals</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="sort" className="accent-on-surface" />
                <span className="group-hover:text-secondary transition-colors">Price: Low to High</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="sort" className="accent-on-surface" />
                <span className="group-hover:text-secondary transition-colors">Price: High to Low</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="uppercase tracking-wider text-sm font-bold mb-4">Price Range</h3>
            <div className="flex items-center gap-4">
              <input type="number" placeholder="Min" className="w-full p-2 border border-outline-variant bg-transparent text-sm focus:outline-none focus:border-on-surface" />
              <span>-</span>
              <input type="number" placeholder="Max" className="w-full p-2 border border-outline-variant bg-transparent text-sm focus:outline-none focus:border-on-surface" />
            </div>
          </div>
          
          <div>
            <h3 className="uppercase tracking-wider text-sm font-bold mb-4">Availability</h3>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" className="accent-on-surface" defaultChecked />
              <span className="group-hover:text-secondary transition-colors">In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-outline-variant bg-surface">
          <button onClick={onClose} className="w-full py-4 bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200">
            Apply Filters
          </button>
        </div>

      </div>
    </div>
  );
}
