import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface text-on-surface font-body-md">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center bg-primary-container p-4 border-b border-outline-variant">
        <h2 className="font-headline-md text-lg font-bold uppercase tracking-wider">Admin Panel</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 min-h-[44px] flex items-center justify-center uppercase text-sm font-bold tracking-widest">
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
      
      {/* Sidebar */}
      <aside className={`${menuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-64 bg-primary-container md:border-r border-outline-variant p-4 md:p-6 flex-col border-b md:border-b-0`}>
        <h2 className="hidden md:block font-headline-md text-xl font-bold mb-8 uppercase tracking-wider">Admin Panel</h2>
        <nav className="flex flex-col gap-2 md:gap-4 flex-1">
          <Link to="/admin/dashboard" onClick={closeMenu} className="hover:underline min-h-[44px] flex items-center">Dashboard</Link>
          <Link to="/admin/products" onClick={closeMenu} className="hover:underline min-h-[44px] flex items-center">Products</Link>
          <Link to="/admin/categories" onClick={closeMenu} className="hover:underline min-h-[44px] flex items-center">Categories</Link>
          <Link to="/admin/settings" onClick={closeMenu} className="hover:underline min-h-[44px] flex items-center">Settings</Link>
          
          <button 
            onClick={handleLogout} 
            className="mt-4 md:mt-auto py-2 px-4 border border-outline-variant hover:bg-on-surface hover:text-surface transition-colors uppercase tracking-widest text-sm min-h-[44px]"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
