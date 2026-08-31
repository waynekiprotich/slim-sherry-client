import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { useToast } from '../../components/Toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi.getProducts();
      setProducts(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await adminApi.deleteProduct(id);
        addToast('Product deleted successfully', 'success');
        loadProducts();
      } catch (err) {
        addToast('Failed to delete product: ' + err.message, 'error');
      }
    }
  };

  if (loading && products.length === 0) return <div className="p-4 font-body-md">Loading products...</div>;
  if (error && products.length === 0) return (
    <div className="font-body-md">
      <div className="p-8 border border-red-600 bg-red-50 text-red-600 flex flex-col items-center">
        <span className="material-symbols-outlined text-4xl mb-4">error</span>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">Error Loading Products</h2>
        <p>{error}</p>
        <button onClick={loadProducts} className="mt-4 px-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest text-sm">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="font-body-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-8">
        <h1 className="font-headline-md text-2xl md:text-3xl uppercase tracking-widest">Products</h1>
        <Link 
          to="/admin/products/new" 
          className="w-full md:w-auto text-center px-6 py-2 min-h-[44px] flex items-center justify-center bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 transition-opacity"
        >
          Add Product
        </Link>
      </div>
      
      <div className="border border-outline-variant overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
          <thead>
            <tr className="border-b border-outline-variant bg-primary-container/30">
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Image</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Name</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Category</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Price</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Status</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-outline-variant last:border-0 hover:bg-primary-container/10">
                <td className="p-4">
                  {product.images && product.images[0] ? (
                    <img src={product.images[0].image_url} alt={product.name} className="w-12 h-12 object-cover border border-outline-variant" />
                  ) : (
                    <div className="w-12 h-12 bg-primary-container flex items-center justify-center text-xs border border-outline-variant text-on-surface/50">N/A</div>
                  )}
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category?.name || 'Uncategorized'}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  {product.published ? 'Published' : 'Draft'} / {product.available ? 'Available' : 'Unavailable'}
                </td>
                <td className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:underline uppercase text-xs tracking-wider min-h-[44px] flex items-center">Edit</Link>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline uppercase text-xs tracking-wider min-h-[44px] flex items-center">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-on-surface/70">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
