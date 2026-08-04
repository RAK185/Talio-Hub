import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TalioLogo } from '../components/TalioLogo';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/');
    }
  };

  const handleDemoFill = (role: 'applicant' | 'recruiter' | 'admin') => {
    if (role === 'applicant') {
      setEmail('applicant@taliohub.com');
      setPassword('password123');
    } else if (role === 'recruiter') {
      setEmail('recruiter@taliohub.com');
      setPassword('password123');
    } else {
      setEmail('admin@taliohub.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="w-full max-w-md space-y-8 p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Brand Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <TalioLogo size="lg" />
          <div className="space-y-1">
            <h2 className="text-2xl font-serif italic text-stone-900 dark:text-white">Welcome Back</h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Sign in to access your dashboard, applications, and AI vector tools.
            </p>
          </div>
        </div>

        {/* Quick Demo Pre-fill Buttons */}
        <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-white/10 space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono font-bold text-stone-900 dark:text-[#D4F268] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> [ONE-CLICK DEMO LOGIN]
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('applicant')}
              className="py-2 px-2 rounded-xl bg-white dark:bg-[#1C1917] hover:border-stone-400 dark:hover:border-[#D4F268]/50 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10 text-[11px] font-medium transition-all shadow-sm cursor-pointer"
            >
              Applicant
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('recruiter')}
              className="py-2 px-2 rounded-xl bg-white dark:bg-[#1C1917] hover:border-stone-400 dark:hover:border-[#D4F268]/50 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10 text-[11px] font-medium transition-all shadow-sm cursor-pointer"
            >
              Recruiter
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="py-2 px-2 rounded-xl bg-white dark:bg-[#1C1917] hover:border-stone-400 dark:hover:border-[#D4F268]/50 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10 text-[11px] font-medium transition-all shadow-sm cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Email Address
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Security Password
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <Lock className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-bold text-xs bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] shadow-lg hover:bg-stone-800 dark:hover:bg-lime-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
          Don't have an account?{' '}
          <Link to="/register" className="text-stone-900 dark:text-[#D4F268] font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
