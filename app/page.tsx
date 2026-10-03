'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { apiService } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { HERO_BANNER } from '@/lib/constants';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err: unknown) {
      console.error('Error fetching products', err);
      const msg = err instanceof Error ? err.message : 'Failed to load products.';
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRetry = useCallback(async () => {
    setIsRetrying(true);
    await fetchProducts();
    setIsRetrying(false);
  }, [fetchProducts]);

  useEffect(() => {
    let isMounted = true;
    apiService
      .getProducts()
      .then((data) => {
        if (isMounted) setProducts(data);
      })
      .catch((err: unknown) => {
        console.error('Error fetching products', err);
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to load products.';
          setErrorMessage(msg);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const list = products.map((p) => p.category);
    return ['All', ...Array.from(new Set(list))];
  }, [products]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let items = [...products];

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory && selectedCategory !== 'All') {
      items = items.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (sortBy === 'priceLow') {
      items.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      items.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const heroImageUrl =
    HERO_BANNER.backgroundImage.startsWith('/') ||
      HERO_BANNER.backgroundImage.startsWith('http') ||
      HERO_BANNER.backgroundImage.startsWith('data:')
      ? HERO_BANNER.backgroundImage
      : `/${HERO_BANNER.backgroundImage}`;

  return (
    <>
      {HERO_BANNER.layout === 'fullscreen' ? (
        <section
          className="home-banner"
          style={{
            backgroundImage: `radial-gradient(circle at 80% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(11, 11, 11, 0.95) 75%), url('${heroImageUrl}')`,
          }}
        >
          <div className="banner-overlay"></div>
          <div className="banner-content">
            <span className="banner-badge">{HERO_BANNER.badge}</span>
            <h1 className="banner-title">{HERO_BANNER.title}</h1>
            <div className="title-underline"></div>
            <p className="banner-subtitle">{HERO_BANNER.subtitle}</p>
            <a href={HERO_BANNER.buttonLink} className="banner-btn">
              <span>{HERO_BANNER.buttonText}</span>
            </a>
          </div>
        </section>
      ) : (
        <section className="split-hero-section">
          <div className="split-hero-bg-glow"></div>
          <div className="split-hero-container">
            {/* Left Content */}
            <div className="split-hero-content">
              <span className="banner-badge">{HERO_BANNER.badge}</span>
              <h1 className="split-hero-title">{HERO_BANNER.title}</h1>
              <div className="title-underline"></div>
              <p className="split-hero-subtitle">{HERO_BANNER.subtitle}</p>

              <div className="split-hero-actions">
                <a href={HERO_BANNER.buttonLink} className="banner-btn">
                  <span>{HERO_BANNER.buttonText}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="banner-btn-arrow"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
                <Link href="/about" className="hero-secondary-link">
                  Our Heritage &rarr;
                </Link>
              </div>

              <div className="hero-highlights">
                <div className="hero-highlight-item">
                  <span className="highlight-symbol">✦</span>
                  <span>Handcrafted Precision</span>
                </div>
                <div className="hero-highlight-item">
                  <span className="highlight-symbol">✦</span>
                  <span>Pure Luxury</span>
                </div>
              </div>
            </div>

            {/* Right Campaign Poster */}
            <div className="split-hero-visual">
              <div className="hero-poster-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroImageUrl}
                  alt={HERO_BANNER.title}
                  className="hero-poster-img"
                  loading="eager"
                />
                <div className="poster-gold-corner top-left"></div>
                <div className="poster-gold-corner bottom-right"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="catalog-container" id="catalog-section">
        {/* Category Tab Buttons Navigation */}
        <section className="category-tabs-section">
          <div className="category-tabs-wrapper">
            <div className="category-tabs-nav" role="tablist" aria-label="Product Categories">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] || 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`category-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="tab-label">
                      {cat === 'All' ? 'All Creations' : cat}
                    </span>
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Controls Panel */}
        <section className="controls-panel">
          <div className="filter-status-wrapper">
            <span className="status-label">Active Filter:</span>
            <span className="status-value">
              {selectedCategory === 'All'
                ? 'All Collections'
                : `${selectedCategory}s Collection`}
            </span>
          </div>

          <div className="controls-actions">
            {/* Search Bar */}
            <div className="search-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                className="search-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search collections..."
                aria-label="Search products"
                className="search-input"
              />
            </div>

            {/* Sorting */}
            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="rating">Highest Rated</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>CURATING YOUR COLLECTION...</p>
          </div>
        )}

        {/* Error State */}
        {errorMessage && !isLoading && (
          <div className="luxury-state-wrapper">
            <div className="luxury-state-card">
              <div className="luxury-badge error-badge">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Connection Notice</span>
              </div>

              <div className="luxury-state-icon-circle error-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <h2 className="luxury-state-title">Unable to Load Collections</h2>
              <p className="luxury-state-desc">
                We are experiencing difficulty connecting to the atelier catalog. Please verify your connection or retry loading the creations.
              </p>

              <div className="luxury-error-pill">
                <span>{errorMessage}</span>
              </div>

              <div className="luxury-state-actions">
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={isRetrying}
                  className="btn-luxury-primary"
                >
                  <span className={`btn-icon ${isRetrying ? 'icon-spin' : ''}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M16 21h5v-5" />
                    </svg>
                  </span>
                  <span>{isRetrying ? 'Reconnecting...' : 'Retry Loading Collections'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Catalog Grid */}
        {!isLoading && !errorMessage && (
          <div className="products-grid-wrapper">
            {filteredAndSortedProducts.length > 0 ? (
              <div className="products-grid">
                {filteredAndSortedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            ) : products.length === 0 ? (
              /* Completely Empty Catalog State */
              <div className="luxury-state-wrapper">
                <div className="luxury-state-card">
                  <div className="luxury-badge">
                    <span>Curated Vault</span>
                  </div>

                  <div className="luxury-state-icon-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                      <path d="M2 9h20" />
                      <path d="M10 3l-2 6 4 12 4-12-2-6" />
                    </svg>
                  </div>

                  <h2 className="luxury-state-title">The Vault is Being Curated</h2>
                  <p className="luxury-state-desc">
                    Our atelier is currently handcrafting and preparing new pieces for this collection. Please check back shortly or explore our bespoke creations.
                  </p>

                  <div className="luxury-state-actions">
                    <button
                      type="button"
                      onClick={handleRetry}
                      disabled={isRetrying}
                      className="btn-luxury-primary"
                    >
                      <span className={`btn-icon ${isRetrying ? 'icon-spin' : ''}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                          <path d="M16 21h5v-5" />
                        </svg>
                      </span>
                      <span>{isRetrying ? 'Refreshing...' : 'Refresh Collections'}</span>
                    </button>
                    <Link href="/contact" className="btn-luxury-secondary">
                      Contact Atelier
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* Search/Filter Empty State */
              <div className="luxury-state-wrapper">
                <div className="luxury-state-card">
                  <div className="luxury-badge">
                    <span>Filtered View</span>
                  </div>

                  <div className="luxury-state-icon-circle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>

                  <h2 className="luxury-state-title">No Matching Pieces Found</h2>
                  <p className="luxury-state-desc">
                    {searchQuery
                      ? `We couldn't find any creations matching "${searchQuery}". Try adjusting your search query or clear filters.`
                      : `No creations found in the "${selectedCategory}" collection. Try selecting a different category or view all.`}
                  </p>

                  <div className="luxury-state-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="btn-luxury-primary"
                    >
                      <span className="btn-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </span>
                      <span>Clear All Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
