'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { BUSINESS_CONTACT } from '@/lib/constants';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getWhatsAppOrderLink = (): string => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const currentUrl = `${origin}/products/${product.id}`;
    const priceFormatted = `$${product.price.toFixed(2)}`;
    const message = `Hello Knotix! I would like to inquire about/order the product: ${product.name} (Price: ${priceFormatted}). Here is the link: ${currentUrl}`;
    return `https://wa.me/${BUSINESS_CONTACT.phoneRaw.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              color: 'var(--color-gold)',
            }}
          >
            💍
          </div>
        )}
        <span className="category-badge">{product.category}</span>
        {product.stock <= 3 ? (
          <span className="stock-badge urgent">Only {product.stock} left</span>
        ) : (
          <span className="stock-badge">In Stock</span>
        )}
      </div>

      <div className="card-content">
        <div className="card-header">
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>
          <div className="product-rating">
            <span className="star">★</span>
            <span className="rating-val">{(product.rating || 4.5).toFixed(1)}</span>
          </div>
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="card-footer">
          <div className="product-price">
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="card-actions">
            <Link
              href={`/products/${product.id}`}
              className="btn btn-details"
              title="View Details"
            >
              <span>Details</span>
              <span className="arrow">&rarr;</span>
            </Link>
            <a
              href={getWhatsAppOrderLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              title="Order on WhatsApp"
            >
              <svg
                className="whatsapp-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentColor"
              >
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
