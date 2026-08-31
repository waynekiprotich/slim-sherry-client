import React, { useEffect, useState } from 'react';
import { adminApi } from '../../services/api';
import { useToast } from '../../components/Toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    store_name: '',
    contact_email: '',
    currency: 'USD',
    tax_rate: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToast();

  const loadSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminApi.getSettings();
      const data = result.data || {};
      setSettings({
        store_name: data.store_name || '',
        contact_email: data.contact_email || '',
        currency: data.currency || 'USD',
        tax_rate: data.tax_rate || ''
      });
    } catch (err) {
      setError(err.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await adminApi.updateSettings(settings);
      addToast('Settings saved successfully!', 'success');
    } catch (err) {
      addToast('Failed to save settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4 font-body-md">Loading settings...</div>;

  if (error) return (
    <div className="font-body-md max-w-xl">
      <div className="p-8 border border-red-600 bg-red-50 text-red-600 flex flex-col items-center">
        <span className="material-symbols-outlined text-4xl mb-4">error</span>
        <h2 className="text-xl font-bold mb-2 uppercase tracking-widest">Error Loading Settings</h2>
        <p>{error}</p>
        <button onClick={loadSettings} className="mt-4 px-6 py-2 border border-red-600 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest text-sm">Try Again</button>
      </div>
    </div>
  );

  return (
    <div className="font-body-md max-w-xl">
      <h1 className="font-headline-md text-2xl md:text-3xl mb-4 md:mb-8 uppercase tracking-widest">Store Settings</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Store Name</label>
          <input type="text" name="store_name" value={settings.store_name} onChange={handleChange} required className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]" />
        </div>
        
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Contact Email</label>
          <input type="email" name="contact_email" value={settings.contact_email} onChange={handleChange} required className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]" />
        </div>
        
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Currency</label>
          <select name="currency" value={settings.currency} onChange={handleChange} className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="KES">KES (KSh)</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-2 uppercase tracking-wider text-sm">Tax Rate (%)</label>
          <input type="number" name="tax_rate" value={settings.tax_rate} onChange={handleChange} step="0.01" min="0" className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface min-h-[44px]" />
        </div>
        
        <button type="submit" disabled={saving} className="mt-4 px-8 py-3 bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-50 self-start min-h-[44px] flex justify-center items-center w-full md:w-auto">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
