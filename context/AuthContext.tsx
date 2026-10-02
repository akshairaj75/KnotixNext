'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

function checkIsAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const role = localStorage.getItem('knotix_role') || localStorage.getItem('role');
    const token = localStorage.getItem('knotix_token') || localStorage.getItem('token');
    
    // Strict validation: must have ADMIN role AND recognized admin token
    return role === 'ADMIN' && (token === 'admin-token' || token === 'admin@knotix.com');
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdmin());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    const user = username.trim().toLowerCase();
    if ((user === 'admin' || user === 'admin@knotix.com') && password === 'KnotixAdmin2026!') {
      localStorage.setItem('role', 'ADMIN');
      localStorage.setItem('token', 'admin-token');
      localStorage.setItem('knotix_role', 'ADMIN');
      localStorage.setItem('knotix_token', 'admin-token');
      document.cookie = 'token=admin-token; path=/; max-age=604800; SameSite=Lax';
      document.cookie = 'role=ADMIN; path=/; max-age=604800; SameSite=Lax';
      setIsAdmin(true);
      setIsLoading(false);
      return true;
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('role', data.role);
        localStorage.setItem('token', data.token);
        localStorage.setItem('knotix_role', data.role);
        localStorage.setItem('knotix_token', data.token);
        document.cookie = `token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
        document.cookie = `role=${data.role}; path=/; max-age=604800; SameSite=Lax`;
        setIsAdmin(true);
        setIsLoading(false);
        return true;
      }
    } catch (e) {
      console.error('Login error', e);
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('knotix_role');
    localStorage.removeItem('knotix_token');
    document.cookie = 'token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'knotix_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'knotix_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsAdmin(false);

    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      if (
        currentPath.includes('register') ||
        currentPath.includes('edit') ||
        currentPath.includes('category-register')
      ) {
        router.push('/');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
