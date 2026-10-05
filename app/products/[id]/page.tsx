'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { BUSINESS_CONTACT } from '@/lib/constants';
import RelatedProducts from '@/components/RelatedProducts';

const emptySubscribe = () => () => { };

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const productId = Number(id);

    async function loadProduct() {
      if (isNaN(productId)) {
        if (isMounted) {
          setErrorMessage('Invalid product ID');
          setIsLoading(false);
        }
        return;
      }

      try {
        const data = await apiService.getProductById(productId);
        if (!isMounted) return;
        if (data) {
          setProduct(data);
        } else {
          setErrorMessage('Product not found in our collections.');
        }
      } catch (err: unknown) {
        console.error('Error fetching product details', err);
        if (!isMounted) return;
        setErrorMessage('Failed to reveal product details.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const getWhatsAppOrderLink = (prod: Product): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = `${origin}/products/${prod.id}`;
    const priceFormatted = `₹${prod.price.toLocaleString('en-IN')}`;
    const isOutOfStock = (prod.stock ?? 0) <= 0;
    const message = isOutOfStock
      ? `Hello Knotix! I would like to inquire about the product: ${prod.name} (Price: ${priceFormatted}). As it is currently out of stock, please let me know if it can be made to order or restocked: ${currentUrl}`
      : `Hello Knotix! I would like to inquire about/order the product: ${prod.name} (Price: ${priceFormatted}). Here is the link: ${currentUrl}`;
    return `https://wa.me/${BUSINESS_CONTACT.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  const handleDelete = async (productId: number) => {
    if (confirm('Are you sure you want to delete this masterpiece from catalog?')) {
      try {
        await apiService.deleteProduct(productId);
        router.push('/');
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to delete masterpiece.';
        alert(msg);
      }
    }
  };

  return (
    <div className="details-page-container">
      {/* Loading State */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Revealing product details...</p>
        </div>
      )}

      {/* Error State */}
      {errorMessage && (
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
              <span>Piece Notice</span>
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

            <h2 className="luxury-state-title">Creation Not Available</h2>
            <p className="luxury-state-desc">{errorMessage}</p>

            <div className="luxury-state-actions">
              <Link href="/" className="btn-luxury-primary">
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
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </span>
                <span>Back to Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Content State */}
      {!isLoading && !errorMessage && product && (
        <>
          {/* Breadcrumb & Back Button */}
          <div className="navigation-bar">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="separator">/</span>
              <Link href={`/?category=${encodeURIComponent(product.category)}`}>
                {product.category}
              </Link>
              <span className="separator">/</span>
              <span className="current">{product.name}</span>
            </nav>
            <Link href="/" className="btn-back">
              <span className="arrow">&larr;</span> Back to Products
            </Link>
          </div>

          {/* Product Layout Grid */}
          <div className="product-detail-grid">
            {/* Media Panel */}
            <div className="media-panel">
              <div className="image-zoom-container">
                {product.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.image}
                    alt={product.name}
                    className="detail-image"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-gold)',
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M6 3h12l4 6-10 12L2 9z" />
                      <path d="M2 9h20" />
                      <path d="M10 3l-2 6 4 12 4-12-2-6" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Specs Panel */}
            <div className="specs-panel">
              <span className="category-tag">{product.category}</span>
              <h1 className="product-title-large">{product.name}</h1>

              {/* Rating and Stock row: Hidden except when out of stock */}
              {(product.stock ?? 0) <= 0 && (
                <div className="info-row">
                  <div className="stock-status out-of-stock">
                    <span className="indicator-dot"></span>
                    <span>Out of Stock</span>
                  </div>
                </div>
              )}

              <div className="price-tag">
                ₹{product.price.toLocaleString('en-IN')}
              </div>

              <div className="divider"></div>

              <div className="description-section">
                <h3>The Story</h3>
                <p className="description-text">{product.description}</p>
              </div>

              {/* Call to Action Mockups */}
              <div className="action-section">
                <a
                  href={getWhatsAppOrderLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp-order"
                >
                  <svg
                    className="whatsapp-icon"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                  >
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                  </svg>
                  <span>{(product.stock ?? 0) <= 0 ? 'Inquire via WhatsApp' : 'Order via WhatsApp'}</span>
                </a>
                <button
                  type="button"
                  className="btn btn-secondary-outline"
                  onClick={() => alert('Bespoke fitting request submitted. Our concierge will contact you.')}
                >
                  <span>Request Bespoke Fitting</span>
                </button>

                {mounted && isAdmin && (
                  <div
                    className="admin-atelier-panel"
                    style={{
                      marginTop: 20,
                      padding: '16px',
                      border: '1px dashed rgba(197, 168, 128, 0.4)',
                      background: 'rgba(197, 168, 128, 0.05)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 12,
                        fontSize: '0.68rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--color-gold)',
                        fontWeight: 600,
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        Admin Atelier Controls
                      </span>
                      <span style={{ color: 'var(--color-muted)', fontSize: '0.65rem' }}>Authorized Admin</span>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link
                        href={`/edit/${product.id}`}
                        className="btn btn-edit-gold"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                        <span>Edit Masterpiece</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-delete-red"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>Delete Masterpiece</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Premium Details Badges */}
              <div className="specs-badge-grid">
                <div className="spec-badge">
                  <span className="badge-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </span>
                  <span className="badge-text">Complimentary Insured Shipping</span>
                </div>
                <div className="spec-badge">
                  <span className="badge-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  <span className="badge-text">Authenticity Certificate Included</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="related-section-wrapper">
            <RelatedProducts
              category={product.category}
              currentProductId={product.id}
            />
          </div>
        </>
      )}
    </div>
  );
}
