'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const emptySubscribe = () => () => {};

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link href="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="logo-text">KNOTIX</span>
          <span className="logo-subtext">CRAFTED WITH CHARACTER</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav desktop-nav">
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

        {/* Mobile Header Controls */}
        <div className="mobile-header-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle mobile-theme-btn"
            aria-label="Toggle light/dark theme"
          >
            {mounted ? (
              isDarkMode ? <span>☀️</span> : <span>🌙</span>
            ) : (
              <span>🌙</span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      <div
        className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <span className="mobile-menu-title">NAVIGATION</span>
            <button
              className="close-menu-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="mobile-nav-links">
            <Link
              href="/"
              className={`mobile-nav-link ${pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Catalog</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link
              href="/about"
              className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>About Us</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Contact Concierge</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link
              href="/privacy-policy"
              className={`mobile-nav-link ${pathname === '/privacy-policy' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Privacy Policy</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <Link
              href="/terms-conditions"
              className={`mobile-nav-link ${pathname === '/terms-conditions' ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Terms & Conditions</span>
              <span className="arrow">&rarr;</span>
            </Link>

            {mounted && isAdmin && (
              <div className="mobile-admin-section">
                <span className="mobile-admin-label">Admin Management</span>
                <Link
                  href="/register"
                  className={`mobile-nav-link ${pathname === '/register' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Add Product</span>
                  <span className="arrow">&rarr;</span>
                </Link>
                <Link
                  href="/category-register"
                  className={`mobile-nav-link ${pathname === '/category-register' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Category Management</span>
                  <span className="arrow">&rarr;</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="mobile-logout-btn"
                >
                  🚪 Logout Administrator
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
