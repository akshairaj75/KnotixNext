import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us — Knotix Crafts | Timeless Craftsmanship',
};

export default function AboutPage() {
  return (
    <div className="about-container">
      <div className="nav-back">
        <Link href="/" className="back-link">
          <span className="arrow">&larr;</span> Back to Catalog
        </Link>
      </div>

      <header className="about-header">
        <span className="about-subtitle">The Legacy of Knotix</span>
        <h1 className="page-title">Timeless Craftsmanship</h1>
        <p className="about-tagline">
          Where luxury, precision, and modern art unite to form masterpieces of jewelry.
        </p>
      </header>

      <div className="about-content">
        {/* Intro Card */}
        <div className="intro-card">
          <div className="intro-overlay"></div>
          <div className="intro-text-wrapper">
            <h2>Our Vision</h2>
            <p className="intro-text">
              Founded in 2026, Knotix Crafts was born out of a desire to redefine fine jewelry.
              We believe that jewelry is not merely an accessory, but a wearable expression of identity,
              a keeper of memories, and a legacy of design. Our creations fuse traditional luxury
              aesthetics with a contemporary edge.
            </p>
          </div>
        </div>

        {/* History / Story Section */}
        <section className="about-section story-section">
          <div className="section-layout">
            <div className="text-content">
              <h2>The Knotix Difference</h2>
              <p>
                Each piece in our collection is carefully conceptualized and meticulously refined.
                We draw inspiration from geometric patterns in nature, architectural symmetries,
                and the fluid grace of hand-woven knots. By bringing together legacy techniques and
                advanced manufacturing precision, we ensure that every bracelet, ring, and necklace
                exudes unparalleled elegance.
              </p>
              <p>
                Our signature craft combines raw structural beauty with comfortable everyday wear.
                Whether crafted from rich 18k yellow gold, platinum, or adorned with ethically-sourced diamonds,
                each piece is balanced, polished, and perfected under strict quality control.
              </p>
            </div>
            <div className="feature-highlight">
              <div className="badge">Signature Craft</div>
              <h3>Curated & Crafted in Our Dedicated Workshop</h3>
              <p>
                Every single diamond is hand-set and every metal link is inspected, making each design unique to its wearer.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="about-section values-section">
          <div className="section-header-center">
            <h2>Our Founding Principles</h2>
            <p>The core values that guide our artisan studio every single day.</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-box" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3>Artistic Rigor</h3>
              <p>
                We reject compromise. From initial sketch to final polish, we demand absolute precision and excellence in craftsmanship.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-box" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>
              </div>
              <h3>Ethical Sourcing</h3>
              <p>
                We utilize conflict-free diamonds, carefully tracked gemstones, and recycled precious metals to honor the Earth.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon-box" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="card-svg-icon">
                  <path d="M5 18h14" />
                  <path d="M4 14l3-8 5 4 5-4 3 8H4z" />
                  <circle cx="12" cy="6" r="1" fill="currentColor" />
                </svg>
              </div>
              <h3>Modern Legacy</h3>
              <p>
                Our designs are built to outlast trends. We focus on classic silhouettes with subtle, unexpected structural details.
              </p>
            </div>
          </div>
        </section>

        {/* Statistics & Artisans Section */}
        <section className="about-section artisans-section">
          <div className="artisans-card">
            <div className="artisans-details">
              <h2>Behind the Craft</h2>
              <p>
                Our studio brings together generational silversmiths and modern designers.
                This union of centuries-old experience and fresh artistic vision gives Knotix its unique design language.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Hand-Finished</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Master Artisans</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2026</span>
                  <span className="stat-label">Established</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>Experience the Brilliance</h2>
          <p>
            Discover our exclusive catalog of rings, earrings, bracelets, and necklaces tailored to your premium lifestyle.
          </p>
          <Link href="/" className="cta-button">
            Browse Collection
          </Link>
        </section>
      </div>
    </div>
  );
}

