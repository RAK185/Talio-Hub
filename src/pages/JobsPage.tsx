import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '../types';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { AiMatchModal } from '../components/AiMatchModal';
import { JobDensityMap } from '../components/JobDensityMap';
import {
  Search,
  MapPin,
  Filter,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || 'All');
  const [experienceLevel, setExperienceLevel] = useState(searchParams.get('experienceLevel') || 'All');
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [remoteOnly, setRemoteOnly] = useState<boolean>(searchParams.get('jobType') === 'Remote');
  const [sortBy, setSortBy] = useState<'recent' | 'salary' | 'popular'>('recent');

  // Pagination & Fetch State
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  // Modals
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [selectedJobForAi, setSelectedJobForAi] = useState<Job | null>(null);

  // Mobile Filter Drawer State
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search) query.append('search', search);
    if (location) query.append('location', location);
    if (category && category !== 'All') query.append('category', category);
    if (jobType && jobType !== 'All') query.append('jobType', jobType);
    if (experienceLevel && experienceLevel !== 'All') query.append('experienceLevel', experienceLevel);
    if (salaryMin > 0) query.append('salaryMin', String(salaryMin));
    if (remoteOnly) query.append('remoteOnly', 'true');
    if (sortBy) query.append('sortBy', sortBy);
    query.append('page', String(page));
    query.append('limit', '9');

    try {
      const res = await fetch(`/api/jobs?${query.toString()}`);
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotalPages(data.totalPages || 1);
      setTotalJobs(data.totalJobs || 0);
    } catch (err) {
      console.error('Failed fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, location, category, jobType, experienceLevel, salaryMin, remoteOnly, sortBy, page]);

  const categories = ['All', 'Software Engineering', 'Data Science', 'Product Management', 'Design & UX', 'DevOps & Cloud', 'Finance & Banking'];
  const jobTypes = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Remote', 'Internship'];
  const expLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const resetFilters = () => {
    setSearch('');
    setLocation('');
    setCategory('All');
    setJobType('All');
    setExperienceLevel('All');
    setSalaryMin(0);
    setRemoteOnly(false);
    setSortBy('recent');
    setPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Search Header Banner */}
      <div className="p-8 rounded-xl bg-[#1C1917] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono font-bold text-[#D4F268] uppercase tracking-widest">[VECTOR_EXPLORER]</span>
          <h1 className="text-3xl sm:text-5xl font-serif italic text-white">Find Your Next Technical Vector</h1>
          <p className="text-xs sm:text-sm text-stone-400 font-sans">Filter through verified technical specifications or refine by domain, salary matrix, and deployment location.</p>
        </div>

        {/* Live Search Form */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-stone-900 border border-white/10">
            <Search className="w-4 h-4 text-[#D4F268] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Title, keywords, or tech stack..."
              className="w-full bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none font-sans"
            />
          </div>

          <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-stone-900 border border-white/10">
            <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City or [REMOTE]..."
              className="w-full bg-transparent text-xs text-white placeholder-stone-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'recent' | 'salary' | 'popular')}
              className="w-full px-4 py-3 rounded-lg bg-stone-900 border border-white/10 text-xs font-mono text-white focus:outline-none cursor-pointer"
            >
              <option value="recent" className="bg-[#1C1917] text-white">Sort: Most Recent</option>
              <option value="salary" className="bg-[#1C1917] text-white">Sort: Highest Compensation</option>
              <option value="popular" className="bg-[#1C1917] text-white">Sort: Popularity</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-3 rounded-lg bg-[#D4F268] text-[#0C0A09] shrink-0 font-bold"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* D3-POWERED REGIONAL JOB DENSITY VISUALIZER */}
      <JobDensityMap
        onSelectRegion={(regionName) => {
          setLocation(regionName);
          setPage(1);
        }}
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-xl bg-[#1C1917] border border-white/10 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#D4F268]" />
              Filter Vectors
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs font-mono text-stone-400 hover:text-[#D4F268] transition-colors cursor-pointer"
            >
              RESET
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400 mb-2">Domain Category</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    category === cat
                      ? 'bg-[#D4F268] text-[#0C0A09] font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400 mb-2">Engagement Type</label>
            <div className="space-y-1">
              {jobTypes.map(jt => (
                <button
                  key={jt}
                  onClick={() => { setJobType(jt); setPage(1); }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    jobType === jt
                      ? 'bg-[#D4F268] text-[#0C0A09] font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  {jt}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-stone-400 mb-2">Experience Level</label>
            <div className="space-y-1">
              {expLevels.map(exp => (
                <button
                  key={exp}
                  onClick={() => { setExperienceLevel(exp); setPage(1); }}
                  className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    experienceLevel === exp
                      ? 'bg-[#D4F268] text-[#0C0A09] font-bold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-900'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Salary Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono font-bold text-stone-300 mb-2">
              <span>MIN COMPENSATION</span>
              <span className="text-[#D4F268]">${salaryMin.toLocaleString()}/yr</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={salaryMin}
              onChange={e => { setSalaryMin(Number(e.target.value)); setPage(1); }}
              className="w-full accent-[#D4F268] cursor-pointer"
            />
          </div>

          {/* Remote Toggle */}
          <div className="pt-3 border-t border-white/10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={e => { setRemoteOnly(e.target.checked); setPage(1); }}
                className="w-4 h-4 rounded text-[#D4F268] focus:ring-[#D4F268] bg-stone-900 border-stone-700"
              />
              <span className="text-xs font-mono text-stone-300">[REMOTE_POSITIONS_ONLY]</span>
            </label>
          </div>
        </aside>

        {/* Job Listings Column */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Header info */}
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>SHOWING <strong className="text-white">{jobs.length}</strong> OF <strong className="text-white">{totalJobs}</strong> MATCHING POSITIONS</span>
            {(search || category !== 'All' || jobType !== 'All' || experienceLevel !== 'All' || salaryMin > 0) && (
              <button onClick={resetFilters} className="text-[#D4F268] hover:underline cursor-pointer">[CLEAR_FILTERS]</button>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-[#D4F268] animate-spin" />
              <p className="text-xs font-mono text-stone-400">Querying position database...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center p-10 rounded-3xl bg-[#1C1917] border border-white/10 space-y-4">
              <Search className="w-12 h-12 text-stone-600 mx-auto" />
              <h3 className="text-lg font-serif italic text-white">No Positions Match Your Matrix</h3>
              <p className="text-xs font-mono text-stone-400 max-w-sm mx-auto">Try widening your compensation threshold or domain filters.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 rounded-full bg-[#D4F268] text-[#0C0A09] text-xs font-mono font-bold hover:bg-lime-300 transition-colors cursor-pointer"
              >
                RESET VECTOR FILTERS
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApplyClick={j => setSelectedJobForApply(j)}
                />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 flex items-center justify-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-3 rounded-full bg-[#1C1917] border border-white/10 text-stone-300 disabled:opacity-40 hover:border-[#D4F268] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 text-xs font-mono text-stone-400">
                PAGE <strong className="text-[#D4F268]">{page}</strong> OF <strong className="text-white">{totalPages}</strong>
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="p-3 rounded-full bg-[#1C1917] border border-white/10 text-stone-300 disabled:opacity-40 hover:border-[#D4F268] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {selectedJobForApply && (
        <ApplyModal job={selectedJobForApply} onClose={() => setSelectedJobForApply(null)} />
      )}
      {selectedJobForAi && (
        <AiMatchModal job={selectedJobForAi} onClose={() => setSelectedJobForAi(null)} />
      )}
    </div>
  );
};
