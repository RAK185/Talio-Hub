import React, { useState } from 'react';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { X, Upload, Sparkles, Send, CheckCircle2, FileText, User as UserIcon } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose, onSuccess }) => {
  const { user, token } = useAuth();
  const { showToast } = useTheme();

  const [coverLetter, setCoverLetter] = useState('');
  const [resumeName, setResumeName] = useState(user?.resumeName || 'Default_Resume.pdf');
  const [resumeUrl, setResumeUrl] = useState(user?.resumeUrl || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  if (!job) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setResumeUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAiCoverLetter = async () => {
    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/ai/match-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSkills: user?.skills || ['React', 'TypeScript', 'Node.js'],
          jobDescription: job.description,
          jobRequirements: job.requirements,
        }),
      });

      const data = await res.json();
      const generatedLetter = `Dear Hiring Manager at ${job.companyName},\n\nI am excited to express my strong interest in the ${job.title} position. With my background in ${user?.skills?.join(', ') || 'modern engineering software'}, I am eager to contribute to your team.\n\n${data.summary || 'My technical skill set aligns closely with your requirements.'}\n\nThank you for considering my application. I look forward to the opportunity to discuss how my experience can benefit ${job.companyName}.\n\nSincerely,\n${user?.name || 'Applicant'}`;

      setCoverLetter(generatedLetter);
      showToast('Cover letter generated with AI!', 'success');
    } catch {
      showToast('Could not generate cover letter with AI', 'error');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      showToast('Please login to submit your application', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          jobId: job.id,
          coverLetter,
          resumeUrl,
          resumeName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        showToast('Application submitted successfully!', 'success');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        showToast(data.error || 'Failed to submit application', 'error');
      }
    } catch {
      showToast('Error submitting application', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={job.companyLogo || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200'}
            alt={job.companyName}
            className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-700 bg-slate-800 p-1"
          />
          <div>
            <span className="text-xs font-semibold uppercase text-blue-400 tracking-wider">Applying For Position</span>
            <h2 className="text-xl font-extrabold text-white">{job.title}</h2>
            <p className="text-xs text-slate-400">{job.companyName} • {job.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Info Bar */}
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-white">{user?.name}</p>
                <p className="text-slate-400">{user?.email}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
              Verified Candidate
            </span>
          </div>

          {/* Resume Upload section */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Resume Document</label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <FileText className="w-5 h-5 text-blue-400 shrink-0" />
              <div className="flex-1 truncate">
                <p className="text-xs font-semibold text-white truncate">{resumeName}</p>
                <p className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
              </div>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Change</span>
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Cover Letter Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300">Cover Letter (Optional)</label>
              <button
                type="button"
                onClick={generateAiCoverLetter}
                disabled={isAiGenerating}
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 transition-all disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {isAiGenerating ? 'Drafting with Gemini...' : 'Generate with AI'}
              </button>
            </div>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={e => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you are a great fit for this role..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/60 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            />
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
