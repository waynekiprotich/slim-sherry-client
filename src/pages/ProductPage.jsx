import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  SEOHead,
  Navbar,
  ProductGallery,
  WhatsAppButton,
  Footer
} from '../components';
import { publicApi } from '../services/api';

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await publicApi.getProduct(slug);
        setProduct(data.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="product-page flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 flex justify-center items-center">
          <p className="text-xl">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page flex flex-col min-h-screen">
        <SEOHead title="Product Not Found - Slim Sherry" />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">Sorry, the product you are looking for does not exist.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page flex flex-col min-h-screen">
      <SEOHead 
        title={`${product.name} - Slim Sherry`} 
        description={`Price: ${product.price || ''}. ${product.description || `Buy ${product.name} at Slim Sherry`}`} 
        image={product.images && product.images.length > 0 ? (typeof product.images[0] === 'string' ? product.images[0] : product.images[0].image_url) : undefined}
      />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="product-gallery-container">
            <ProductGallery images={product.images || []} />
          </div>
          
          <div className="product-info flex flex-col">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6 text-gray-800">
              ${product.price}
            </p>
            
            <div className="prose mb-8">
              <p>{product.description}</p>
            </div>
            
            <div className="mt-auto pt-8 border-t">
              <WhatsAppButton 
                phoneNumber="1234567890" 
                message={`Hi, I'm interested in the ${product.name}!`} 
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
