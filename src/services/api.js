import { initMockDb, getDb, setDb } from './mockDb';

// Initialize localStorage DB
initMockDb();

// Token management (mock)
export function getToken() { return localStorage.getItem('auth_token'); }
export function setToken(token) { localStorage.setItem('auth_token', token); }
export function removeToken() { localStorage.removeItem('auth_token'); }
export function isAuthenticated() { return !!getToken(); }

// Helper to simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export const publicApi = {
  getProducts: async (category) => {
    await delay();
    let products = getDb('products').filter(p => p.published && !p.deleted_at);
    if (category) {
      products = products.filter(p => p.category_id == category || (p.category && p.category.slug === category));
    }
    return { data: products };
  },
  getProduct: async (slug) => {
    await delay();
    const products = getDb('products');
    const product = products.find(p => p.slug === slug && p.published && !p.deleted_at);
    if (!product) throw new Error('Product not found');
    return { data: product };
  },
  getCategories: async () => {
    await delay();
    const categories = getDb('categories');
    const products = getDb('products').filter(p => p.published && !p.deleted_at);
    const enriched = categories.map(c => ({
      ...c,
      product_count: products.filter(p => p.category_id === c.id).length
    }));
    return { data: enriched };
  },
  getSettings: async () => {
    await delay();
    return { data: getDb('settings') };
  }
};

export const authApi = {
  login: async (credentials) => {
    await delay(500);
    if (credentials.email === 'admin@slimsherry.com' && credentials.password === 'admin123') {
      const token = 'mock_jwt_token_12345';
      setToken(token);
      return { token, user: { id: 1, email: credentials.email, role: 'admin' } };
    }
    throw new Error('Invalid email or password');
  },
  logout: () => {
    removeToken();
    localStorage.removeItem('auth_user');
  },
  isAuthenticated
};

export const adminApi = {
  getProducts: async () => {
    await delay();
    const products = getDb('products').filter(p => !p.deleted_at);
    return { data: products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) };
  },
  createProduct: async (data) => {
    await delay();
    const products = getDb('products');
    const categories = getDb('categories');
    
    const newProduct = {
      ...data,
      id: Date.now(),
      slug: generateSlug(data.name),
      category: categories.find(c => c.id === parseInt(data.category_id)),
      category_id: parseInt(data.category_id),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: []
    };
    
    products.push(newProduct);
    setDb('products', products);
    return { data: newProduct };
  },
  updateProduct: async (id, data) => {
    await delay();
    const products = getDb('products');
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');
    
    if (data.category_id) {
      data.category = getDb('categories').find(c => c.id === parseInt(data.category_id));
      data.category_id = parseInt(data.category_id);
    }
    
    products[index] = { ...products[index], ...data, updated_at: new Date().toISOString() };
    setDb('products', products);
    return { data: products[index] };
  },
  deleteProduct: async (id) => {
    await delay();
    const products = getDb('products');
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index].deleted_at = new Date().toISOString();
      setDb('products', products);
    }
    return { data: { message: 'Deleted successfully' } };
  },
  uploadImages: async (productId, files) => {
    await delay(1000); // Simulate upload time
    const products = getDb('products');
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) throw new Error('Product not found');
    
    // Generate mock local object URLs for files so they show up immediately
    const newImages = Array.from(files).map((file, i) => ({
      id: Date.now() + i,
      product_id: parseInt(productId),
      image_url: URL.createObjectURL(file), // Works for the current session!
      sort_order: (product.images?.length || 0) + i
    }));
    
    product.images = [...(product.images || []), ...newImages];
    setDb('products', products);
    return { data: { message: 'Images uploaded successfully' } };
  },
  deleteImage: async (productId, imageId) => {
    await delay();
    const products = getDb('products');
    const product = products.find(p => p.id === parseInt(productId));
    if (product && product.images) {
      product.images = product.images.filter(img => img.id !== parseInt(imageId));
      setDb('products', products);
    }
    return { data: { message: 'Image deleted' } };
  },
  reorderImages: async (productId, order) => {
    await delay();
    const products = getDb('products');
    const product = products.find(p => p.id === parseInt(productId));
    if (product && product.images) {
      order.forEach(({ id, sort_order }) => {
        const img = product.images.find(i => i.id === id);
        if (img) img.sort_order = sort_order;
      });
      product.images.sort((a, b) => a.sort_order - b.sort_order);
      setDb('products', products);
    }
    return { data: { message: 'Images reordered' } };
  },
  getCategories: async () => {
    await delay();
    const categories = getDb('categories');
    const products = getDb('products').filter(p => p.published && !p.deleted_at);
    const enriched = categories.map(c => ({
      ...c,
      product_count: products.filter(p => p.category_id === c.id).length
    }));
    return { data: enriched };
  },
  createCategory: async (data) => {
    await delay();
    const categories = getDb('categories');
    const newCategory = {
      ...data,
      id: Date.now(),
      slug: generateSlug(data.name),
      created_at: new Date().toISOString()
    };
    categories.push(newCategory);
    setDb('categories', categories);
    return { data: newCategory };
  },
  updateCategory: async (id, data) => {
    await delay();
    const categories = getDb('categories');
    const index = categories.findIndex(c => c.id === parseInt(id));
    if (index === -1) throw new Error('Category not found');
    
    categories[index] = { ...categories[index], ...data, slug: data.name ? generateSlug(data.name) : categories[index].slug };
    setDb('categories', categories);
    
    // Update category object in products
    const products = getDb('products');
    products.forEach(p => {
      if (p.category_id === parseInt(id)) p.category = categories[index];
    });
    setDb('products', products);
    
    return { data: categories[index] };
  },
  deleteCategory: async (id, action, targetId) => {
    await delay();
    const categories = getDb('categories').filter(c => c.id !== parseInt(id));
    setDb('categories', categories);
    
    const products = getDb('products');
    products.forEach(p => {
      if (p.category_id === parseInt(id)) {
        if (action === 'delete') {
          p.deleted_at = new Date().toISOString();
        } else if (action === 'uncategorize') {
          p.category_id = null;
          p.category = null;
        } else if (action === 'move_to' && targetId) {
          p.category_id = parseInt(targetId);
          p.category = categories.find(c => c.id === parseInt(targetId));
        }
      }
    });
    setDb('products', products);
    
    return { data: { message: 'Category deleted' } };
  },
  getSettings: async () => {
    await delay();
    return { data: getDb('settings') };
  },
  updateSettings: async (data) => {
    await delay();
    setDb('settings', data);
    return { data };
  },
  getDashboard: async () => {
    await delay();
    const products = getDb('products').filter(p => !p.deleted_at);
    const categories = getDb('categories');
    return {
      data: {
        stats: {
          total_products: products.length,
          published_products: products.filter(p => p.published).length,
          total_categories: categories.length
        },
        recent_products: products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)
      }
    };
  }
};
