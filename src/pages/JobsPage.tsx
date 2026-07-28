import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '../types';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { AiMatchModal } from '../components/AiMatchModal';
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
      <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Talio Job Explorer</span>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">Find Your Next Big Career Move</h1>
          <p className="text-xs sm:text-sm text-slate-400">Search thousands of active postings or use our filters to hone in on your desired tech stack and salary band.</p>
        </div>

        {/* Live Search Form */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <Search className="w-4 h-4 text-blue-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Title or keywords..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, region, or Remote..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'recent' | 'salary' | 'popular')}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="recent" className="bg-slate-900 text-white">Sort by Most Recent</option>
              <option value="salary" className="bg-slate-900 text-white">Sort by Highest Salary</option>
              <option value="popular" className="bg-slate-900 text-white">Sort by Popularity</option>
            </select>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-3 rounded-xl bg-blue-600 text-white shrink-0"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters (Desktop) */}
        <aside className="hidden lg:block space-y-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              Filter Jobs
            </h2>
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-blue-400 transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Category</label>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); setPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    category === cat
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Job Type</label>
            <div className="space-y-1">
              {jobTypes.map(jt => (
                <button
                  key={jt}
                  onClick={() => { setJobType(jt); setPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    jobType === jt
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {jt}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Experience Level</label>
            <div className="space-y-1">
              {expLevels.map(exp => (
                <button
                  key={exp}
                  onClick={() => { setExperienceLevel(exp); setPage(1); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    experienceLevel === exp
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Salary Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
              <span>Min Salary</span>
              <span className="text-emerald-400">${salaryMin.toLocaleString()}/yr</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={salaryMin}
              onChange={e => { setSalaryMin(Number(e.target.value)); setPage(1); }}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          {/* Remote Toggle */}
          <div className="pt-2 border-t border-slate-800">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={e => { setRemoteOnly(e.target.checked); setPage(1); }}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-slate-800 border-slate-700"
              />
              <span className="text-xs font-medium text-slate-300">Remote Positions Only</span>
            </label>
          </div>
        </aside>

        {/* Job Listings Column */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* Header info */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Showing <strong className="text-white">{jobs.length}</strong> of <strong className="text-white">{totalJobs}</strong> available jobs</span>
            {(search || category !== 'All' || jobType !== 'All' || experienceLevel !== 'All' || salaryMin > 0) && (
              <button onClick={resetFilters} className="text-blue-400 hover:underline">Clear all filters</button>
            )}
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
              <p className="text-sm text-slate-400">Searching active opportunities...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 text-center p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Jobs Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">We couldn't find any job postings matching your current filter criteria. Try adjusting your search query or location.</p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500 transition-colors"
              >
                Reset Filters
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
            <div className="pt-8 flex items-center justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 text-xs font-semibold text-slate-400">
                Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-800 transition-colors"
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
