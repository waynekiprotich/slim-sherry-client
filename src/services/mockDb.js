const initialCategories = [
  { id: 1, name: 'Handbags', slug: 'handbags', description: 'Classic top-handle handbags.' },
  { id: 2, name: 'Shoulder Bags', slug: 'shoulder-bags', description: 'Chic shoulder bags.' },
  { id: 3, name: 'Crossbody Bags', slug: 'crossbody-bags', description: 'Convenient crossbody bags.' },
  { id: 4, name: 'Tote Bags', slug: 'tote-bags', description: 'Spacious everyday totes.' }
];

const initialProducts = [
  {
    id: 1,
    category_id: 1,
    category: initialCategories[0],
    name: 'Zara Orange Top-Handle Bag',
    slug: 'zara-orange-top-handle-bag',
    description: 'A beautiful zara orange top-handle bag perfect for any occasion.',
    price: 4500.0,
    currency: 'KES',
    note: 'Excellent condition, tags attached',
    available: true,
    published: true,
    created_at: new Date().toISOString(),
    images: [{ id: 6, product_id: 1, image_url: '/images/AB6AXuD-wRoeHDn.webp', sort_order: 1 }]
  },
  {
    id: 2,
    category_id: 4,
    category: initialCategories[3],
    name: 'Classic White Tote',
    slug: 'classic-white-tote',
    description: 'A beautiful classic white tote perfect for any occasion.',
    price: 6500.0,
    currency: 'KES',
    note: 'Brand new, unused',
    available: true,
    published: true,
    created_at: new Date().toISOString(),
    images: [{ id: 7, product_id: 2, image_url: '/images/AB6AXuD0bUQxeNj.webp', sort_order: 1 }]
  },
  {
    id: 3,
    category_id: 4,
    category: initialCategories[3],
    name: 'Emerald Green Tote',
    slug: 'emerald-green-tote',
    description: 'A beautiful emerald green tote perfect for any occasion.',
    price: 8000.0,
    currency: 'KES',
    note: 'Gently used, like new',
    available: true,
    published: true,
    created_at: new Date().toISOString(),
    images: [{ id: 8, product_id: 3, image_url: '/images/AB6AXuD5-n4W2Ek.webp', sort_order: 1 }]
  },
  {
    id: 4,
    category_id: 3,
    category: initialCategories[2],
    name: 'Black Leather Crossbody',
    slug: 'black-leather-crossbody',
    description: 'A beautiful black leather crossbody perfect for any occasion.',
    price: 5500.0,
    currency: 'KES',
    note: 'Great condition, minor wear',
    available: true,
    published: true,
    created_at: new Date().toISOString(),
    images: [{ id: 9, product_id: 4, image_url: '/images/AB6AXuDoF2MdHTS.webp', sort_order: 1 }]
  }
];

const initialSettings = {
  business_name: 'Slim Sherry',
  tagline: 'Quality you can feel. Style you can flaunt.',
  phone: '+254713879056',
  whatsapp: '+254713879056',
  email: 'floragacheri8@gmail.com',
  instagram: 'luxebagke',
  delivery_statement: 'Secure Delivery Across Kenya'
};

export function initMockDb() {
  if (!localStorage.getItem('mock_categories')) {
    localStorage.setItem('mock_categories', JSON.stringify(initialCategories));
  }
  if (!localStorage.getItem('mock_products')) {
    localStorage.setItem('mock_products', JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem('mock_settings')) {
    localStorage.setItem('mock_settings', JSON.stringify(initialSettings));
  }
}

export function getDb(key) {
  return JSON.parse(localStorage.getItem(`mock_${key}`)) || [];
}

export function setDb(key, data) {
  localStorage.setItem(`mock_${key}`, JSON.stringify(data));
}
