import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C0A09] text-stone-400 border-t border-white/10 pt-16 pb-12 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-900 border border-white/10 flex items-center justify-center text-[#D4F268]">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-2xl font-serif italic text-white tracking-tight">
                Talio <span className="not-italic font-sans text-[#D4F268]">Hub</span>
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Algorithmic talent infrastructure built to match engineering and creative leaders directly with specialized, high-impact technical teams globally.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-white/10 text-stone-400 hover:text-[#D4F268] hover:border-[#D4F268]/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-white/10 text-stone-400 hover:text-[#D4F268] hover:border-[#D4F268]/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-white/10 text-stone-400 hover:text-[#D4F268] hover:border-[#D4F268]/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold text-[#D4F268] tracking-widest uppercase">[CANDIDATES]</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/jobs" className="hover:text-[#D4F268] transition-colors">Browse Positions</Link></li>
              <li><Link to="/jobs?category=Software+Engineering" className="hover:text-[#D4F268] transition-colors">Software Engineering</Link></li>
              <li><Link to="/jobs?jobType=Remote" className="hover:text-[#D4F268] transition-colors">Remote Opportunities</Link></li>
              <li><Link to="/dashboard/applicant" className="hover:text-[#D4F268] transition-colors">Resume Skill Vectors</Link></li>
            </ul>
          </div>

          {/* Recruiters */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold text-[#D4F268] tracking-widest uppercase">[RECRUITERS]</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/register?role=recruiter" className="hover:text-[#D4F268] transition-colors">Publish Position</Link></li>
              <li><Link to="/dashboard/recruiter" className="hover:text-[#D4F268] transition-colors">Recruiter Portal</Link></li>
              <li><Link to="/dashboard/recruiter" className="hover:text-[#D4F268] transition-colors">Spec Generator</Link></li>
              <li><Link to="/about" className="hover:text-[#D4F268] transition-colors">Hiring Infrastructure</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono font-bold text-[#D4F268] tracking-widest uppercase">[PLATFORM]</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#D4F268] transition-colors">About Talio Engine</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4F268] transition-colors">System Support</Link></li>
              <li><a href="#" className="hover:text-[#D4F268] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4F268] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Talio Hub Inc. All rights reserved. [SYS_2026.4]</p>
          <div className="flex items-center gap-2">
            <span>Engineered for global developers & builders.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
