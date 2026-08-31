import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SEOHead,
  Navbar,
  CategoryFilter,
  ProductGrid,
  Footer,
  FilterPanel
} from '../components';
import { publicApi } from '../services/api';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [cats, prods] = await Promise.all([
          publicApi.getCategories(),
          publicApi.getProducts(categoryId)
        ]);
        setCategories(cats.data || []);
        setProducts(prods.data || []);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const currentCatObj = categories.find(c => c.id === categoryId || c.slug === categoryId);
  const shopTitle = currentCatObj ? `${currentCatObj.name} - Shop - Slim Sherry` : 'Shop - Slim Sherry';

  return (
    <div className="bg-background text-on-background font-body-md text-body-md min-h-screen flex flex-col">
      <SEOHead title={shopTitle} description="Browse our catalog" />
      <Navbar />
      
      <main className="flex-grow relative">
        <CategoryFilter categories={categories} currentCategory={categoryId} resultCount={products.length} onFilterClick={() => setIsFilterOpen(true)} />
        <ProductGrid products={products} loading={loading} />
      </main>

      <Footer />
      
      <FilterPanel isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
    </div>
  );
}
