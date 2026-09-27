'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { apiService } from '@/services/api';

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

export default function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    apiService
      .getProducts()
      .then((all) => {
        if (!mounted) return;
        const related = all.filter(
          (p) =>
            p.category.toLowerCase() === category.toLowerCase() &&
            p.id !== currentProductId
        );
        setProducts(related.slice(0, 4));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching related products', err);
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [category, currentProductId]);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 0' }}>
        <div className="spinner" style={{ width: 24, height: 24 }}></div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="related-products-section">
      <h2 className="section-title">Related Masterpieces</h2>
      <div className="related-list">
        {products.map((prod) => (
          <Link
            key={prod.id}
            href={`/products/${prod.id}`}
            className="related-card-link"
          >
            <div className="related-card">
              <div className="related-image-wrapper">
                {prod.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="related-image"
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
                    }}
                  >
                    💍
                  </div>
                )}
              </div>
              <div className="related-info">
                <div className="category-label">{prod.category}</div>
                <h3 className="related-name">{prod.name}</h3>
                <div className="related-price">
                  ${prod.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
