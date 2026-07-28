import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Application, Job } from '../types';
import { JobCard } from '../components/JobCard';
import { ApplyModal } from '../components/ApplyModal';
import {
  User,
  FileText,
  Bookmark,
  Send,
  Sparkles,
  Upload,
  Plus,
  X,
  MapPin,
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Award,
} from 'lucide-react';

export const ApplicantDashboard: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, token, updateUser } = useAuth();
  const { showToast } = useTheme();

  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'saved' | 'aiCoach'>(
    (searchParams.get('tab') as 'profile' | 'applications' | 'saved' | 'aiCoach') || 'profile'
  );

  // Applications & Saved Jobs State
  const [applications, setApplications] = useState<Application[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  // Profile Form State
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [title, setTitle] = useState(user?.title || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // AI Career Advice State
  const [targetRole, setTargetRole] = useState(user?.title || 'Senior Software Engineer');
  const [aiAdvice, setAiAdvice] = useState<{
    advice: string;
    keyQuestions: string[];
    skillRoadmap: string[];
  } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setTitle(user.title || '');
      setLocation(user.location || '');
      setBio(user.bio || '');
      setSkills(user.skills || []);
    }
  }, [user]);

  // Fetch Applications & Saved Jobs
  useEffect(() => {
    if (!token) return;

    // Fetch my applications
    setLoadingApps(true);
    fetch('/api/applications/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setApplications(data.applications || []))
      .catch(console.error)
      .finally(() => setLoadingApps(false));

    // Fetch saved jobs details
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        const allJobs: Job[] = data.jobs || [];
        const saved = allJobs.filter(j => user?.savedJobs?.includes(j.id));
        setSavedJobs(saved);
      })
      .catch(console.error);
  }, [token, user?.savedJobs]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setIsUpdatingProfile(true);
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          phone,
          title,
          location,
          bio,
          skills,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        showToast('Profile updated successfully!', 'success');
      } else {
        showToast(data.error || 'Failed to update profile', 'error');
      }
    } catch {
      showToast('Error saving profile', 'error');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch('/api/users/upload-resume', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        showToast('Resume uploaded successfully!', 'success');
      }
    } catch {
      showToast('Failed uploading resume', 'error');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/users/upload-avatar', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        updateUser(data.user);
        showToast('Avatar updated!', 'success');
      }
    } catch {
      showToast('Failed uploading avatar', 'error');
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const generateCareerAdvice = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/career-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: user?.title || 'Developer',
          skills: user?.skills || [],
          targetRole,
        }),
      });

      const data = await res.json();
      setAiAdvice(data);
      showToast('Generated tailored career advice!', 'success');
    } catch {
      showToast('Failed to generate career advice', 'error');
    } finally {
      setIsAiLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Accepted':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Accepted</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Rejected</span>;
      case 'Reviewed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> Under Review</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-500/40"
            />
            <label className="absolute inset-0 bg-slate-950/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
              <Upload className="w-5 h-5 text-white" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{user?.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Applicant Portal
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{user?.title || 'Software Professional'}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5" /> {user?.location || 'San Francisco, CA'}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
            <span className="text-xl font-black text-blue-400">{applications.length}</span>
            <p className="text-[10px] text-slate-400 font-medium">Applied Jobs</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
            <span className="text-xl font-black text-amber-400">{user?.savedJobs?.length || 0}</span>
            <p className="text-[10px] text-slate-400 font-medium">Saved Jobs</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
            <span className="text-xl font-black text-emerald-400">
              {applications.filter(a => a.status === 'Accepted').length}
            </span>
            <p className="text-[10px] text-slate-400 font-medium">Interview Calls</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          Profile & Resume
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'applications'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Send className="w-4 h-4" />
          My Applications ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'saved'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          Saved Bookmarks ({user?.savedJobs?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('aiCoach')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'aiCoach'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-blue-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Career Coach
        </button>
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Edit Form */}
          <form onSubmit={handleProfileSave} className="lg:col-span-2 space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">Edit Profile Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Professional Bio</label>
              <textarea
                rows={4}
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Share a short overview of your software background and passion..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Skills Tag Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Technical Skills & Tools</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                  placeholder="e.g. React, Docker, Python..."
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-500"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-medium"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="hover:text-rose-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isUpdatingProfile}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg transition-colors"
              >
                {isUpdatingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>

          {/* Resume Box */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Resume Document
              </h2>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-2">
                <p className="text-xs font-bold text-white truncate">{user?.resumeName || 'No resume uploaded'}</p>
                <p className="text-[10px] text-slate-400">Uploaded resume used for one-click job applications and AI skill matching.</p>
              </div>

              <label className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload New Resume PDF</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <h2 className="text-base font-bold text-white pb-3 border-b border-slate-800">My Job Applications</h2>

          {loadingApps ? (
            <div className="py-12 text-center text-xs text-slate-400">Fetching applications...</div>
          ) : applications.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <p className="text-sm text-slate-400">You haven't applied to any job roles yet.</p>
              <Link to="/jobs" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold">
                Browse Open Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map(app => (
                <div key={app.id} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={app.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
                      alt={app.companyName}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700 bg-slate-800 p-1"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white">{app.jobTitle}</h3>
                      <p className="text-xs text-slate-400">{app.companyName} • Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {app.matchScore && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {app.matchScore}% Match
                      </span>
                    )}
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <h2 className="text-base font-bold text-white">Bookmarked Positions</h2>
          {savedJobs.length === 0 ? (
            <div className="py-12 text-center p-8 rounded-3xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
              No bookmarked jobs yet. Click the bookmark icon on any job card to save it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs.map(job => (
                <JobCard key={job.id} job={job} onApplyClick={j => setSelectedJobForApply(j)} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: AI CAREER COACH */}
      {activeTab === 'aiCoach' && (
        <div className="space-y-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> AI Powered Career Advisor
            </span>
            <h2 className="text-2xl font-extrabold text-white">Customized Interview & Growth Strategy</h2>
            <p className="text-xs text-slate-400">Receive instant AI guidance, technical interview questions, and roadmap items tailored to your profile.</p>
          </div>

          {/* Target Role Input */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
            <input
              type="text"
              value={targetRole}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="Enter target role (e.g. Lead AI Engineer)..."
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none"
            />
            <button
              onClick={generateCareerAdvice}
              disabled={isAiLoading}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-lg shrink-0"
            >
              {isAiLoading ? 'Analyzing with Gemini...' : 'Generate AI Advice'}
            </button>
          </div>

          {/* AI Result Card */}
          {aiAdvice && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              
              <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2">
                <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Strategic Advice
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">{aiAdvice.advice}</p>
              </div>

              {/* Key Interview Questions */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Key Technical Interview Scenarios</h3>
                <div className="space-y-2">
                  {aiAdvice.keyQuestions?.map((q, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-200 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Roadmap */}
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Skill Advancement Roadmap</h3>
                <div className="flex flex-wrap gap-2">
                  {aiAdvice.skillRoadmap?.map((item, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium">
                      🚀 {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Apply Modal */}
      {selectedJobForApply && (
        <ApplyModal job={selectedJobForApply} onClose={() => setSelectedJobForApply(null)} />
      )}
    </div>
  );
};
