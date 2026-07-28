import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Talio <span className="text-blue-400">Hub</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white pt-2">Create Your Account</h2>
          <p className="text-xs text-slate-400">Join the AI career hub for developers and recruiters.</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setRole('applicant')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'applicant'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            Job Seeker
          </button>

          <button
            type="button"
            onClick={() => setRole('recruiter')}
            className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              role === 'recruiter'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-4 h-4" />
            Recruiter / Employer
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {role === 'recruiter' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                <Building className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="e.g. TechPulse AI"
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={role === 'applicant' ? 'e.g. Senior Full Stack Engineer' : 'e.g. Talent Acquisition Lead'}
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl font-bold text-xs text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Creating Account...' : 'Register Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
