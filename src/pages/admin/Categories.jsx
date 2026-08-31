import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';
import { useToast } from '../../components/Toast';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToast } = useToast();
  
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');

  const [deleteModal, setDeleteModal] = useState({ show: false, categoryId: null, productAction: 'uncategorize' });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi.getCategories();
      setCategories(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    try {
      if (editingId) {
        await adminApi.updateCategory(editingId, { name: formName });
        addToast('Category updated successfully', 'success');
      } else {
        await adminApi.createCategory({ name: formName });
        addToast('Category created successfully', 'success');
      }
      setFormName('');
      setEditingId(null);
      loadCategories();
    } catch (err) {
      addToast('Save failed: ' + err.message, 'error');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormName(category.name);
  };

  const initiateDelete = (id, productCount) => {
    if (productCount > 0) {
      setDeleteModal({ show: true, categoryId: id, productAction: 'uncategorize' });
    } else {
      if (window.confirm('Delete this category?')) {
        executeDelete(id, 'delete');
      }
    }
  };

  const executeDelete = async (id, action) => {
    try {
      await adminApi.deleteCategory(id, { product_action: action });
      setDeleteModal({ show: false, categoryId: null, productAction: 'uncategorize' });
      addToast('Category deleted successfully', 'success');
      loadCategories();
    } catch (err) {
      addToast('Delete failed: ' + err.message, 'error');
    }
  };

  const confirmDelete = () => {
    executeDelete(deleteModal.categoryId, deleteModal.productAction);
  };

  if (loading && categories.length === 0) return <div className="p-4 font-body-md">Loading categories...</div>;
  if (error && categories.length === 0) return (
    <div className="font-body-md max-w-3xl">
      <div className="p-8 border border-red-600 bg-red-50 text-red-600 flex flex-col items-center">
        <span className="material-symbols-outlined text-4xl mb-4">error</span>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">Error Loading Categories</h2>
        <p>{error}</p>
        <button onClick={loadCategories} className="mt-4 px-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest text-sm">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="font-body-md max-w-3xl">
      <h1 className="font-headline-md text-2xl md:text-3xl mb-4 md:mb-8 uppercase tracking-widest">Categories</h1>
      
      <form onSubmit={handleSave} className="mb-8 md:mb-10 flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          value={formName} 
          onChange={(e) => setFormName(e.target.value)} 
          placeholder="Category name" 
          required 
          className="flex-1 p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]"
        />
        <button type="submit" className="w-full md:w-auto px-6 py-3 bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 min-h-[44px] flex justify-center items-center">
          {editingId ? 'Update' : 'Add'} Category
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormName(''); }} className="w-full md:w-auto px-6 py-3 border border-outline-variant uppercase tracking-widest text-sm hover:bg-primary-container min-h-[44px] flex justify-center items-center">
            Cancel
          </button>
        )}
      </form>
      
      <div className="border border-outline-variant bg-surface">
        <ul className="list-none p-0 m-0">
          {categories.map(cat => (
            <li key={cat.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b border-outline-variant last:border-0 hover:bg-primary-container/10 gap-2 md:gap-4">
              <span className="text-lg">{cat.name} <small className="text-on-surface/60 text-sm ml-2">({cat.product_count || 0} products)</small></span>
              <div className="flex gap-4 w-full md:w-auto justify-end">
                <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:underline uppercase text-xs tracking-wider min-h-[44px] flex items-center">Edit</button>
                <button onClick={() => initiateDelete(cat.id, cat.product_count || 0)} className="text-red-600 hover:underline uppercase text-xs tracking-wider min-h-[44px] flex items-center">Delete</button>
              </div>
            </li>
          ))}
          {categories.length === 0 && (
            <li className="p-8 text-center text-on-surface/70">No categories found.</li>
          )}
        </ul>
      </div>

      {deleteModal.show && (
        <div className="fixed inset-0 bg-on-surface/20 flex items-center justify-center z-50">
          <div className="bg-surface p-8 border border-outline-variant max-w-md w-full">
            <h3 className="font-headline-md text-xl mb-4 uppercase tracking-widest">Delete Category</h3>
            <p className="mb-6 text-on-surface/80">This category contains products. What should we do with them?</p>
            <div className="flex flex-col gap-4 mb-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="productAction" 
                  value="uncategorize" 
                  checked={deleteModal.productAction === 'uncategorize'}
                  onChange={(e) => setDeleteModal(prev => ({ ...prev, productAction: e.target.value }))}
                  className="w-4 h-4 accent-on-surface"
                />
                Leave products uncategorized
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="productAction" 
                  value="delete" 
                  checked={deleteModal.productAction === 'delete'}
                  onChange={(e) => setDeleteModal(prev => ({ ...prev, productAction: e.target.value }))}
                  className="w-4 h-4 accent-on-surface"
                />
                Delete products as well
              </label>
            </div>
            <div className="flex justify-end gap-4">
              <button onClick={() => setDeleteModal({ show: false, categoryId: null, productAction: 'uncategorize' })} className="px-4 py-2 border border-outline-variant uppercase tracking-widest text-sm hover:bg-primary-container">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white uppercase tracking-widest text-sm hover:opacity-90">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
