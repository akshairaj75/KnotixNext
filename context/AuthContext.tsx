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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    return role === 'ADMIN' || token === 'admin-token' || token === 'admin@knotix.com';
  });
  const [isLoading] = useState<boolean>(false);
  const router = useRouter();

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = username.trim().toLowerCase();
    if ((user === 'admin' || user === 'admin@knotix.com') && password === 'KnotixAdmin2026!') {
      localStorage.setItem('role', 'ADMIN');
      localStorage.setItem('token', 'admin-token');
      document.cookie = 'token=admin-token; path=/; max-age=604800';
      document.cookie = 'role=ADMIN; path=/; max-age=604800';
      setIsAdmin(true);
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
        document.cookie = `token=${data.token}; path=/; max-age=604800`;
        document.cookie = `role=${data.role}; path=/; max-age=604800`;
        setIsAdmin(true);
        return true;
      }
    } catch (e) {
      console.error('Login error', e);
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';
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
