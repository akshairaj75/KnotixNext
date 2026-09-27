import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us — Knotix Crafts | Timeless Craftsmanship',
};

export default function AboutPage() {
  return (
    <div className="about-container">
      <div style={{ marginBottom: 30 }}>
        <Link href="/" className="btn-back">
          <span className="arrow">←</span> Back to Catalog
        </Link>
      </div>

      <header className="about-header">
        <span className="about-subtitle">The Legacy of Knotix</span>
        <h1 className="page-title">Timeless Craftsmanship</h1>
        <p className="about-tagline">
          Where luxury, precision, and modern art unite to form masterpieces of jewelry.
        </p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
        {/* Intro Card */}
        <div className="form-card" style={{ textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #1a1510 0%, var(--card-bg) 100%)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: 15, color: 'var(--color-gold)' }}>
            Our Vision
          </h2>
          <p style={{ maxWidth: 700, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-muted)' }}>
            Founded in 2026, Knotix Crafts was born out of a desire to redefine fine jewelry.
            We believe that jewelry is not merely an accessory, but a wearable expression of identity,
            a keeper of memories, and a legacy of design. Our creations fuse traditional luxury
            aesthetics with a contemporary edge.
          </p>
        </div>

        {/* History / Story Section */}
        <div className="form-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 15 }}>
              The Knotix Difference
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7, marginBottom: 15 }}>
              Each piece in our collection is carefully conceptualized and meticulously refined.
              We draw inspiration from geometric patterns in nature, architectural symmetries,
              and the fluid grace of hand-woven knots. By bringing together legacy techniques and
              advanced manufacturing precision, we ensure that every bracelet, ring, and necklace
              exudes unparalleled elegance.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.7 }}>
              Our signature craft combines raw structural beauty with comfortable everyday wear.
              Whether crafted from rich 18k yellow gold, platinum, or adorned with ethically-sourced diamonds,
              each piece is balanced, polished, and perfected under strict quality control.
            </p>
          </div>
          <div style={{ padding: 30, border: '1px solid var(--border-color)', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 10 }}>
              Signature Craft
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: 10 }}>
              Curated & Crafted in Our Dedicated Workshop
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Every single diamond is hand-set and every metal link is inspected, making each design unique to its wearer.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: 8 }}>
              Our Founding Principles
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)' }}>
              The core values that guide our artisan studio every single day.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div className="form-card" style={{ textAlign: 'center', padding: 30 }}>
              <div style={{ fontSize: '2rem', marginBottom: 15 }}>✨</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 10 }}>
                Artistic Rigor
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                We reject compromise. From initial sketch to final polish, we demand absolute precision and excellence in craftsmanship.
              </p>
            </div>
            <div className="form-card" style={{ textAlign: 'center', padding: 30 }}>
              <div style={{ fontSize: '2rem', marginBottom: 15 }}>🌱</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 10 }}>
                Ethical Sourcing
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                We utilize conflict-free diamonds, carefully tracked gemstones, and recycled precious metals to honor the Earth.
              </p>
            </div>
            <div className="form-card" style={{ textAlign: 'center', padding: 30 }}>
              <div style={{ fontSize: '2rem', marginBottom: 15 }}>👑</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 10 }}>
                Modern Legacy
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
                Our designs are built to outlast trends. We focus on classic silhouettes with subtle, unexpected structural details.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics & Artisans */}
        <div className="form-card" style={{ textAlign: 'center', padding: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: 15 }}>
            Behind the Craft
          </h2>
          <p style={{ maxWidth: 650, margin: '0 auto 30px auto', fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
            Our studio brings together generational silversmiths and modern designers.
            This union of centuries-old experience and fresh artistic vision gives Knotix its unique design language.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 20 }}>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                100%
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Hand-Finished
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                15+
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Master Artisans
              </span>
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                2026
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Established
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: 10 }}>
            Experience the Brilliance
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9rem', marginBottom: 25 }}>
            Discover our exclusive catalog of rings, earrings, bracelets, and necklaces tailored to your premium lifestyle.
          </p>
          <Link href="/" className="banner-btn">
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
