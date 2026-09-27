'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const emptySubscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  return (
    <header className="app-header">
      <div className="header-container">
        <Link href="/" className="logo">
          <span className="logo-text">KNOTIX</span>
          <span className="logo-subtext">CRAFTED WITH CHARACTER</span>
        </Link>
        <nav className="main-nav">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Catalog
          </Link>
          <Link
            href="/about"
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
          >
            Contact
          </Link>

          {mounted && isAdmin && (
            <>
              <Link
                href="/register"
                className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
              >
                Add Product
              </Link>
              <Link
                href="/category-register"
                className={`nav-link ${pathname === '/category-register' ? 'active' : ''}`}
              >
                Categories
              </Link>
              <button
                onClick={logout}
                className="role-toggle"
                aria-label="Logout admin"
              >
                <span>🚪 Logout</span>
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle light/dark theme"
          >
            {mounted ? (
              isDarkMode ? <span>☀️ Light</span> : <span>🌙 Dark</span>
            ) : (
              <span>🌙 Dark</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
