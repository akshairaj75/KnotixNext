'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Product } from '@/lib/types';
import { apiService } from '@/services/api';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');

  const fetchProducts = React.useCallback(async () => {
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

  const getTagline = (cat: string) => {
    const lower = cat.toLowerCase();
    if (cat === 'All') return 'Explore our full range of handcrafted jewelry';
    if (lower.includes('ring')) return 'Bold. Dark. Fearless. Designed for leaders.';
    if (lower.includes('neck') || lower.includes('pendant')) return 'Carry your story. Wear your symbol.';
    if (lower.includes('brace') || lower.includes('chain')) return 'Stronger together. Timeless links of style.';
    if (lower.includes('ear')) return 'Subtle or bold. Make your statement.';
    return 'Curated custom masterworks.';
  };

  return (
    <>
      <section className="home-banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <span className="banner-badge">KNOTIX JEWELS</span>
          <h1 className="banner-title">COLLECTIONS</h1>
          <div className="title-underline"></div>
          <p className="banner-subtitle">
            Distinctive designs. Premium craftsmanship. Explore our curated collections.
          </p>
          <a href="#catalog-section" className="banner-btn">
            Explore Creations
          </a>
        </div>
      </section>

      <div className="catalog-container" id="catalog-section">
        {/* Category Selection Cards Grid */}
        <section className="collections-section">
          <div className="category-cards-grid">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-card-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                data-category={cat}
              >
                <span className="card-badge">
                  {cat === 'All' ? 'EXPLORE ALL' : `${cat.toUpperCase()}S`}
                </span>

                <div className="card-details">
                  <h3 className="card-title">
                    {cat === 'All' ? 'ALL CREATIONS' : `${cat.toUpperCase()} COLLECTION`}
                  </h3>
                  <p className="card-tagline">{getTagline(cat)}</p>
                  <span className="explore-link">
                    EXPLORE COLLECTION
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="arrow"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
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
        {errorMessage && (
          <div className="error-state" style={{ textAlign: 'center', margin: '40px 0' }}>
            <p className="error-msg" style={{ color: '#ef4444', marginBottom: 15 }}>{errorMessage}</p>
            <button
              onClick={() => fetchProducts()}
              className="btn btn-reset"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              🔄 Retry Loading Collections
            </button>
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
            ) : (
              <div className="empty-state">
                <span className="empty-icon">💍</span>
                <h3>No products found</h3>
                <p>
                  We couldn&apos;t find any pieces matching your current search or filter criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="btn btn-reset"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
