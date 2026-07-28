import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { useTheme } from './ThemeContext';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Record<string, unknown>) => Promise<boolean>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  toggleBookmark: (jobId: string) => Promise<void>;
  isJobSaved: (jobId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('talio_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { showToast } = useTheme();

  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Stale token
          localStorage.removeItem('talio_token');
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error('Failed to fetch me:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMe();
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Login failed', 'error');
        return false;
      }
      localStorage.setItem('talio_token', data.token);
      setToken(data.token);
      setUser(data.user);
      showToast(`Welcome back, ${data.user.name}!`, 'success');
      return true;
    } catch {
      showToast('Network error during login', 'error');
      return false;
    }
  };

  const register = async (userData: Record<string, unknown>): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.error || 'Registration failed', 'error');
        return false;
      }
      localStorage.setItem('talio_token', data.token);
      setToken(data.token);
      setUser(data.user);
      showToast('Account created successfully!', 'success');
      return true;
    } catch {
      showToast('Network error during registration', 'error');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('talio_token');
    setToken(null);
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const toggleBookmark = async (jobId: string) => {
    if (!token || !user) {
      showToast('Please sign in to bookmark jobs', 'info');
      return;
    }

    try {
      const res = await fetch('/api/users/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId }),
      });

      if (res.ok) {
        const data = await res.json();
        setUser(prev => (prev ? { ...prev, savedJobs: data.savedJobs } : null));
        const isSaved = data.savedJobs.includes(jobId);
        showToast(isSaved ? 'Job saved to your bookmarks' : 'Job removed from saved list', 'info');
      }
    } catch {
      showToast('Failed to update bookmark', 'error');
    }
  };

  const isJobSaved = (jobId: string) => {
    return !!user?.savedJobs?.includes(jobId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        toggleBookmark,
        isJobSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
