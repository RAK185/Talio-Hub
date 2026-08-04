import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TalioLogo } from '../components/TalioLogo';
import { Briefcase, Mail, Lock, User, Building, ArrowRight, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';
import { Role } from '../types';

export const RegisterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>((searchParams.get('role') as Role) || 'applicant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await register({
      name,
      email,
      password,
      role,
      title: title || (role === 'applicant' ? 'Software Professional' : 'Talent Lead'),
      companyName: role === 'recruiter' ? companyName : undefined,
    });
    setIsSubmitting(false);
    if (success) {
      if (role === 'recruiter') navigate('/dashboard/recruiter');
      else navigate('/dashboard/applicant');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="w-full max-w-lg space-y-8 p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <TalioLogo size="lg" />
          <div className="space-y-1">
            <h2 className="text-2xl font-serif italic text-stone-900 dark:text-white">Create Account</h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Join the algorithmic talent infrastructure for candidates & recruiters.
            </p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => setRole('applicant')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              role === 'applicant'
                ? 'bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Job Seeker / Candidate
          </button>

          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              role === 'recruiter'
                ? 'bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] shadow-md'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            Recruiter / Employer
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Full Name
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <User className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Work / Personal Email
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          {role === 'recruiter' && (
            <div>
              <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
                Company Name
              </label>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
                <Building className="w-4 h-4 text-stone-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. TechPulse AI"
                  className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Professional Title
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <Briefcase className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={role === 'applicant' ? 'e.g. Senior Full Stack Engineer' : 'e.g. Talent Acquisition Lead'}
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-stone-700 dark:text-stone-300 mb-1.5 uppercase">
              Password
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-white/10">
              <Lock className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-bold text-xs bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] shadow-lg hover:bg-stone-800 dark:hover:bg-lime-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-600 dark:text-stone-400 font-sans">
          Already registered?{' '}
          <Link to="/login" className="text-stone-900 dark:text-[#D4F268] font-bold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
