import React, { useEffect } from 'react';

const SEOHead = ({ 
  title = 'Slim Sherry - Premium Handbags',
  description = 'Quality you can feel. Premium handbags curated for the modern woman.',
  keywords = 'handbags, premium bags, fashion, slim sherry, bags kenya',
  image
}) => {
  useEffect(() => {
    document.title = title;
    
    // Helper to set meta tags
    const setMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    
    // Open Graph
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:type', 'website', 'property');
    if (image) {
      setMetaTag('og:image', image, 'property');
    }

  }, [title, description, keywords, image]);

  return null;
};

export default SEOHead;
