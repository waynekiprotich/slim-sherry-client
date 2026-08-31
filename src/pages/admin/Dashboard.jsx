import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi.getDashboard();
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading && !data) return <div className="p-4 font-body-md">Loading dashboard...</div>;
  if (error && !data) return (
    <div className="font-body-md">
      <div className="p-8 border border-red-600 bg-red-50 text-red-600 flex flex-col items-center">
        <span className="material-symbols-outlined text-4xl mb-4">error</span>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">Error Loading Dashboard</h2>
        <p>{error}</p>
        <button onClick={fetchDashboard} className="mt-4 px-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest text-sm">Try Again</button>
      </div>
    </div>
  );
  if (!data) return null;

  return (
    <div className="font-body-md">
      <h1 className="font-headline-md text-2xl md:text-3xl mb-4 md:mb-8 uppercase tracking-widest">Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="flex-1 p-4 md:p-6 bg-surface border border-outline-variant">
          <h3 className="uppercase tracking-wider text-sm mb-2 text-on-surface/70">Total Products</h3>
          <p className="text-2xl md:text-3xl font-bold">{data.total_products || 0}</p>
        </div>
        <div className="flex-1 p-4 md:p-6 bg-surface border border-outline-variant">
          <h3 className="uppercase tracking-wider text-sm mb-2 text-on-surface/70">Total Categories</h3>
          <p className="text-2xl md:text-3xl font-bold">{data.total_categories || 0}</p>
        </div>
        <div className="flex-1 p-4 md:p-6 bg-surface border border-outline-variant">
          <h3 className="uppercase tracking-wider text-sm mb-2 text-on-surface/70">Published Products</h3>
          <p className="text-2xl md:text-3xl font-bold">{data.published_products || 0}</p>
        </div>
        <div className="flex-1 p-4 md:p-6 bg-surface border border-outline-variant">
          <h3 className="uppercase tracking-wider text-sm mb-2 text-on-surface/70">Unavailable Products</h3>
          <p className="text-2xl md:text-3xl font-bold">{data.unavailable_products || 0}</p>
        </div>
      </div>
      
      <h2 className="font-headline-md text-lg md:text-xl mb-4 uppercase tracking-widest">Recent Products</h2>
      <div className="border border-outline-variant overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px] md:min-w-full">
          <thead>
            <tr className="border-b border-outline-variant bg-primary-container/30">
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Name</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Category</th>
              <th className="p-4 font-normal uppercase tracking-wider text-sm">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.recent_products?.length > 0 ? (
              data.recent_products.map(product => (
                <tr key={product.id} className="border-b border-outline-variant last:border-0 hover:bg-primary-container/10">
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category?.name || 'Uncategorized'}</td>
                  <td className="p-4">${product.price}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-4 text-center text-on-surface/70">No recent products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
