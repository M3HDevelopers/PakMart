import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields'); return; }
    const success = login(email, password);
    if (success) {
      navigate('/account');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-[var(--color-text)]">Welcome Back</h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Login to your PakMart account</p>
          </div>
          
          {/* Demo accounts */}
          <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] p-3 mb-6 text-xs">
            <p className="font-medium text-[var(--color-text)] mb-1">Demo Accounts:</p>
            <p className="text-[var(--color-text-secondary)]">Customer: ahmed@example.com</p>
            <p className="text-[var(--color-text-secondary)]">Seller: seller@techzone.pk</p>
            <p className="text-[var(--color-text-secondary)]">Admin: admin@pakmart.pk</p>
            <p className="text-[var(--color-text-secondary)]">Super Admin: superadmin@pakmart.pk</p>
            <p className="text-[var(--color-text-muted)] mt-1">Use any password to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-[var(--color-danger)] text-xs p-3 border border-red-200">{error}</div>}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative mt-1">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-3 border rounded-lg outline-none focus:border-orange-500" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-orange-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-orange-600 hover:underline">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-2.5 bg-[#171717] text-[#B7D92B] text-sm font-bold hover:bg-[#2a2a2a] transition-colors">Login</button>
          </form>

          <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
            Don't have an account? <Link to="/register" className="text-[var(--color-accent)] font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const { register } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    register({ name: form.name, email: form.email, phone: form.phone });
    navigate('/account');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-[var(--color-text)]">Create Account</h1>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Join PakMart and start shopping</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-[var(--color-danger)] text-xs p-3 border border-red-200">{error}</div>}
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="03XX-XXXXXXX" className="w-full mt-1 px-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password *</label>
              <input type="password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password *</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({...form, confirmPassword: e.target.value})} className="w-full mt-1 px-4 py-3 border rounded-lg outline-none focus:border-orange-500" />
            </div>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="accent-orange-600 mt-0.5" />
              <span className="text-gray-600">I agree to the <a href="#" className="text-orange-600">Terms & Conditions</a> and <a href="#" className="text-orange-600">Privacy Policy</a></span>
            </label>
            <button type="submit" className="w-full py-2.5 bg-[#171717] text-[#B7D92B] text-sm font-bold hover:bg-[#2a2a2a] transition-colors">Create Account</button>
          </form>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
            Already have an account? <Link to="/login" className="text-[var(--color-accent)] font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
