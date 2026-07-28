import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Job, Application, Company } from '../types';
import {
  Building2,
  Briefcase,
  Plus,
  Users,
  Sparkles,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  DollarSign,
  MapPin,
  RefreshCw,
  Search,
} from 'lucide-react';

export const RecruiterDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const { showToast } = useTheme();

  const [activeTab, setActiveTab] = useState<'overview' | 'postJob' | 'manageJobs' | 'applicants' | 'company'>('overview');

  // State Data
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  // New Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('Software Engineering');
  const [jobType, setJobType] = useState<'Full-Time' | 'Part-Time' | 'Contract' | 'Remote' | 'Internship'>('Full-Time');
  const [experienceLevel, setExperienceLevel] = useState<'Entry Level' | 'Mid Level' | 'Senior Level' | 'Executive'>('Senior Level');
  const [location, setLocation] = useState('San Francisco, CA / Remote');
  const [salaryMin, setSalaryMin] = useState(130000);
  const [salaryMax, setSalaryMax] = useState(170000);
  const [description, setDescription] = useState('');
  const [requirementsText, setRequirementsText] = useState('');
  const [responsibilitiesText, setResponsibilitiesText] = useState('');
  const [benefitsText, setBenefitsText] = useState('');
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Applicant filter by job
  const [applicantFilterJobId, setApplicantFilterJobId] = useState<string>('all');

  const fetchRecruiterData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      // Fetch recruiter apps
      const appsRes = await fetch('/api/applications/recruiter', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const appsData = await appsRes.json();
      setApplications(appsData.applications || []);

      // Fetch all jobs & filter owned by recruiter
      const jobsRes = await fetch('/api/jobs');
      const jobsData = await jobsRes.json();
      const allJobs: Job[] = jobsData.jobs || [];
      const owned = allJobs.filter(j => j.recruiterId === user?.id || user?.role === 'admin');
      setJobs(owned);

      // Fetch company details if exists
      if (user?.companyId) {
        const compRes = await fetch(`/api/companies/${user.companyId}`);
        if (compRes.ok) {
          const compData = await compRes.json();
          setCompany(compData.company);
        }
      }
    } catch (err) {
      console.error('Failed loading recruiter data:', err);
    } font: null;
    setLoading(false);
  };

  useEffect(() => {
    fetchRecruiterData();
  }, [token, user]);

  const handleGenerateJobWithAi = async () => {
    if (!jobTitle) {
      showToast('Please enter a Job Title first', 'error');
      return;
    }
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-job-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: jobTitle,
          companyName: company?.name || 'TechPulse AI',
          category: jobCategory,
          experienceLevel,
        }),
      });

      const data = await res.json();
      if (data.description) setDescription(data.description);
      if (data.requirements) setRequirementsText(data.requirements.join('\n'));
      if (data.responsibilities) setResponsibilitiesText(data.responsibilities.join('\n'));
      if (data.benefits) setBenefitsText(data.benefits.join('\n'));
      showToast('Job description drafted with Gemini AI!', 'success');
    } catch {
      showToast('AI description generation failed', 'error');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleCreateJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsSubmittingJob(true);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: jobTitle,
          category: jobCategory,
          jobType,
          experienceLevel,
          location,
          salaryMin,
          salaryMax,
          salaryPeriod: 'Year',
          description,
          requirements: requirementsText.split('\n').filter(Boolean),
          responsibilities: responsibilitiesText.split('\n').filter(Boolean),
          benefits: benefitsText.split('\n').filter(Boolean),
          companyId: user?.companyId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Job role posted successfully!', 'success');
        setJobs(prev => [data.job, ...prev]);
        setActiveTab('manageJobs');
        // Reset
        setJobTitle('');
        setDescription('');
        setRequirementsText('');
        setResponsibilitiesText('');
        setBenefitsText('');
      } else {
        showToast(data.error || 'Failed to post job', 'error');
      }
    } catch {
      showToast('Error creating job role', 'error');
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return;
    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j.id !== jobId));
        showToast('Job listing deleted', 'info');
      }
    } catch {
      showToast('Failed to delete job', 'error');
    }
  };

  const handleUpdateApplicationStatus = async (appId: string, status: 'Accepted' | 'Rejected' | 'Reviewed') => {
    try {
      const res = await fetch(`/api/applications/${appId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setApplications(prev =>
          prev.map(a => (a.id === appId ? { ...a, status } : a))
        );
        showToast(`Candidate application marked as ${status}`, 'success');
      }
    } catch {
      showToast('Failed updating status', 'error');
    }
  };

  const filteredApplications = applicantFilterJobId === 'all'
    ? applications
    : applications.filter(a => a.jobId === applicantFilterJobId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{company?.name || 'Recruiter Portal'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Verified Hiring Partner
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Logged in as {user?.name} ({user?.email})</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('postJob')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job Role</span>
        </button>
      </div>

      {/* Tabs Nav */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'overview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Overview Metrics
        </button>

        <button
          onClick={() => setActiveTab('postJob')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'postJob' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Plus className="w-4 h-4" />
          Post New Role
        </button>

        <button
          onClick={() => setActiveTab('manageJobs')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'manageJobs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Active Listings ({jobs.length})
        </button>

        <button
          onClick={() => setActiveTab('applicants')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'applicants' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          View Applicants ({applications.length})
        </button>
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-500">Active Job Posts</span>
                <h3 className="text-3xl font-black text-white mt-1">{jobs.length}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                <Briefcase className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-500">Applications Received</span>
                <h3 className="text-3xl font-black text-indigo-400 mt-1">{applications.length}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-slate-500">Accepted Candidates</span>
                <h3 className="text-3xl font-black text-emerald-400 mt-1">
                  {applications.filter(a => a.status === 'Accepted').length}
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Recent Applicants Snapshot */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white">Recent Candidate Submissions</h2>
            {applications.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No candidate applications received yet.</p>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 4).map(app => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{app.applicantName}</h4>
                      <p className="text-xs text-slate-400">Applied for {app.jobTitle}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-400">{app.matchScore}% Match</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: POST NEW JOB ROLE */}
      {activeTab === 'postJob' && (
        <form onSubmit={handleCreateJobSubmit} className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6 max-w-4xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-extrabold text-white">Create New Job Opportunity</h2>
              <p className="text-xs text-slate-400">Fill in details or use Gemini AI to generate structured responsibilities and requirements.</p>
            </div>

            <button
              type="button"
              onClick={handleGenerateJobWithAi}
              disabled={isAiGenerating}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              {isAiGenerating ? 'Drafting...' : 'Generate with AI'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Title</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={e => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Category</label>
              <select
                value={jobCategory}
                onChange={e => setJobCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              >
                <option value="Software Engineering">Software Engineering</option>
                <option value="Data Science">Data Science & AI</option>
                <option value="Product Management">Product Management</option>
                <option value="Design & UX">Design & UX</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Finance & Banking">Finance & Banking</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Type</label>
              <select
                value={jobType}
                onChange={e => setJobType(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              >
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Executive">Executive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="San Francisco, CA / Remote"
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Min Salary ($/yr)</label>
              <input
                type="number"
                value={salaryMin}
                onChange={e => setSalaryMin(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Max Salary ($/yr)</label>
              <input
                type="number"
                value={salaryMax}
                onChange={e => setSalaryMax(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Overview Description</label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe the company mission and core responsibilities for this opening..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Requirements (One per line)</label>
            <textarea
              rows={3}
              value={requirementsText}
              onChange={e => setRequirementsText(e.target.value)}
              placeholder="5+ years experience with React and TypeScript&#10;Deep experience with PostgreSQL..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Key Responsibilities (One per line)</label>
            <textarea
              rows={3}
              value={responsibilitiesText}
              onChange={e => setResponsibilitiesText(e.target.value)}
              placeholder="Lead web application development&#10;Optimize frontend bundle speeds..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Perks & Benefits (One per line)</label>
            <textarea
              rows={3}
              value={benefitsText}
              onChange={e => setBenefitsText(e.target.value)}
              placeholder="Equity options&#10;100% remote flexibility&#10;Unlimited PTO..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmittingJob}
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg transition-colors"
            >
              {isSubmittingJob ? 'Publishing...' : 'Publish Job Listing'}
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: MANAGE JOBS */}
      {activeTab === 'manageJobs' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">Your Active Job Listings</h2>
          {jobs.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No jobs created yet.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map(j => (
                <div key={j.id} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{j.title}</h3>
                    <p className="text-xs text-slate-400">{j.category} • {j.location} • ${j.salaryMin.toLocaleString()} - ${j.salaryMax.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{j.applicantsCount} Applicants • Posted {new Date(j.createdAt).toLocaleDateString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDeleteJob(j.id)}
                      className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20"
                      title="Delete Job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: VIEW APPLICANTS */}
      {activeTab === 'applicants' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
            <h2 className="text-base font-bold text-white">Candidate Applications</h2>
            <select
              value={applicantFilterJobId}
              onChange={e => setApplicantFilterJobId(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
            >
              <option value="all">All Jobs ({applications.length})</option>
              {jobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>

          {filteredApplications.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No candidate applications found for this selection.</p>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map(app => (
                <div key={app.id} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.applicantAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'}
                        alt={app.applicantName}
                        className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white">{app.applicantName}</h4>
                        <p className="text-xs text-slate-400">{app.applicantTitle} • {app.applicantEmail}</p>
                        <p className="text-[10px] text-blue-400 font-semibold mt-0.5">Applied for: {app.jobTitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {app.matchScore}% AI Match
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400' :
                        app.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Cover letter */}
                  {app.coverLetter && (
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 italic">
                      "{app.coverLetter}"
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    {app.resumeUrl ? (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Resume ({app.resumeName || 'Resume.pdf'})
                      </a>
                    ) : <span />}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold hover:bg-rose-500/20"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleUpdateApplicationStatus(app.id, 'Accepted')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500"
                      >
                        Accept Candidate
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
