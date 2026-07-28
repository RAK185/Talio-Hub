import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';

interface AiMatchModalProps {
  job: Job | null;
  onClose: () => void;
}

export const AiMatchModal: React.FC<AiMatchModalProps> = ({ job, onClose }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    matchScore: number;
    strengths: string[];
    missingSkills: string[];
    summary: string;
  } | null>(null);

  useEffect(() => {
    if (!job) return;

    const analyzeMatch = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/ai/match-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userSkills: user?.skills || ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
            jobDescription: job.description,
            jobRequirements: job.requirements,
          }),
        });

        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error('Failed AI analysis:', err);
      } finally {
        setLoading(false);
      }
    };

    analyzeMatch();
  }, [job, user]);

  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Skill & Resume Matcher</h2>
            <p className="text-xs text-slate-400">Powered by Gemini AI Engine</p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-4 text-center">
            <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
            <p className="text-sm font-semibold text-white">Analyzing profile alignment against {job.title}...</p>
            <p className="text-xs text-slate-400 max-w-xs">Comparing your skills, experience history, and job parameters...</p>
          </div>
        ) : result ? (
          <div className="space-y-6">
            
            {/* Score Radial Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Calculated Alignment</span>
                <h3 className="text-2xl font-black text-white mt-1">{job.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{job.companyName}</p>
              </div>

              <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-slate-950 border-4 border-blue-500 text-blue-400 shadow-xl shrink-0">
                <span className="text-xl font-extrabold">{result.matchScore}%</span>
                <span className="text-[9px] font-mono text-slate-400">Match</span>
              </div>
            </div>

            {/* AI Summary */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-400">
                <Lightbulb className="w-4 h-4" />
                <span>AI Insights & Recommendation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{result.summary}</p>
            </div>

            {/* Strengths */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Key Profile Strengths
              </h4>
              <ul className="space-y-1.5">
                {result.strengths?.map((s, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-800/30 p-2 rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Skills */}
            {result.missingSkills?.length > 0 && (
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Recommended Skills to Highlight
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills?.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      + {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
