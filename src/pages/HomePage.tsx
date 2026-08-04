import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Job, Company } from '../types';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { AiMatchModal } from '../components/AiMatchModal';
import { AIJobRecommendations } from '../components/AIJobRecommendations';
import ShaderDemo from '../components/ui/hive';
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
    { name: 'Software Engineering', count: '1,240+ Jobs', icon: Code },
    { name: 'Data Science & AI', count: '850+ Jobs', icon: Sparkles },
    { name: 'Product Management', count: '620+ Jobs', icon: Layers },
    { name: 'Design & UX', count: '430+ Jobs', icon: Palette },
    { name: 'DevOps & Cloud', count: '510+ Jobs', icon: Zap },
    { name: 'Finance & Banking', count: '390+ Jobs', icon: DollarSign },
  ];

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 font-sans transition-colors">
      
      {/* HERO SECTION WITH WEBGL HIVE SHADER BACKDROP */}
      <section className="relative py-14 sm:py-20 overflow-hidden rounded-3xl border border-stone-200 dark:border-white/10 bg-stone-900 dark:bg-[#0C0A09] text-white shadow-2xl transition-colors">
        {/* Animated Hive Shader Background */}
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-50 pointer-events-none mix-blend-screen overflow-hidden">
          <ShaderDemo />
        </div>
        
        {/* Dark Vignette Overlay for Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-900/40 dark:from-[#0C0A09] dark:via-[#0C0A09]/70 dark:to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-800/90 dark:bg-[#1C1917]/90 border border-stone-600 dark:border-[#D4F268]/30 backdrop-blur-md text-xs font-mono text-[#D4F268]">
              <span className="w-2 h-2 rounded-full bg-[#D4F268] animate-ping" />
              <span>[SYSTEM_SPEC_2026] HIVE INTELLIGENCE MATCHING ENGINE</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-7xl font-serif font-light leading-[1.08] tracking-tight text-white">
              High-fidelity talent matching, <br />
              <span className="italic font-normal text-[#D4F268]">
                engineered with natural precision.
              </span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg font-sans max-w-2xl leading-relaxed">
              Connect directly with high-growth teams and specialized technical environments. Built for professionals who value algorithmic matching without recruiter friction.
            </p>
          </div>

          {/* Brutalist Naturalist Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 w-full p-2.5 sm:p-3 bg-white/10 dark:bg-[#1C1917]/90 border border-white/20 dark:border-white/10 rounded-2xl flex flex-col md:flex-row items-center shadow-2xl gap-3 backdrop-blur-md"
          >
            <div className="flex-1 flex items-center px-4 w-full border-b md:border-b-0 md:border-r border-white/20 dark:border-white/10 py-1.5">
              <Search className="w-5 h-5 text-[#D4F268] mr-3 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Role title, tech stack, or engineering team"
                className="bg-transparent w-full outline-none text-white placeholder-stone-300 dark:placeholder-stone-400 py-2 text-sm font-sans"
              />
            </div>

            <div className="flex-1 flex items-center px-4 w-full py-1.5">
              <MapPin className="w-5 h-5 text-stone-300 dark:text-stone-400 mr-3 shrink-0" />
              <input
                type="text"
                value={locationTerm}
                onChange={e => setLocationTerm(e.target.value)}
                placeholder="Geographic location or [REMOTE]"
                className="bg-transparent w-full outline-none text-white placeholder-stone-300 dark:placeholder-stone-400 py-2 text-sm font-mono"
              />
            </div>

            <button
              type="submit"
              className="bg-[#D4F268] hover:bg-lime-300 text-[#0C0A09] px-7 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#D4F268]/20 shrink-0 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH POSITIONS</span>
            </button>
          </form>

          {/* Popular Tag Quick Links */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-300">
            <span className="text-stone-300 dark:text-stone-400 font-bold uppercase">[POPULAR_VECTORS]:</span>
            {['React Developer', 'Full Stack', 'Remote Jobs', 'AI Engineer', 'DevOps', 'UI/UX Designer'].map(tag => (
              <button
                key={tag}
                onClick={() => navigate(`/jobs?search=${encodeURIComponent(tag)}`)}
                className="px-3 py-1 rounded-xl bg-stone-800/80 dark:bg-[#1C1917]/80 hover:border-[#D4F268]/60 border border-white/20 dark:border-white/10 text-stone-200 hover:text-[#D4F268] transition-colors cursor-pointer backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl transition-colors">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268] shrink-0 font-mono text-xs font-bold">
              01
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-stone-900 dark:text-white">42,109</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400">Active Postings</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268] shrink-0 font-mono text-xs font-bold">
              02
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-stone-900 dark:text-white">12.5k</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400">Verified Teams</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268] shrink-0 font-mono text-xs font-bold">
              03
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-stone-900 dark:text-white">180k+</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400">Active Candidates</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-emerald-600 dark:text-[#D4F268] shrink-0 font-mono text-xs font-bold">
              04
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 dark:text-[#D4F268]">98.4%</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-stone-600 dark:text-stone-400">Match Precision</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-800 dark:text-[#D4F268] uppercase tracking-widest">[DOMAINS]</span>
            <h2 className="text-2xl sm:text-4xl font-serif italic font-light text-stone-900 dark:text-[#E7E5E4] mt-1">
              Engineered <span className="not-italic font-sans font-semibold">Specializations</span>
            </h2>
          </div>
          <Link to="/jobs" className="flex items-center gap-2 text-xs font-mono font-bold text-stone-900 dark:text-[#D4F268] hover:underline">
            <span>BROWSE ALL DOMAINS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => navigate(`/jobs?category=${encodeURIComponent(cat.name)}`)}
                className="group cursor-pointer p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 hover:border-stone-400 dark:hover:border-[#D4F268]/50 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-[#D4F268]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-stone-600 dark:text-stone-400">{cat.count}</span>
                </div>
                <h3 className="text-lg font-serif italic text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#D4F268] transition-colors">{cat.name}</h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 font-sans">High-impact engineering, research, and technical leadership roles.</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI RECOMMENDATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AIJobRecommendations
          title="Personalized Vector Opportunities"
          subtitle="Real-time candidate-to-position mapping derived from technical skill matrices"
          limit={3}
          showSkillsCustomizer={true}
        />
      </section>

      {/* FEATURED JOBS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-stone-800 dark:text-[#D4F268] uppercase tracking-widest">[CURATED]</span>
            <h2 className="text-2xl sm:text-4xl font-serif italic text-stone-900 dark:text-[#E7E5E4] mt-1">
              Featured <span className="not-italic font-sans font-semibold">Technical Openings</span>
            </h2>
          </div>
          <Link
            to="/jobs"
            className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-xs font-mono font-bold text-white transition-colors border border-stone-800 dark:border-white/10 shadow-sm"
          >
            EXPLORE ALL POSITIONS
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-mono font-bold text-stone-800 dark:text-[#D4F268] uppercase tracking-widest">[ORGANIZATIONS]</span>
          <h2 className="text-2xl sm:text-4xl font-serif italic text-stone-900 dark:text-white">Top Technical Ecosystems Hiring</h2>
          <p className="text-xs font-mono text-stone-600 dark:text-stone-400">Direct integration with engineering teams building modern infrastructure.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topCompanies.map(comp => (
            <div
              key={comp.id}
              onClick={() => navigate(`/jobs?company=${encodeURIComponent(comp.name)}`)}
              className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 hover:border-stone-400 dark:hover:border-[#D4F268]/50 transition-all flex flex-col items-center text-center group cursor-pointer shadow-md"
            >
              <img
                src={comp.logo}
                alt={comp.name}
                className="w-14 h-14 rounded-2xl object-cover ring-1 ring-stone-200 dark:ring-white/10 bg-stone-50 dark:bg-stone-900 p-1 mb-3 group-hover:scale-105 transition-transform"
              />
              <h3 className="text-base font-serif italic text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#D4F268] transition-colors">{comp.name}</h3>
              <p className="text-xs font-mono text-stone-600 dark:text-stone-400 mt-0.5">{comp.industry}</p>
              <span className="mt-4 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-[#D4F268]/30">
                {comp.jobsCount} OPEN ROLES
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 relative overflow-hidden shadow-xl transition-colors">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="flex items-center justify-center gap-1.5 text-amber-500 dark:text-[#D4F268]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-500 dark:fill-[#D4F268]" />
              ))}
            </div>

            <p className="text-lg sm:text-2xl font-serif italic text-stone-800 dark:text-[#E7E5E4] leading-relaxed">
              "Talio Hub bypassed the noise of conventional job portals. The resume match signal connected me with TechPulse AI directly, matching my deep-learning skillset in under two days."
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                alt="Alex Morgan"
                className="w-11 h-11 rounded-full object-cover ring-2 ring-stone-900 dark:ring-[#D4F268]"
              />
              <div className="text-left">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">Alex Morgan</h4>
                <p className="text-xs font-mono text-stone-600 dark:text-stone-400">Staff AI Engineer at TechPulse</p>
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
