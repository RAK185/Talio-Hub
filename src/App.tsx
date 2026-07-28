import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';

import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ApplicantDashboard } from './pages/ApplicantDashboard';
import { RecruiterDashboard } from './pages/RecruiterDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Protected Route helper
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) return <div className="py-20 text-center text-xs text-slate-400">Authenticating...</div>;
  if (!token || !user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WebSocketProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-[#0C0A09] text-[#E7E5E4] font-sans flex flex-col selection:bg-[#D4F268] selection:text-[#0C0A09] relative overflow-x-hidden">
              {/* Noise Overlay */}
              <div className="noise-overlay" />

              {/* Organic Subtle Ambient Glows */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#D4F268]/5 rounded-full blur-[160px]" />
                <div className="absolute top-[50%] -right-[10%] w-[40%] h-[50%] bg-stone-800/20 rounded-full blur-[140px]" />
              </div>

              <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/jobs" element={<JobsPage />} />
                    <Route path="/jobs/:id" element={<JobDetailsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Dashboard Routes */}
                    <Route
                      path="/dashboard/applicant"
                      element={
                        <ProtectedRoute allowedRoles={['applicant', 'admin']}>
                          <ApplicantDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/dashboard/recruiter"
                      element={
                        <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
                          <RecruiterDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/dashboard/admin"
                      element={
                        <ProtectedRoute allowedRoles={['admin']}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </div>
          </BrowserRouter>
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
