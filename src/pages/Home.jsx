import React, { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { publicApi } from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicApi.getProducts()
      .then(res => {
        setProducts(res.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen flex flex-col">
      <SEOHead title="Slim Sherry - Quality you can feel" description="Premium handbags curated for the modern woman." />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategoryFilter resultCount={products.length} />
        <ProductGrid products={products} loading={loading} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
