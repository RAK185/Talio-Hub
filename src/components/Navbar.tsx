import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWebSocket } from '../context/WebSocketContext';
import {
  Briefcase,
  Search,
  Building2,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Menu,
  X,
  ChevronDown,
  Info,
  Mail,
  Bookmark,
  Bell,
  Radio,
  CheckCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, unreadCount, markAsRead, markAllAsRead, isConnected } = useWebSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'recruiter') return '/dashboard/recruiter';
    if (user.role === 'admin') return '/dashboard/admin';
    return '/dashboard/applicant';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0C0A09]/90 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#D4F268] flex items-center justify-center font-bold text-[#0C0A09] text-base group-hover:scale-105 transition-transform shadow-md shadow-[#D4F268]/20">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif italic text-[#E7E5E4] tracking-tight group-hover:text-[#D4F268] transition-colors">
              Talio <span className="not-italic font-normal text-stone-400">Hub</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/jobs"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/jobs')
                ? 'text-[#D4F268] font-semibold border-b-2 border-[#D4F268] pb-1'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Find Jobs
          </Link>

          <Link
            to="/about"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/about')
                ? 'text-[#D4F268] font-semibold border-b-2 border-[#D4F268] pb-1'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            About System
          </Link>

          <Link
            to="/contact"
            className={`text-sm font-medium tracking-wide transition-colors ${
              isActive('/contact')
                ? 'text-[#D4F268] font-semibold border-b-2 border-[#D4F268] pb-1'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action Items */}
        <div className="hidden md:flex items-center gap-4">
          {/* Real-time Connection Indicator & Bell */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2.5 rounded-full bg-[#1C1917] border border-white/10 hover:border-[#D4F268]/50 text-stone-300 hover:text-[#D4F268] transition-all cursor-pointer"
                title="Real-time Application Status Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#D4F268] text-[10px] font-mono font-bold text-[#0C0A09] flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-[#1C1917] border border-white/10 shadow-2xl p-5 z-50 space-y-3"
                  onMouseLeave={() => setNotifDropdownOpen(false)}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold uppercase text-stone-300 tracking-wider">[SYS_NOTIFICATIONS]</span>
                      <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4F268]/10 text-[#D4F268] border border-[#D4F268]/20">
                        <Radio className="w-2.5 h-2.5 animate-pulse" />
                        {isConnected ? 'WS LIVE' : 'SYNCING'}
                      </span>
                    </div>

                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] font-mono font-medium text-[#D4F268] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3 h-3" />
                        Mark Read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-xs font-mono text-stone-500">
                        No status updates received.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markAsRead(n.id)}
                          className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer space-y-1 ${
                            n.read
                              ? 'bg-stone-900/40 border-white/5 opacity-60'
                              : 'bg-[#D4F268]/10 border-[#D4F268]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-white">{n.title}</span>
                            <span className="text-[10px] font-mono text-stone-400">
                              {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <p className="text-stone-300 text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-[#1C1917] border border-white/10 hover:border-white/20 text-stone-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4F268]" /> : <Moon className="w-4 h-4 text-stone-300" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-[#1C1917] hover:border-[#D4F268]/40 border border-white/10 transition-all text-left cursor-pointer"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
                  <span className="text-[10px] font-mono uppercase text-[#D4F268]">{user.role}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-60 rounded-2xl bg-[#1C1917] border border-white/10 shadow-2xl p-2 z-50 divide-y divide-white/10"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2.5">
                    <p className="text-[10px] font-mono text-stone-500 uppercase">Signed in as</p>
                    <p className="text-xs font-medium text-white truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate(getDashboardPath());
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white hover:bg-[#D4F268]/10 hover:text-[#D4F268] transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#D4F268]" />
                      Dashboard
                    </button>

                    {user.role === 'applicant' && (
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          navigate('/dashboard/applicant?tab=saved');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white hover:bg-[#D4F268]/10 hover:text-[#D4F268] transition-colors cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 text-[#D4F268]" />
                        Saved Jobs ({user.savedJobs?.length || 0})
                      </button>
                    )}
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-stone-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-xs font-semibold bg-[#D4F268] text-[#0C0A09] rounded-full shadow-lg hover:bg-lime-300 transition-colors cursor-pointer"
              >
                Post a Position
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[#1C1917] text-stone-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#D4F268]" /> : <Moon className="w-4 h-4 text-stone-300" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1C1917] text-stone-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#1C1917] p-5 space-y-3">
          <Link
            to="/jobs"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-stone-300 hover:bg-stone-800"
          >
            <Search className="w-5 h-5 text-[#D4F268]" />
            Find Jobs
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-stone-300 hover:bg-stone-800"
          >
            <Info className="w-5 h-5 text-[#D4F268]" />
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl text-stone-300 hover:bg-stone-800"
          >
            <Mail className="w-5 h-5 text-[#D4F268]" />
            Contact
          </Link>

          {user ? (
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#D4F268]/20 text-[#D4F268] font-medium"
              >
                <LayoutDashboard className="w-5 h-5" />
                Go to Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 text-left cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-full border border-white/10 text-stone-200 text-xs font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-full bg-[#D4F268] text-[#0C0A09] text-xs font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

