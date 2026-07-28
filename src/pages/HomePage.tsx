import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Job, Company } from '../types';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { AiMatchModal } from '../components/AiMatchModal';
import {
  Search,
  MapPin,
  Sparkles,
  TrendingUp,
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Code,
  LineChart,
  Layers,
  Palette,
  DollarSign,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [topCompanies, setTopCompanies] = useState<Company[]>([]);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [selectedJobForAi, setSelectedJobForAi] = useState<Job | null>(null);

  useEffect(() => {
    // Fetch initial jobs & companies
    fetch('/api/jobs?limit=6')
      .then(res => res.json())
      .then(data => setFeaturedJobs(data.jobs || []))
      .catch(console.error);

    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setTopCompanies(data.companies || []))
      .catch(console.error);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs?search=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(locationTerm)}`);
  };

  const categories = [
    { name: 'Software Engineering', count: '1,240+ Jobs', icon: Code, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'Data Science & AI', count: '850+ Jobs', icon: Sparkles, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Product Management', count: '620+ Jobs', icon: Layers, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { name: 'Design & UX', count: '430+ Jobs', icon: Palette, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { name: 'DevOps & Cloud', count: '510+ Jobs', icon: Zap, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Finance & Banking', count: '390+ Jobs', icon: DollarSign, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold leading-[1.1] tracking-tight">
              The Future of Hiring <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300">
                Powered by Intelligence.
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              Connect with 500k+ top companies and find roles that match your skill set perfectly using our AI-driven matching engine.
            </p>
          </div>

          {/* Sleek Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 w-full p-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl flex flex-col sm:flex-row items-center shadow-2xl"
          >
            <div className="flex-1 flex items-center px-4 w-full border-b sm:border-b-0 sm:border-r border-white/10 py-1">
              <Search className="w-5 h-5 text-blue-400 mr-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="bg-transparent w-full outline-none text-white placeholder-slate-500 py-3 text-sm"
              />
            </div>

            <div className="flex-1 flex items-center px-4 w-full py-1">
              <MapPin className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
              <input
                type="text"
                value={locationTerm}
                onChange={e => setLocationTerm(e.target.value)}
                placeholder="Location or Remote"
                className="bg-transparent w-full outline-none text-white placeholder-slate-500 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto shrink-0 text-sm flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Search Jobs</span>
            </button>
          </form>

          {/* Popular Tag Quick Links */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Popular:</span>
            {['React Developer', 'Full Stack', 'Remote Jobs', 'AI Engineer', 'DevOps', 'UI/UX Designer'].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?search=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">42,109</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Jobs Posted Today</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">12.5k</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Companies Hiring</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">180,000+</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Job Seekers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">89%</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Match Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Browse Industry Sectors</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Popular Job Categories</h2>
          </div>
          <Link to="/jobs" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300">
            <span>Explore All Roles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                className="group cursor-pointer p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${cat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500">{cat.count}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Explore high-paying roles and remote opportunities.</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED JOBS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Handpicked Opportunities</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Featured Job Openings</h2>
          </div>
          <Link
            to="/jobs"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
          >
            View All Openings
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onApplyClick={j => setSelectedJobForApply(j)}
            />
          ))}
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Industry Leaders</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Top Tech Companies Hiring Now</h2>
          <p className="text-xs text-slate-400 mt-2">Connect with organizations building tomorrow's tech stack.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCompanies.map(comp => (
            <div
              key={comp.id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center text-center group cursor-pointer"
            >
              <img
                src={comp.logo}
                alt={comp.name}
                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-white/10 bg-white/10 p-1 mb-4 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{comp.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{comp.industry}</p>
              <span className="mt-3 px-3 py-1 rounded-md text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {comp.jobsCount} Open Roles
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className="text-lg sm:text-xl font-medium text-slate-200 italic leading-relaxed">
              "Talio Hub's AI match tool completely transformed my job search. Within 48 hours of uploading my resume, I was connected with TechPulse AI for a Senior Full Stack role. The match score was spot on!"
            </p>

            <div className="flex items-center justify-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Alex Morgan"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-white">Alex Morgan</h4>
                <p className="text-xs text-slate-400">Senior Full Stack Engineer at TechPulse AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALS */}
      {selectedJobForApply && (
        <ApplyModal job={selectedJobForApply} onClose={() => setSelectedJobForApply(null)} />
      )}
      {selectedJobForAi && (
        <AiMatchModal job={selectedJobForAi} onClose={() => setSelectedJobForAi(null)} />
      )}

    </div>
  );
};
