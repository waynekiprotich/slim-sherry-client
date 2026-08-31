import React, { useState } from 'react';

const ProductGallery = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-neutral rounded-lg flex items-center justify-center">
        <span className="font-body text-text-light">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/5] bg-neutral rounded-lg overflow-hidden border border-pink-light relative">
        {images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`Product view ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-2 hide-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`flex-shrink-0 w-20 aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                activeIndex === idx ? 'border-plum' : 'border-transparent hover:border-pink-light'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
