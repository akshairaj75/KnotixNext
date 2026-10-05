'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { BUSINESS_CONTACT } from '@/lib/constants';

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
    <>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="13"
                  height="13"
                  aria-hidden="true"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout</span>
              </button>
            </>
          )}

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle light/dark theme"
          >
            {mounted ? (
              isDarkMode ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="theme-svg-icon"
                    width="14"
                    height="14"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M6.34 17.66l-1.41 1.41" />
                    <path d="M19.07 4.93l-1.41 1.41" />
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="theme-svg-icon"
                    width="14"
                    height="14"
                    aria-hidden="true"
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
                  </svg>
                  <span>Dark</span>
                </>
              )
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="theme-svg-icon"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
                </svg>
                <span>Dark</span>
              </>
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
              isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="theme-svg-icon"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M6.34 17.66l-1.41 1.41" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="theme-svg-icon"
                  width="16"
                  height="16"
                  aria-hidden="true"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
                </svg>
              )
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="theme-svg-icon"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
              </svg>
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
    </header>

    {/* Mobile Drawer / Overlay Navigation */}
    <div
      className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}
      aria-hidden={!isMobileMenuOpen}
    >
      <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className="mobile-nav-content">
        <div className="mobile-nav-header">
          <div className="mobile-nav-brand">
            <span className="mobile-menu-brand">KNOTIX</span>
            <span className="mobile-menu-sub">CRAFTED WITH CHARACTER</span>
          </div>
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
            <span className="mobile-link-title">Catalogue</span>
            <span className="arrow">&rarr;</span>
          </Link>
          <Link
            href="/about"
            className={`mobile-nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mobile-link-title">About Us</span>
            <span className="arrow">&rarr;</span>
          </Link>
          <Link
            href="/contact"
            className={`mobile-nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mobile-link-title">Contact Concierge</span>
            <span className="arrow">&rarr;</span>
          </Link>
          <Link
            href="/terms-conditions"
            className={`mobile-nav-link ${pathname === '/terms-conditions' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mobile-link-title">Terms & Conditions</span>
            <span className="arrow">&rarr;</span>
          </Link>
          <Link
            href="/privacy-policy"
            className={`mobile-nav-link ${pathname === '/privacy-policy' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mobile-link-title">Privacy Policy</span>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                  aria-hidden="true"
                  style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }}
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Logout Administrator</span>
              </button>
            </div>
          )}
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href={BUSINESS_CONTACT.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-whatsapp-btn"
          >
            <svg
              className="whatsapp-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              width="15"
              height="15"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
            <span>WhatsApp Concierge</span>
          </a>
          <div className="drawer-contact-info">
            <span>{BUSINESS_CONTACT.phone}</span>
            <span>{BUSINESS_CONTACT.supportHours.timings}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
