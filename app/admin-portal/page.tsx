'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username/email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/');
      } else {
        setErrorMessage('Invalid credentials. Access restricted to authorized personnel.');
        setIsLoading(false);
      }
    } catch (err: unknown) {
      console.error('Authentication error:', err);
      setErrorMessage('Authentication service error. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="portal-badge">PORTAL LOGIN</span>
          <h2 className="portal-title">KNOTIX</h2>
          <div className="title-underline"></div>
          <p className="portal-subtitle">
            Please enter your credentials to authenticate and manage the master collections.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {errorMessage && (
            <div className="toast error-toast" style={{ margin: '0 0 15px 0', padding: 12 }}>
              <span className="toast-icon">⚠️</span>
              <span style={{ fontSize: '0.8rem' }}>{errorMessage}</span>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@knotix.com"
              required
              autoComplete="username"
              disabled={isLoading}
              className="login-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Security Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              autoComplete="current-password"
              disabled={isLoading}
              className="login-input"
            />
          </div>

          <button type="submit" className="btn btn-login" disabled={isLoading}>
            {isLoading ? <span>Authenticating...</span> : <span>Authenticate</span>}
          </button>
        </form>

        <div className="login-footer">
          <Link href="/" className="back-link">
            &larr; Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
