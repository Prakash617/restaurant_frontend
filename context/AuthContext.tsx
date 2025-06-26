'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api'; // your custom apiFetch helper

interface User {
  id: number;
  username: string;
  // add other user fields as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user info using apiFetch
  const fetchUser = useCallback(async () => {
    try {
      const data = await apiFetch<User>('/auth/me/');
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function using apiFetch
  const logout = useCallback(async () => {
    try {
      await apiFetch('/auth/logout/', { method: 'POST' });
    } catch (e: unknown) {
        const error = e as Error;
        console.error(error.message);
      // optionally handle logout error
    }
    setUser(null);
    router.push('/login');
  }, [router]);

  // Refresh token using apiFetch
  const refreshToken = useCallback(async () => {
    try {
      await apiFetch('/auth/token/refresh/', { method: 'POST' });
      await fetchUser(); // re-fetch user after refresh
    } catch {
      setUser(null);
      router.push('/login');
    }
  }, [fetchUser, router]);

  useEffect(() => {
    fetchUser();

    const interval = setInterval(() => {
      refreshToken();
    }, 4 * 60 * 1000); // every 4 minutes

    return () => clearInterval(interval);
  }, [fetchUser, refreshToken]);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
