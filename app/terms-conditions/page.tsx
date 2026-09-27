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
        <div style={{ marginBottom: 20 }}>
          <Link href="/" className="btn-back">
            <span className="arrow">&larr;</span> Back to Catalog
          </Link>
        </div>
        <h1 className="page-title">Terms & Conditions</h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>Last Updated: July 2026</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div className="form-card">
          <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', lineHeight: 1.7 }}>
            Welcome to <strong>{contact.brandName}</strong>. These Terms & Conditions outline the rules,
            guidelines, and agreements for using our website and purchasing our handcrafted products.
            By accessing this site, you accept these terms in full.
          </p>
        </div>

        <div className="terms-sections">
          <section className="terms-section">
            <div className="section-num">01</div>
            <div className="section-details">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using our services, shopping on our catalog, or registering a product,
                you agree to be bound by these Terms & Conditions. If you disagree with any part of
                these terms, you must refrain from using our platform.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">02</div>
            <div className="section-details">
              <h2>Intellectual Property Rights</h2>
              <p>
                Unless otherwise stated, {contact.brandName} and/or its licensors own the intellectual
                property rights for all material on Knotix. All intellectual property rights are
                reserved. You may view and print pages for your own personal use, subject to
                restrictions set in these terms.
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
                If you wish to purchase any product made available through {contact.brandName}, you may
                be asked to supply certain relevant information including your name, email, phone
                number, shipping address, and billing information.
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
                We strive to display the colors, specifications, and details of our handcrafted
                accessories as accurately as possible. However, actual colors and textures may vary
                depending on your screen settings, photography lighting, or handcraft modifications.
              </p>
              <p>
                We reserve the right to modify prices, discontinue products, or limit order
                quantities at any time without prior notice.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">05</div>
            <div className="section-details">
              <h2>Account Security</h2>
              <p>
                When you register an account or interact with our system, you are responsible for
                maintaining the confidentiality of your credentials. You agree to accept responsibility
                for all activities that occur under your account or device.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">06</div>
            <div className="section-details">
              <h2>Limitation of Liability</h2>
              <p>
                In no event shall {contact.brandName}, its partners, or artisans be liable for any
                indirect, incidental, special, consequential, or punitive damages, including loss of
                profits, data, use, goodwill, or other intangible losses arising out of your access or
                inability to access our store.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">07</div>
            <div className="section-details">
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of India,
                without regard to its conflict of law provisions. Our failure to enforce any right or
                provision of these Terms will not be considered a waiver of those rights.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <div className="section-num">08</div>
            <div className="section-details">
              <h2>Contact Us</h2>
              <p>If you have any questions or require clarifications regarding our Terms & Conditions, please contact our support desk:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 15, marginTop: 15 }}>
                <div style={{ padding: 15, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Email</div>
                  <a href={`mailto:${contact.email}`} className="detail-link">{contact.email}</a>
                </div>
                <div style={{ padding: 15, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Phone</div>
                  <a href={`tel:${contact.phoneRaw}`} className="detail-link">{contact.phone}</a>
                </div>
                <div style={{ padding: 15, border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)', textTransform: 'uppercase' }}>Business Name</div>
                  <span style={{ fontSize: '0.85rem' }}>{contact.brandName}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
