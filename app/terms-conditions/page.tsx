import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONTACT } from '@/lib/constants';

export const metadata = {
  title: 'Terms & Conditions — Knotix Crafts',
};

export default function TermsConditionsPage() {
  const contact = BUSINESS_CONTACT;

  return (
    <div className="terms-container">
      <div className="terms-header">
        <Link href="/" className="back-link">
          <span className="back-arrow">&larr;</span> Back to Catalog
        </Link>
        <h1 className="page-title">Terms & Conditions</h1>
        <p className="last-updated">Last Updated: July 2026</p>
      </div>

      <div className="terms-content">
        <div className="intro-card">
          <p className="intro-text">
            Welcome to <strong>{contact.brandName}</strong>. These Terms & Conditions outline the rules, guidelines, and agreements for using our website and purchasing our handcrafted products. By accessing this site, you accept these terms in full.
          </p>
        </div>

        <div className="terms-sections">
          <section className="terms-section">
            <div className="section-num">01</div>
            <div className="section-details">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using our services, shopping on our catalog, or registering a product, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you must refrain from using our platform.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">02</div>
            <div className="section-details">
              <h2>Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, {contact.brandName} and/or its licensors own the intellectual property rights for all material on Knotix. All intellectual property rights are reserved. You may view and print pages for your own personal use, subject to restrictions set in these terms.
              </p>
              <p>You must not:</p>
              <ul className="styled-list">
                <li>Republish material or designs from Knotix</li>
                <li>Sell, rent, or sub-license our designs or jewelry templates</li>
                <li>Reproduce, duplicate, or copy Knotix design patterns</li>
                <li>Redistribute content from {contact.brandName} without written consent</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">03</div>
            <div className="section-details">
              <h2>Purchases & Payments</h2>
              <p>
                If you wish to purchase any product made available through {contact.brandName}, you may be asked to supply certain relevant information including your name, email, phone number, shipping address, and billing information.
              </p>
              <p>We process payments through secure external gateways. By confirming your order, you represent that:</p>
              <ul className="styled-list">
                <li>You have the legal right to use the chosen payment method</li>
                <li>The information you supply to us is true, correct, and complete</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">04</div>
            <div className="section-details">
              <h2>Product Accuracy & Pricing</h2>
              <p>
                We strive to display the colors, specifications, and details of our handcrafted accessories as accurately as possible. However, actual colors and textures may vary depending on your screen settings, photography lighting, or handcraft modifications.
              </p>
              <p>
                We reserve the right to modify prices, discontinue products, or limit order quantities at any time without prior notice.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">05</div>
            <div className="section-details">
              <h2>Account Security</h2>
              <p>
                When you register an account or interact with our system, you are responsible for maintaining the confidentiality of your credentials. You agree to accept responsibility for all activities that occur under your account or device.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">06</div>
            <div className="section-details">
              <h2>Limitation of Liability</h2>
              <p>
                In no event shall {contact.brandName}, its partners, or artisans be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses arising out of your access or inability to access our store.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">07</div>
            <div className="section-details">
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>
          </section>

          <section className="terms-section contact-section">
            <div className="section-num">08</div>
            <div className="section-details">
              <h2>Contact Us</h2>
              <p>If you have any questions or require clarifications regarding our Terms & Conditions, please contact our support desk:</p>
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

