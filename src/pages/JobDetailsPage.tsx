import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import { AiMatchModal } from '../components/AiMatchModal';
import {
  MapPin,
  DollarSign,
  Building,
  Calendar,
  CheckCircle2,
  Bookmark,
  Share2,
  Sparkles,
  ArrowLeft,
  Globe,
  Users,
  Briefcase,
  ShieldCheck,
  Send,
  RefreshCw,
} from 'lucide-react';

export const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleBookmark, isJobSaved } = useAuth();

  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/jobs/${id}`)
      .then(res => res.json())
      .then(data => {
        setJob(data.job || null);
        setRelatedJobs(data.relatedJobs || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="py-28 flex flex-col items-center justify-center gap-3 font-sans">
        <RefreshCw className="w-8 h-8 text-stone-900 dark:text-[#D4F268] animate-spin" />
        <p className="text-sm font-mono text-stone-600 dark:text-stone-400">Loading Job Details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4 font-sans">
        <h2 className="text-2xl font-serif italic text-stone-900 dark:text-white">Job Listing Not Found</h2>
        <p className="text-xs text-stone-600 dark:text-stone-400">The position you are looking for may have been filled or archived.</p>
        <Link to="/jobs" className="inline-block px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] text-xs font-bold">
          Back to All Positions
        </Link>
      </div>
    );
  }

  const saved = isJobSaved(job.id);

  const formatSalary = (min: number, max: number, period: string) => {
    return `$${min.toLocaleString()} - $${max.toLocaleString()} / ${period.toLowerCase()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans transition-colors">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </button>

      {/* Main Banner Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl relative overflow-hidden space-y-6">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-white/10">
          <div className="flex items-start gap-4">
            <img
              src={job.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
              alt={job.companyName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-1 ring-stone-200 dark:ring-white/10 bg-white p-1 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-white/10">
                  {job.jobType}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10">
                  {job.experienceLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-white/10">
                  {job.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif italic text-stone-900 dark:text-white">{job.title}</h1>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-medium flex items-center gap-2 mt-1">
                <Building className="w-4 h-4 text-stone-900 dark:text-[#D4F268]" />
                {job.companyName}
                <span className="text-stone-400">•</span>
                <MapPin className="w-4 h-4 text-stone-400" />
                {job.location}
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => toggleBookmark(job.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                saved
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                  : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-amber-500 dark:fill-amber-400' : ''}`} />
            </button>

            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-[#D4F268] text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:border-stone-400 dark:hover:border-[#D4F268]"
            >
              <Sparkles className="w-4 h-4 text-stone-900 dark:text-[#D4F268]" />
              <span>AI Match Analysis</span>
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] text-xs font-bold shadow-lg hover:bg-stone-800 dark:hover:bg-lime-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10">
            <span className="text-[10px] uppercase font-mono text-stone-500">Offered Compensation</span>
            <p className="text-sm font-serif italic font-bold text-stone-900 dark:text-[#D4F268] mt-0.5">{formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10">
            <span className="text-[10px] uppercase font-mono text-stone-500">Location Type</span>
            <p className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">{job.location}</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10">
            <span className="text-[10px] uppercase font-mono text-stone-500">Applicants</span>
            <p className="text-sm font-mono font-bold text-stone-900 dark:text-white mt-0.5">{job.applicantsCount} Applied</p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10">
            <span className="text-[10px] uppercase font-mono text-stone-500">Date Posted</span>
            <p className="text-sm font-mono font-bold text-stone-900 dark:text-white mt-0.5">{new Date(job.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Breakdown Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Detailed Description Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Description */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">Role Description</h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities?.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Key Responsibilities</h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-stone-900 dark:text-[#D4F268] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements?.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Qualifications & Skills</h2>
              <ul className="space-y-2.5">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                    <CheckCircle2 className="w-4 h-4 text-stone-900 dark:text-[#D4F268] shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits?.length > 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">Perks & Compensation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {job.benefits.map((ben, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-white/10 text-xs text-stone-800 dark:text-stone-200 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-stone-900 dark:text-[#D4F268] shrink-0" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Company Info & Related Jobs */}
        <div className="space-y-6">
          
          {/* Company Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-mono font-bold text-stone-900 dark:text-white uppercase tracking-wider">About The Employer</h3>
            <div className="flex items-center gap-3">
              <img
                src={job.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
                alt={job.companyName}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-stone-200 dark:ring-white/10 bg-white p-1"
              />
              <div>
                <h4 className="text-base font-bold text-stone-900 dark:text-white">{job.companyName}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">{job.location}</p>
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans">
              Leading technology organization actively expanding engineering talent on Talio Hub platform.
            </p>

            <button
              onClick={() => setShowApplyModal(true)}
              className="w-full py-3 rounded-2xl bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] text-xs font-bold hover:bg-stone-800 dark:hover:bg-lime-300 transition-colors cursor-pointer"
            >
              Apply for this Position
            </button>
          </div>

          {/* Related Roles */}
          {relatedJobs.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-stone-900 dark:text-white uppercase tracking-wider">Similar Positions</h3>
              <div className="space-y-4">
                {relatedJobs.map(rj => (
                  <JobCard key={rj.id} job={rj} onApplyClick={() => navigate(`/jobs/${rj.id}`)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showApplyModal && (
        <ApplyModal job={job} onClose={() => setShowApplyModal(false)} />
      )}
      {showAiModal && (
        <AiMatchModal job={job} onClose={() => setShowAiModal(false)} />
      )}
    </div>
  );
};
