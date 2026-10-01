'use client';

import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONTACT } from '@/lib/constants';

export default function Footer() {
  const contact = BUSINESS_CONTACT;

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>KNOTIX JEWELS</h3>
          <p>Crafting timeless elegance and premium luxury jewelry for your most cherished moments.</p>

          <div className="social-links">
            <a href="https://www.instagram.com/knotix_official" onClick={(e) => e.preventDefault()} aria-label="Instagram">IG</a>
            {/* <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">FB</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Pinterest">PI</a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="TikTok">TT</a> */}
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <ul>
            <li><Link href="/">Catalog</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>

        <div className="footer-newsletter">
          <h4>NEWSLETTER</h4>
          <p>Subscribe and get 10% off your first order.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              aria-label="Newsletter email"
            />
            <button type="submit" className="newsletter-btn" aria-label="Subscribe">
              &rarr;
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 KNOTIX Jewels. All rights reserved. Elegant designs by Antigravity.</p>
        <div className="footer-bottom-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
