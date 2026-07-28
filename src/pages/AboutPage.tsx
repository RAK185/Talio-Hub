import React from 'react';
import { Briefcase, Sparkles, ShieldCheck, Zap, Globe, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4" /> About Talio Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Empowering Tech Hiring With Artificial Intelligence</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Talio Hub was founded to eliminate friction in modern tech recruiting. By combining real-time skill alignment, Gemini AI resume analysis, and transparent direct recruiter interaction, we empower both candidates and employers.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Gemini AI Alignment</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our proprietary skill engine evaluates candidate profiles against exact job requirements to produce real-time match scores and strength breakdowns.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Verified Employers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every recruiter and corporate partner account undergoes verification to guarantee authentic job postings, real compensation data, and safe applications.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Instant AI Career Coach</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Job seekers gain access to interactive career roadmaps, cover letter generation, and technical interview scenario preparation.
          </p>
        </div>
      </div>

    </div>
  );
};
