import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../../services/api';
import { useToast } from '../../components/Toast';

const ProductForm = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    published: true,
    available: true,
    images: [] // existing images from backend
  });
  
  const [newFiles, setNewFiles] = useState([]); // files selected for upload
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [priceError, setPriceError] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const cats = await adminApi.getCategories();
        setCategories(cats.data);
        if (isEditing) {
          const prodResult = await adminApi.getProduct(id);
          const prod = prodResult.data;
          setFormData({
            name: prod.name || '',
            description: prod.description || '',
            price: prod.price || '',
            category_id: prod.category_id || '',
            published: prod.published ?? true,
            available: prod.available ?? true,
            images: prod.images || []
          });
        }
      } catch (err) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'price') {
      if (parseFloat(value) <= 0) {
        setPriceError('Price must be greater than 0');
      } else {
        setPriceError(null);
      }
    }
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileSelect = (e) => {
    setFileError(null);
    const files = Array.from(e.target.files);
    const validFiles = [];
    let hasError = false;

    for (const file of files) {
      if (file.size > 8 * 1024 * 1024) {
        hasError = true;
      } else {
        validFiles.push(file);
      }
    }

    if (hasError) {
      setFileError('One or more files exceeded the 8MB limit and were not added.');
    }

    if (validFiles.length) {
      setNewFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleExistingImageDelete = async (imageId) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await adminApi.deleteImage(id, imageId);
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter(img => img.id !== imageId)
      }));
      addToast('Image deleted successfully', 'success');
    } catch (err) {
      addToast('Failed to delete image: ' + err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.price) <= 0) {
      setPriceError('Price must be greater than 0');
      return;
    }
    setLoading(true);
    setError(null);
    setUploadProgress('');
    try {
      let productId = id;
      
      setUploadProgress('Saving product details...');
      if (isEditing) {
        await adminApi.updateProduct(id, formData);
      } else {
        const result = await adminApi.createProduct(formData);
        productId = result.data.id;
      }
      
      if (newFiles.length > 0) {
        setUploadProgress('Uploading images...');
        await adminApi.uploadImages(productId, newFiles);
      }
      
      addToast(`Product ${isEditing ? 'updated' : 'created'} successfully!`, 'success');
      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Failed to save product');
      setLoading(false);
      setUploadProgress('');
    }
  };

  if (loading && isEditing && !formData.name) return <div className="p-4 font-body-md">Loading...</div>;
  if (error && !isEditing) return <div className="p-4 font-body-md text-red-600">Error: {error}</div>;

  return (
    <div className="font-body-md max-w-3xl pb-20">
      <h1 className="font-headline-md text-2xl md:text-3xl mb-4 md:mb-8 uppercase tracking-widest">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
      {error && <div className="p-4 border border-red-600 text-red-600 mb-6">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]" />
        </div>
        
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="flex-1 w-full">
            <label className="block mb-2 uppercase tracking-wider text-sm">Price (KES)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" className={`w-full p-3 border focus:outline-none focus:border-on-surface bg-surface min-h-[44px] ${priceError ? 'border-red-600' : 'border-outline-variant'}`} />
            {priceError && <p className="text-red-600 text-xs mt-1">{priceError}</p>}
          </div>
          <div className="flex-1 w-full">
            <label className="block mb-2 uppercase tracking-wider text-sm">Category</label>
            <select name="category_id" value={formData.category_id} onChange={handleChange} required className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]">
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-4 border border-outline-variant bg-primary-container/20">
          <label className="flex items-center gap-2 cursor-pointer uppercase tracking-wider text-sm min-h-[44px]">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 accent-on-surface" />
            Published (Visible on site)
          </label>
          <label className="flex items-center gap-2 cursor-pointer uppercase tracking-wider text-sm min-h-[44px]">
            <input type="checkbox" name="available" checked={formData.available} onChange={handleChange} className="w-5 h-5 accent-on-surface" />
            In Stock
          </label>
        </div>
        
        <div className="mt-4">
          <h3 className="block mb-4 uppercase tracking-wider text-sm font-bold border-b border-outline-variant pb-2">Product Images</h3>
          
          {/* Existing Images */}
          {formData.images.length > 0 && (
            <div className="mb-6">
              <p className="text-sm mb-2 text-on-surface/70">Current Images:</p>
              <div className="flex gap-4 flex-wrap">
                {formData.images.map((img) => (
                  <div key={img.id} className="relative border border-outline-variant p-2 group bg-surface">
                    <img src={img.image_url} alt="product" className="w-24 h-24 object-cover" />
                    <button type="button" onClick={() => handleExistingImageDelete(img.id)} className="mt-2 w-full px-2 py-1 text-xs text-red-600 border border-outline-variant hover:bg-red-600 hover:text-white transition-colors min-h-[44px]">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div>
            <p className="text-sm mb-2 text-on-surface/70">Upload New Images:</p>
            <div className="relative w-full border-2 border-dashed border-outline-variant hover:border-on-surface transition-colors bg-surface p-6 md:p-8 text-center cursor-pointer">
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                onChange={handleFileSelect} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                title="Click or drag to upload images"
              />
              <span className="material-symbols-outlined text-4xl text-on-surface/50 mb-2">add_photo_alternate</span>
              <p className="uppercase tracking-wider text-sm">Click or drag files here to upload</p>
            </div>
            {fileError && <p className="text-red-600 text-xs mt-1">{fileError}</p>}
            
            {newFiles.length > 0 && (
              <div className="mt-4 flex gap-4 flex-wrap">
                {newFiles.map((file, idx) => (
                  <div key={idx} className="relative border border-outline-variant p-2 group bg-surface">
                    <div className="w-24 h-24 bg-surface-variant flex items-center justify-center text-xs text-center break-all p-1 overflow-hidden">
                      {file.name}
                    </div>
                    <button type="button" onClick={() => removeNewFile(idx)} className="mt-2 w-full px-2 py-1 text-xs text-red-600 border border-outline-variant hover:bg-red-600 hover:text-white transition-colors min-h-[44px]">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-8 pt-6 border-t border-outline-variant">
          <button type="submit" disabled={loading} className="w-full md:w-auto px-8 py-3 min-h-[44px] bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                {uploadProgress || 'Saving...'}
              </>
            ) : 'Save Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="w-full md:w-auto px-8 py-3 min-h-[44px] border border-outline-variant hover:bg-primary-container uppercase tracking-widest text-sm flex items-center justify-center">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
