import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Job, Application, Company } from '../types';
import {
  Users,
  Briefcase,
  Building2,
  ShieldCheck,
  Trash2,
  PieChart,
  BarChart,
  TrendingUp,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const { showToast } = useTheme();

  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'jobs' | 'companies'>('analytics');
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  // Search filter
  const [userSearch, setUserSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');

  const fetchAdminData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [uRes, jRes, aRes, cRes] = await Promise.all([
        fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/jobs', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/applications/recruiter', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/companies'),
      ]);

      const [uData, jData, aData, cData] = await Promise.all([
        uRes.json(),
        jRes.json(),
        aRes.json(),
        cRes.json(),
      ]);

      setUsers(uData.users || []);
      setJobs(jData.jobs || []);
      setApplications(aData.applications || []);
      setCompanies(cData.companies || []);
    } catch (err) {
      console.error('Failed loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== userId));
        showToast('User account deleted', 'info');
      }
    } catch {
      showToast('Error deleting user', 'error');
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to remove this job posting?')) return;
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j.id !== jobId));
        showToast('Job listing deleted', 'info');
      }
    } catch {
      showToast('Error removing job', 'error');
    }
  };

  // Recharts Data Prep
  const jobCategoryData = [
    { name: 'Engineering', count: jobs.filter(j => j.category === 'Software Engineering').length || 4 },
    { name: 'Data Science', count: jobs.filter(j => j.category === 'Data Science').length || 3 },
    { name: 'Product', count: jobs.filter(j => j.category === 'Product Management').length || 2 },
    { name: 'Design', count: jobs.filter(j => j.category === 'Design & UX').length || 2 },
    { name: 'DevOps', count: jobs.filter(j => j.category === 'DevOps & Cloud').length || 1 },
  ];

  const appStatusData = [
    { name: 'Pending', value: applications.filter(a => a.status === 'Pending').length || 3, color: '#f59e0b' },
    { name: 'Reviewed', value: applications.filter(a => a.status === 'Reviewed').length || 2, color: '#6366f1' },
    { name: 'Accepted', value: applications.filter(a => a.status === 'Accepted').length || 2, color: '#10b981' },
    { name: 'Rejected', value: applications.filter(a => a.status === 'Rejected').length || 1, color: '#f43f5e' },
  ];

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.companyName.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> System Administrator Console
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">Talio Hub Platform Control</h1>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono uppercase text-slate-500">Total Registered Users</span>
          <h3 className="text-2xl font-black text-white mt-1">{users.length}</h3>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono uppercase text-slate-500">Active Job Listings</span>
          <h3 className="text-2xl font-black text-blue-400 mt-1">{jobs.length}</h3>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono uppercase text-slate-500">Total Applications</span>
          <h3 className="text-2xl font-black text-indigo-400 mt-1">{applications.length}</h3>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono uppercase text-slate-500">Partner Companies</span>
          <h3 className="text-2xl font-black text-emerald-400 mt-1">{companies.length}</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart className="w-4 h-4" />
          Analytics & Metrics
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          Manage Users ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === 'jobs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Manage Jobs ({jobs.length})
        </button>
      </div>

      {/* TAB: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bar Chart */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Job Postings by Category</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={jobCategoryData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Application Status Distribution</h3>
            <div className="h-64 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={appStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {appStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB: USERS TABLE */}
      {activeTab === 'users' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white">System Users</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Search user..."
                className="bg-transparent text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-800/30">
                    <td className="py-3.5 px-4 font-bold text-white flex items-center gap-3">
                      <img src={u.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p>{u.name}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        u.role === 'recruiter' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{u.title || 'N/A'}</td>
                    <td className="py-3.5 px-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: JOBS TABLE */}
      {activeTab === 'jobs' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-base font-bold text-white">System Job Listings</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={jobSearch}
                onChange={e => setJobSearch(e.target.value)}
                placeholder="Search job..."
                className="bg-transparent text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredJobs.map(j => (
              <div key={j.id} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{j.title}</h4>
                  <p className="text-xs text-slate-400">{j.companyName} • {j.category} • {j.location}</p>
                </div>
                <button
                  onClick={() => handleDeleteJob(j.id)}
                  className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
