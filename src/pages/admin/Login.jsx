import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface font-body-md text-on-surface p-4">
      <div className="w-full max-w-md border border-outline-variant p-8 bg-surface">
        <h2 className="font-headline-md text-2xl mb-8 uppercase tracking-widest text-center">Admin Login</h2>
        {error && <div className="p-3 mb-6 border border-red-600 text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 uppercase tracking-wider text-sm">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface"
            />
          </div>
          <div>
            <label className="block mb-2 uppercase tracking-wider text-sm">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border border-outline-variant bg-surface focus:outline-none focus:border-on-surface"
            />
          </div>
          <button type="submit" disabled={loading} className="mt-4 w-full py-3 bg-on-surface text-surface uppercase tracking-widest text-sm hover:opacity-90 disabled:opacity-50 transition-opacity">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
