import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONTACT } from '@/lib/constants';

export const metadata = {
  title: 'Privacy Policy — Knotix Crafts',
};

export default function PrivacyPolicyPage() {
  const contact = BUSINESS_CONTACT;

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <Link href="/" className="back-link">
          <span className="back-arrow">&larr;</span> Back to Catalog
        </Link>
        <h1 className="page-title">Privacy Policy</h1>
        <p className="last-updated">Last Updated: July 2026</p>
      </div>

      <div className="privacy-content">
        <div className="intro-card">
          <p className="intro-text">
            Welcome to <strong>{contact.brandName}</strong>. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or place an order.
          </p>
        </div>

        <div className="policy-sections">
          <section className="policy-section">
            <div className="section-num">01</div>
            <div className="section-details">
              <h2>Information We Collect</h2>
              <p>We may collect the following details during your interaction with our store:</p>
              <ul className="styled-list">
                <li>Name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>Shipping and billing address</li>
                <li>Payment details (processed securely through payment providers)</li>
                <li>Order history</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">02</div>
            <div className="section-details">
              <h2>How We Use Your Information</h2>
              <p>We use your information to facilitate a seamless shopping experience, including to:</p>
              <ul className="styled-list">
                <li>Process and deliver your orders</li>
                <li>Provide reliable customer support</li>
                <li>Send order updates and confirmations</li>
                <li>Improve our products, services, and browsing experience</li>
                <li>Prevent fraud and ensure secure transactions</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">03</div>
            <div className="section-details">
              <h2>Payment Security</h2>
              <p>
                Your security is our absolute priority. <strong>We do not store your debit/credit card details.</strong>
                All transaction payments are processed securely through trusted, certified payment gateways and providers.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">04</div>
            <div className="section-details">
              <h2>Sharing of Information</h2>
              <p>
                We respect your privacy and <strong>do not sell or rent your personal information</strong>.
                Your information may only be shared with trusted third-party delivery partners and payment providers to complete and fulfill your orders.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">05</div>
            <div className="section-details">
              <h2>Cookies</h2>
              <p>
                Our website may use cookies to improve your browsing experience, remember preferences, and analyze website performance for optimization.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">06</div>
            <div className="section-details">
              <h2>Product Information</h2>
              <p>
                We sell unisex fashion accessories and handcrafted products, including bracelets, rings, chains, wallets, home-crafted décor items, and other fashion accessories. Product colors and designs may vary slightly due to photography, lighting, or individual screen settings.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">07</div>
            <div className="section-details">
              <h2>Your Rights</h2>
              <p>
                You have full control over your data. You may contact us at any time to update, modify, or request deletion of your personal information, where applicable.
              </p>
            </div>
          </section>

          <section className="policy-section">
            <div className="section-num">08</div>
            <div className="section-details">
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect modifications in our practices or legal obligations. Any changes will be updated directly on this page.
              </p>
            </div>
          </section>

          <section className="policy-section contact-section">
            <div className="section-num">09</div>
            <div className="section-details">
              <h2>Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please reach out to us:</p>
              <div className="contact-info-grid">
                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-label">Email</div>
                  <a href={`mailto:${contact.email}`} className="contact-value">{contact.email}</a>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="contact-label">Phone</div>
                  <a href={`tel:${contact.phoneRaw}`} className="contact-value">{contact.phone}</a>
                </div>
                <div className="contact-card">
                  <div className="contact-icon-box" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="contact-label">Business Name</div>
                  <span className="contact-value-text">{contact.brandName}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

