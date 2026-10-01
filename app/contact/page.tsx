import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONTACT } from '@/lib/constants';

export const metadata = {
  title: 'Contact Us — Knotix Crafts | Reach Our Studio',
  description: 'Reach our luxury jewelry concierge for bespoke commissions, support, and inquiries.',
};

export default function ContactPage() {
  const contact = BUSINESS_CONTACT;

  return (
    <div className="contact-page-container">
      <div className="nav-back">
        <Link href="/" className="back-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="arrow"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Catalog
        </Link>
      </div>

      <header className="contact-header">
        <span className="contact-subtitle">Reach Our Studio</span>
        <h1 className="page-title">Contact Us</h1>
        <div className="title-underline"></div>
        <p className="contact-tagline">
          Have questions about our handcrafted jewelry, bespoke sizing, or custom commissions? Our concierge team is here to assist you.
        </p>
      </header>

      <div className="contact-content-grid">
        {/* 1. Brand & Ownership details */}
        <div className="detail-card entity-card">
          <div className="card-icon-box" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <path d="M5 18h14" />
              <path d="M4 14l3-8 5 4 5-4 3 8H4z" />
              <circle cx="12" cy="6" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Brand & Ownership</h2>
            <div className="detail-item">
              <span className="detail-label">Brand Name</span>
              <span className="detail-value text-gold">{contact.brandName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Legal Entity</span>
              <span className="detail-value">{contact.legalEntity}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Owner</span>
              <span className="detail-value">{contact.owner}</span>
            </div>
          </div>
        </div>

        {/* 2. Customer Support */}
        <div className="detail-card communication-card">
          <div className="card-icon-box" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Customer Support</h2>
            <div className="detail-item">
              <span className="detail-label">Phone Concierge</span>
              <a href={`tel:${contact.phoneRaw}`} className="detail-link">
                {contact.phone}
              </a>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Support</span>
              <a href={`mailto:${contact.email}`} className="detail-link">
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* 3. WhatsApp Direct Chat */}
        <div className="detail-card whatsapp-card">
          <div className="card-icon-box icon-box-whatsapp" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Instant Messaging</h2>
            <p className="card-description">
              Chat directly with our luxury consultants on WhatsApp for immediate assistance regarding product customization, availability, or orders.
            </p>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <svg
                className="btn-svg-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4. Grievance Desk */}
        <div className="detail-card grievance-card">
          <div className="card-icon-box" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <path d="M12 3v18" />
              <path d="M6 7l6-3 6 3" />
              <path d="M3 13l3-6 3 6a3 3 0 0 1-6 0z" />
              <path d="M15 13l3-6 3 6a3 3 0 0 1-6 0z" />
              <path d="M4 21h16" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Grievance Officer</h2>
            <p className="card-description">
              For formal escalation of unresolved concerns, compliance, or executive review.
            </p>
            <div className="detail-item">
              <span className="detail-label">Grievance Desk</span>
              <a href={`mailto:${contact.grievanceEmail}`} className="detail-link">
                {contact.grievanceEmail}
              </a>
            </div>
          </div>
        </div>

        {/* 5. Business Address */}
        <div className="detail-card address-card">
          <div className="card-icon-box" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Business Address</h2>
            <p className="address-text">
              {contact.address.line1}
              <br />
              {contact.address.line2}
              <br />
              {contact.address.line3}
              <br />
              {contact.address.country}
            </p>
          </div>
        </div>

        {/* 6. Support Hours */}
        <div className="detail-card hours-card">
          <div className="card-icon-box" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="card-svg-icon"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="contact-card-details">
            <h2>Support Hours</h2>
            <div className="detail-item">
              <span className="detail-label">Operating Days</span>
              <span className="detail-value">{contact.supportHours.days}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Timings</span>
              <span className="detail-value">{contact.supportHours.timings}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sunday</span>
              <span className="detail-value status-closed">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
