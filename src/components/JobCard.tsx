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
    <div className="group relative rounded-xl bg-[#1C1917] border border-white/10 hover:border-[#D4F268]/60 hover:bg-[#221E1B] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_-12px_rgba(212,242,104,0.2)] flex flex-col justify-between">
      
      {/* Top Row: Company Logo, Title, Bookmark */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <img
              src={job.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
              alt={job.companyName}
              className="w-12 h-12 rounded-lg object-cover ring-1 ring-white/10 bg-stone-900 p-1 shrink-0 group-hover:scale-105 transition-transform"
            />
            <div>
              <h3 className="font-serif italic font-normal text-xl text-[#E7E5E4] group-hover:text-[#D4F268] transition-colors line-clamp-1">
                <Link to={`/jobs/${job.id}`}>{job.title}</Link>
              </h3>
              <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-1 font-mono">
                <Building className="w-3.5 h-3.5 text-stone-500" />
                {job.companyName} <span className="text-stone-600">•</span> {job.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleBookmark(job.id)}
            className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
              saved
                ? 'bg-[#D4F268]/20 border-[#D4F268] text-[#D4F268]'
                : 'bg-stone-900/50 border-white/10 text-stone-400 hover:text-white hover:border-white/20'
            }`}
            title={saved ? 'Remove Bookmark' : 'Save Job'}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#D4F268]' : ''}`} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-[11px] font-mono font-semibold px-3 py-1 bg-stone-900 border border-white/10 text-stone-300 rounded-md">
            {job.jobType}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 border border-white/10 bg-stone-900/60 px-3 py-1 rounded-md">
            {job.experienceLevel}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4F268] border border-[#D4F268]/30 bg-[#D4F268]/10 px-3 py-1 rounded-md">
            {job.category}
          </span>
          {job.isFeatured && (
            <span className="text-[11px] font-mono font-bold px-3 py-1 bg-[#D4F268] text-[#0C0A09] rounded-md flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 fill-[#0C0A09]" />
              FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Footer / Action */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <span className="font-mono font-bold text-[#E7E5E4] text-sm block">
            {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
          </span>
          <span className="text-[11px] font-mono text-stone-500 flex items-center gap-1 mt-0.5">
            <Clock className="w-3 h-3" />
            {getTimeAgo(job.createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/jobs/${job.id}`}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 transition-colors border border-white/10"
          >
            Specs
          </Link>
          <button
            onClick={() => onApplyClick ? onApplyClick(job) : null}
            className="flex items-center gap-1 px-5 py-2 rounded-lg text-xs font-bold text-[#0C0A09] bg-[#D4F268] hover:bg-lime-300 transition-all cursor-pointer shadow-md shadow-[#D4F268]/10 group-hover:scale-105"
          >
            Apply <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
