import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Sparkles, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050811] text-slate-400 border-t border-white/5 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Talio <span className="text-blue-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The Next-Gen AI Powered Career Ecosystem connecting top engineering talent, data scientists, and creative leaders with high-growth tech companies worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Job Seekers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/jobs" className="hover:text-blue-400 transition-colors">Browse All Jobs</Link></li>
              <li><Link to="/jobs?category=Software+Engineering" className="hover:text-blue-400 transition-colors">Software Engineering</Link></li>
              <li><Link to="/jobs?jobType=Remote" className="hover:text-blue-400 transition-colors">Remote Positions</Link></li>
              <li><Link to="/dashboard/applicant" className="hover:text-blue-400 transition-colors">AI Resume Matcher</Link></li>
            </ul>
          </div>

          {/* Recruiters */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Employers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register?role=recruiter" className="hover:text-blue-400 transition-colors">Post a Job Role</Link></li>
              <li><Link to="/dashboard/recruiter" className="hover:text-blue-400 transition-colors">Employer Dashboard</Link></li>
              <li><Link to="/dashboard/recruiter" className="hover:text-blue-400 transition-colors">AI Job Description Generator</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">Hiring Solutions</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Talio Hub</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact & Support</Link></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Talio Hub Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for global developers & innovators.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
