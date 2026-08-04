import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, ChevronRight, Zap, Target, CheckCircle2, Bookmark, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { JobRecommendation } from '../types';

interface AIJobRecommendationsProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showSkillsCustomizer?: boolean;
}

export const AIJobRecommendations: React.FC<AIJobRecommendationsProps> = ({
  title = 'AI Personalised Job Recommendations',
  subtitle = 'Engineered using content-based filtering & AI resume matching for your profile',
  limit = 3,
  showSkillsCustomizer = false,
}) => {
  const { user, isJobSaved, toggleBookmark } = useAuth();
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSkills, setActiveSkills] = useState<string[]>(
    user?.skills && user.skills.length > 0
      ? user.skills
      : ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Express']
  );
  const [customSkill, setCustomSkill] = useState<string>('');

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          skills: activeSkills,
          title: user?.title || 'Software Professional',
          limit,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (err) {
      console.error('Failed to load AI job recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, activeSkills, limit]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const addSkill = () => {
    if (customSkill.trim() && !activeSkills.includes(customSkill.trim())) {
      setActiveSkills([...activeSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setActiveSkills(activeSkills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 relative overflow-hidden shadow-xl transition-colors">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4F268]/10 dark:bg-[#D4F268]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-[#D4F268]/10 border border-stone-200 dark:border-[#D4F268]/20 text-stone-900 dark:text-[#D4F268] text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-stone-900 dark:text-[#D4F268] animate-pulse" />
            <span>[RECOMMENDATION_ENGINE_V2]</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-stone-900 dark:text-[#E7E5E4] tracking-tight">{title}</h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl">{subtitle}</p>
        </div>

        <button
          onClick={() => fetchRecommendations()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-800 dark:border-white/10 text-xs font-mono font-semibold text-white transition-all cursor-pointer shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#D4F268]' : ''}`} />
          <span>REFRESH MATCH</span>
        </button>
      </div>

      {/* Dynamic Skill Customizer */}
      {showSkillsCustomizer && (
        <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 space-y-3 shadow-md transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-stone-800 dark:text-stone-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-stone-900 dark:text-[#D4F268]" />
              Skill Calibration Vectors
            </span>
            <span className="text-[11px] font-mono text-stone-500">Auto-recalculates fit score</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeSkills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-[#D4F268]/30 text-stone-900 dark:text-[#D4F268] text-xs font-mono font-medium"
              >
                {s}
                <button
                  onClick={() => removeSkill(s)}
                  className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white ml-0.5 cursor-pointer font-bold"
                >
                  &times;
                </button>
              </span>
            ))}

            <div className="inline-flex items-center gap-1.5">
              <input
                type="text"
                placeholder="+ Add skill (e.g. Docker)"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                className="px-3 py-1.5 text-xs font-mono rounded-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-white/10 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:border-stone-400 dark:focus:border-[#D4F268]"
              />
              <button
                onClick={addSkill}
                className="px-3.5 py-1.5 text-xs font-mono font-bold bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] rounded-full transition-colors cursor-pointer"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-6 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 animate-pulse space-y-4"
            >
              <div className="h-6 bg-stone-200 dark:bg-white/10 rounded-full w-3/4" />
              <div className="h-4 bg-stone-200 dark:bg-white/10 rounded-full w-1/2" />
              <div className="h-20 bg-stone-100 dark:bg-stone-900 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : recommendations.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 text-center space-y-2 shadow-md">
          <p className="text-sm font-semibold text-stone-800 dark:text-stone-300">No recommendations found matching your skill matrix.</p>
          <p className="text-xs font-mono text-stone-500">Try adding skills above to recalibrate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map(({ job, matchScore, matchTier, reasons, recommendationSource }) => {
            const saved = isJobSaved(job.id);
            const isTop = matchTier === 'Top Match';

            return (
              <div
                key={job.id}
                className={`group relative p-6 rounded-3xl bg-white dark:bg-[#1C1917] border transition-all duration-300 hover:border-stone-400 dark:hover:border-[#D4F268]/50 flex flex-col justify-between space-y-5 shadow-lg ${
                  isTop
                    ? 'border-stone-400 dark:border-[#D4F268]/40 dark:shadow-[#D4F268]/5'
                    : 'border-stone-200 dark:border-white/10'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Match Ring */}
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isTop
                          ? 'bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09]'
                          : 'bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-[#D4F268] border border-stone-200 dark:border-[#D4F268]/20'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      {matchTier}
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-0.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-[#D4F268]/30 text-xs font-mono font-bold text-stone-900 dark:text-[#D4F268]">
                        {matchScore}% MATCH
                      </div>
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                          saved
                            ? 'bg-amber-500/10 dark:bg-[#D4F268]/20 border-amber-500 dark:border-[#D4F268] text-amber-600 dark:text-[#D4F268]'
                            : 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-white/10 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${saved ? 'fill-amber-500 dark:fill-[#D4F268]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Company & Title */}
                  <div className="flex items-start gap-3.5">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-2xl object-cover ring-1 ring-stone-200 dark:ring-white/10 bg-white p-1 shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-lg font-serif italic text-stone-900 dark:text-white truncate group-hover:text-amber-600 dark:group-hover:text-[#D4F268] transition-colors">
                        <Link to={`/jobs/${job.id}`}>{job.title}</Link>
                      </h3>
                      <p className="text-xs font-mono text-stone-600 dark:text-stone-400 truncate">{job.companyName} • {job.location}</p>
                    </div>
                  </div>

                  {/* Why Recommended Reason Callout */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/80 border border-stone-200 dark:border-white/5 space-y-1.5">
                    <div className="text-[10px] uppercase font-mono text-stone-900 dark:text-[#D4F268] font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 dark:text-[#D4F268]" />
                      [REASON: {recommendationSource}]
                    </div>
                    <ul className="space-y-1">
                      {reasons.slice(0, 2).map((reason, idx) => (
                        <li key={idx} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-1.5">
                          <span className="text-stone-900 dark:text-[#D4F268] font-mono font-bold">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Salary & Details */}
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-white/10">
                    <span className="font-bold text-stone-900 dark:text-[#E7E5E4]">
                      ${(job.salaryMin / 1000).toFixed(0)}k - ${(job.salaryMax / 1000).toFixed(0)}k / {job.salaryPeriod.toLowerCase()}
                    </span>
                    <span className="bg-stone-100 dark:bg-stone-900 px-2.5 py-0.5 rounded-full text-[10px] border border-stone-200 dark:border-white/5">{job.jobType}</span>
                  </div>
                </div>

                {/* Actions */}
                <Link
                  to={`/jobs/${job.id}`}
                  className="w-full mt-4 py-3 rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-[#D4F268] dark:hover:bg-lime-300 dark:text-[#0C0A09] text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>VIEW SPECIFICATION & APPLY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
