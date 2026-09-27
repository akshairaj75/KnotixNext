import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONTACT } from '@/lib/constants';

export const metadata = {
  title: 'Contact Us — Knotix Crafts | Reach Our Studio',
};

export default function ContactPage() {
  const contact = BUSINESS_CONTACT;

  return (
    <div className="contact-page-container">
      <div style={{ marginBottom: 30 }}>
        <Link href="/" className="btn-back">
          <span className="arrow">←</span> Back to Catalog
        </Link>
      </div>

      <header className="contact-header">
        <span className="contact-subtitle">Reach Our Studio</span>
        <h1 className="page-title">Contact Us</h1>
        <p className="about-tagline">
          Have questions about our handcrafted jewelry or need assistance? Our support team is here to help.
        </p>
      </header>

      <div className="contact-content-grid">
        {/* Brand & Ownership details */}
        <div className="detail-card">
          <div className="card-icon">👑</div>
          <div style={{ flexGrow: 1 }}>
            <h2>Brand & Ownership</h2>
            <div className="detail-item">
              <span className="detail-label">Brand Name</span>
              <span className="detail-value" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>
                {contact.brandName}
              </span>
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

        {/* Communication details */}
        <div className="detail-card">
          <div className="card-icon">📞</div>
          <div style={{ flexGrow: 1 }}>
            <h2>Customer Support</h2>
            <div className="detail-item">
              <span className="detail-label">Phone Support</span>
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

        {/* WhatsApp Chat Details */}
        <div className="detail-card">
          <div className="card-icon">💬</div>
          <div style={{ flexGrow: 1 }}>
            <h2>Instant Messaging</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 15, lineHeight: 1.5 }}>
              Chat directly with our support executives for immediate assistance regarding products or orders.
            </p>
            <a
              href={contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp-order"
              style={{ padding: '10px 18px', display: 'inline-flex' }}
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Grievance Desk */}
        <div className="detail-card">
          <div className="card-icon">⚖️</div>
          <div style={{ flexGrow: 1 }}>
            <h2>Grievance Officer</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: 15, lineHeight: 1.5 }}>
              For escalation of unresolved complaints or any formal grievance concerns.
            </p>
            <div className="detail-item">
              <span className="detail-label">Grievance Email</span>
              <a href={`mailto:${contact.grievanceEmail}`} className="detail-link">
                {contact.grievanceEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="detail-card">
          <div className="card-icon">📍</div>
          <div style={{ flexGrow: 1 }}>
            <h2>Business Address</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
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

        {/* Support Hours */}
        <div className="detail-card">
          <div className="card-icon">🕒</div>
          <div style={{ flexGrow: 1 }}>
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
              <span className="detail-value" style={{ color: '#c62828' }}>Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
