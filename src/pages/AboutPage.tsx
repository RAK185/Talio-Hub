import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Award,
  Users,
  Terminal,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Code2,
  Lock,
  Layers,
  Activity,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 font-sans transition-colors">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-200 dark:bg-[#1C1917] border border-stone-300 dark:border-white/10 text-stone-900 dark:text-[#D4F268] text-xs font-mono font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-stone-900 dark:text-[#D4F268]" /> [SYS_ARCHITECTURE] ABOUT TALIO
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif italic text-stone-900 dark:text-white leading-tight">
          Algorithmic Talent Matching Built For <span className="not-italic font-sans text-stone-900 dark:text-[#D4F268] underline decoration-stone-300 dark:decoration-[#D4F268]/40">Technical Leaders</span>
        </h1>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans max-w-2xl mx-auto">
          Talio Hub eliminates low-signal recruiting noise. Powered by Google Gemini 2.5 Flash neural models, vector skill alignment, and transparent recruiter verification, we match candidates directly with world-class engineering teams.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/jobs"
            className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-[#D4F268] dark:text-[#0C0A09] text-xs font-semibold hover:bg-stone-800 dark:hover:bg-lime-300 transition-colors shadow-lg flex items-center gap-2"
          >
            Explore Active Positions <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 rounded-full bg-stone-100 dark:bg-[#1C1917] border border-stone-300 dark:border-white/10 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:border-stone-400 dark:hover:border-white/20 transition-colors"
          >
            Contact Engineering Team
          </Link>
        </div>
      </div>

      {/* Live System Metrics Banner */}
      <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 dark:divide-white/10">
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400">Match Latency</p>
          <p className="text-3xl font-serif italic text-stone-900 dark:text-white font-bold">&lt; 24ms</p>
          <p className="text-[11px] font-mono text-stone-500">Vector similarity compute</p>
        </div>
        <div className="space-y-1 text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
          <p className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400">AI Evaluation Model</p>
          <p className="text-3xl font-serif italic text-stone-900 dark:text-[#D4F268] font-bold">Gemini 2.5</p>
          <p className="text-[11px] font-mono text-stone-500">Deep resume breakdown</p>
        </div>
        <div className="space-y-1 text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
          <p className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400">Verified Companies</p>
          <p className="text-3xl font-serif italic text-stone-900 dark:text-white font-bold">1,240+</p>
          <p className="text-[11px] font-mono text-stone-500">Strict ledger vetting</p>
        </div>
        <div className="space-y-1 text-center sm:text-left pt-4 sm:pt-0 sm:pl-6">
          <p className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400">Placement Precision</p>
          <p className="text-3xl font-serif italic text-stone-900 dark:text-[#D4F268] font-bold">98.4%</p>
          <p className="text-[11px] font-mono text-stone-500">Skill alignment accuracy</p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif italic text-stone-900 dark:text-white">Technical Infrastructure</h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 font-mono">
            Built from first principles for high-throughput engineering hiring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md space-y-4 hover:border-stone-400 dark:hover:border-[#D4F268]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Gemini AI Skill Vector Engine</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Our neural parser extracts structural skill vectors from raw resumes and evaluates them against recruiter requirements in real-time.
            </p>
            <ul className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> Custom Match Percentage</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> Missing Skill Identification</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md space-y-4 hover:border-stone-400 dark:hover:border-[#D4F268]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Verified Recruiter Ledger</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Every job posting is authenticated by platform admins to prevent fake listings, unbacked salary claims, and third-party scraping.
            </p>
            <ul className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> Transparent Salary Bands</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> Zero Spam Applications</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-white/10 shadow-md space-y-4 hover:border-stone-400 dark:hover:border-[#D4F268]/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10 flex items-center justify-center text-stone-900 dark:text-[#D4F268]">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Real-Time WebSocket Protocol</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Applicants receive instantaneous feedback as hiring managers review, shortlist, or schedule interviews for submitted applications.
            </p>
            <ul className="text-[11px] font-mono text-stone-500 dark:text-stone-400 space-y-1 pt-2">
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> Sub-second Status Updates</li>
              <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-stone-800 dark:text-[#D4F268]" /> In-app Notification Feed</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive System Terminal Block */}
      <div className="p-6 rounded-3xl bg-[#0C0A09] text-stone-200 border border-stone-800 shadow-2xl font-mono space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs text-stone-500 ml-2">talio-kernel-v2.5.sh</span>
          </div>
          <span className="text-[10px] text-[#D4F268] uppercase">[STATUS: ONLINE]</span>
        </div>

        <div className="text-xs space-y-2 text-stone-400">
          <p><span className="text-[#D4F268]">$</span> talio system-status --verbose</p>
          <p className="text-stone-500">&gt; Initializing neural match network...</p>
          <p className="text-stone-300">&gt; Connected to Gemini 2.5 Flash API proxy [VERIFIED]</p>
          <p className="text-stone-300">&gt; Active WebSocket Subscribers: 1,429 sessions</p>
          <p className="text-[#D4F268]">&gt; System health 100%. All regional nodes responding within threshold.</p>
        </div>
      </div>

    </div>
  );
};
