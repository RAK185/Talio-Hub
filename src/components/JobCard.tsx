import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { MapPin, DollarSign, Bookmark, Sparkles, Building, ArrowUpRight, Clock } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onApplyClick?: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApplyClick }) => {
  const { toggleBookmark, isJobSaved } = useAuth();
  const saved = isJobSaved(job.id);

  const formatSalary = (min: number, max: number, period: string) => {
    const formattedMin = min >= 1000 ? `$${(min / 1000).toFixed(0)}k` : `$${min}`;
    const formattedMax = max >= 1000 ? `$${(max / 1000).toFixed(0)}k` : `$${max}`;
    return `${formattedMin} - ${formattedMax} / ${period.toLowerCase()}`;
  };

  const getTimeAgo = (dateStr: string) => {
    const diffHours = Math.floor((new Date().getTime() - new Date(dateStr).getTime()) / (1000 * 60 * 60));
    if (diffHours < 24) return `${Math.max(1, diffHours)}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="group relative rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 p-5 transition-all duration-300 shadow-xl flex flex-col justify-between">
      
      {/* Top Row: Company Logo, Title, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3.5">
            <img
              src={job.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
              alt={job.companyName}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-white/10 bg-white/10 p-1 shrink-0"
            />
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-sm text-slate-400 flex items-center gap-1 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {job.companyName} • {job.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleBookmark(job.id)}
            className={`p-2.5 rounded-xl border transition-all ${
              saved
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={saved ? 'Remove Bookmark' : 'Save Job'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 bg-green-500/10 text-green-400 rounded-md">
            {job.jobType}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 border border-white/10 bg-white/5 px-2.5 py-1 rounded">
            {job.experienceLevel}
          </span>
          <span className="text-[10px] uppercase tracking-wider font-bold text-blue-300 border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 rounded">
            {job.category}
          </span>
          {job.isFeatured && (
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-amber-400" />
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div>
          <span className="font-bold text-white text-base block">
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" />
            {getTimeAgo(job.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/jobs/${job.id}`}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            Details
          </Link>
          <button
            onClick={() => onApplyClick ? onApplyClick(job) : null}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
          >
            Apply <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
