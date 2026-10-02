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
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Follow Knotix on Instagram"
              title="Follow Knotix on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="18"
                height="18"
                aria-hidden="true"
                className="social-svg-icon"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>{contact.instagramHandle}</span>
            </a>
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
          <h4>Studio Concierge</h4>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          {/* <p>Hours: {contact.supportHours.timings}</p> */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 KNOTIX Jewels. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
