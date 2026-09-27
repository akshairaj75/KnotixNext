'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Category, Product } from '@/lib/types';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface ProductFormProps {
  initialProductId?: number;
}

export default function ProductForm({ initialProductId }: ProductFormProps) {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const isEditMode = !!initialProductId;

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [mainCategoryId, setMainCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('0');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, authLoading, router]);

  // Load categories
  useEffect(() => {
    apiService
      .getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((err: unknown) => {
        console.error('Error loading categories', err);
        setErrorMessage('Failed to load categories.');
      });
  }, []);

  // Load product if edit mode
  useEffect(() => {
    if (initialProductId && categories.length > 0) {
      apiService
        .getProductById(initialProductId)
        .then((prod: Product | null) => {
          setIsLoading(false);
          if (prod) {
            setName(prod.name);
            setPrice(prod.price.toString());
            setStock(prod.stock.toString());
            setSku(prod.sku || '');
            setDescription(prod.description);
            setCurrentImageUrl(prod.image);

            // Determine main category and subcategory
            const cat = categories.find((c) => c.id === prod.categoryId);
            if (cat) {
              if (cat.parentId) {
                setMainCategoryId(cat.parentId.toString());
                setSubCategoryId(cat.id.toString());
              } else {
                setMainCategoryId(cat.id.toString());
                setSubCategoryId(cat.id.toString());
              }
            } else if (prod.categoryId) {
              setMainCategoryId(prod.categoryId.toString());
              setSubCategoryId(prod.categoryId.toString());
            }
          } else {
            setErrorMessage('Product not found for editing.');
          }
        })
        .catch((err: unknown) => {
          console.error('Error loading product for edit', err);
          setErrorMessage('Failed to load product details.');
          setIsLoading(false);
        });
    }
  }, [initialProductId, categories]);

  const mainCategories = useMemo(() => {
    return categories.filter((c) => !c.parentId);
  }, [categories]);

  const filteredSubCategories = useMemo(() => {
    if (!mainCategoryId) return [];
    return categories.filter((c) => c.parentId === Number(mainCategoryId));
  }, [categories, mainCategoryId]);

  const handleMainCategoryChange = (val: string) => {
    setMainCategoryId(val);
    const subs = categories.filter((c) => c.parentId === Number(val));
    if (subs.length > 0) {
      setSubCategoryId('');
    } else {
      setSubCategoryId(val);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      errs.name = 'Product name must be at least 3 characters.';
    }

    if (!mainCategoryId) {
      errs.mainCategory = 'Main category is required.';
    }

    if (filteredSubCategories.length > 0 && !subCategoryId) {
      errs.category = 'Subcategory selection is required.';
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      errs.price = 'Price must be greater than $0.00.';
    }

    const stockNum = parseInt(stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      errs.stock = 'Stock count cannot be negative.';
    }

    if (!sku.trim()) {
      errs.sku = 'SKU is required.';
    }

    if (!description.trim() || description.trim().length < 10) {
      errs.description = 'Description must be at least 10 characters long.';
    }

    if (!isEditMode && !selectedFile) {
      errs.image = 'Product image is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage(null);

    const targetCategoryId = subCategoryId ? Number(subCategoryId) : Number(mainCategoryId);

    const payload = {
      name: name.trim(),
      categoryId: targetCategoryId,
      sku: sku.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      description: description.trim(),
    };

    try {
      if (isEditMode && initialProductId) {
        await apiService.updateProduct(initialProductId, payload, selectedFile || undefined);
        setIsLoading(false);
        setSubmitSuccess(true);
        setTimeout(() => {
          router.push(`/products/${initialProductId}`);
        }, 1500);
      } else {
        await apiService.createProduct(payload, selectedFile || undefined);
        setIsLoading(false);
        setSubmitSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch (err: unknown) {
      console.error('Submission error', err);
      const msg = err instanceof Error ? err.message : 'Failed to submit product.';
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="register-page-container" style={{ textAlign: 'center' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="register-page-container">
      {/* Success Notification */}
      {submitSuccess && (
        <div className="toast success-toast">
          <span className="toast-icon">✨</span>
          <div className="toast-details">
            <h4>
              {isEditMode ? 'Product Updated Successfully' : 'Product Registered Successfully'}
            </h4>
            <p>
              {isEditMode
                ? 'Your masterpiece has been updated. Redirecting to product page...'
                : 'Your masterpiece has been added to the catalog. Redirecting to home...'}
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="toast error-toast">
          <span className="toast-icon">⚠️</span>
          <div className="toast-details">
            <h4>{isEditMode ? 'Error Updating Product' : 'Error Registering Product'}</h4>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="form-card">
        <div className="card-header">
          <h1 className="form-title">
            {isEditMode ? 'Edit Masterpiece' : 'Register New Masterpiece'}
          </h1>
          <p className="form-subtitle">
            {isEditMode
              ? 'Modify the fields below to update this luxury jewelry item in the catalog.'
              : 'Fill in the fields below to add a luxury jewelry item to Knotix Catalog.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-grid">
            {/* Product Name */}
            <div className="form-group full-width">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Aurelia Diamond Ring"
              />
              {errors.name && <span className="error-feedback">{errors.name}</span>}
            </div>

            {/* Main Category */}
            <div className="form-group">
              <label htmlFor="mainCategory">Main Category</label>
              <select
                id="mainCategory"
                value={mainCategoryId}
                onChange={(e) => handleMainCategoryChange(e.target.value)}
              >
                <option value="" disabled>Select main category...</option>
                {mainCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.mainCategory && (
                <span className="error-feedback">{errors.mainCategory}</span>
              )}
            </div>

            {/* Subcategory */}
            <div className="form-group">
              <label htmlFor="category">Subcategory</label>
              <select
                id="category"
                value={subCategoryId}
                onChange={(e) => setSubCategoryId(e.target.value)}
                disabled={filteredSubCategories.length === 0}
              >
                <option value="" disabled>
                  {filteredSubCategories.length === 0
                    ? 'No subcategories available'
                    : 'Select subcategory...'}
                </option>
                {filteredSubCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="error-feedback">{errors.category}</span>
              )}
            </div>

            {/* Price */}
            <div className="form-group">
              <label htmlFor="price">Price (USD)</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                step="0.01"
              />
              {errors.price && <span className="error-feedback">{errors.price}</span>}
            </div>

            {/* Stock Quantity */}
            <div className="form-group">
              <label htmlFor="stock">Stock Quantity</label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="0"
              />
              {errors.stock && <span className="error-feedback">{errors.stock}</span>}
            </div>

            {/* SKU */}
            <div className="form-group">
              <label htmlFor="sku">SKU</label>
              <input
                type="text"
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="e.g., KNT-RG-001"
              />
              {errors.sku && <span className="error-feedback">{errors.sku}</span>}
            </div>

            {/* Product Image File */}
            <div className="form-group">
              <label htmlFor="image">Product Image</label>
              <input
                type="file"
                id="image"
                onChange={handleFileChange}
                accept="image/*"
              />
              {errors.image && <span className="error-feedback">{errors.image}</span>}

              {imagePreview ? (
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: '0.85rem', marginBottom: 5, color: 'var(--color-muted)' }}>
                    Preview:
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      maxHeight: 120,
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  />
                </div>
              ) : isEditMode && currentImageUrl ? (
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: '0.85rem', marginBottom: 5, color: 'var(--color-muted)' }}>
                    Current Image:
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentImageUrl}
                    alt="Current Image"
                    style={{
                      maxHeight: 120,
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  />
                </div>
              ) : null}
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label htmlFor="description">Full Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Describe the craftsmanship, materials, history, and sizing..."
              />
              {errors.description && (
                <span className="error-feedback">{errors.description}</span>
              )}
            </div>
          </div>

          {/* Action Panel */}
          <div className="action-panel">
            <Link href="/" className="btn btn-cancel">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isLoading || submitSuccess}
            >
              {isLoading ? (
                <span>{isEditMode ? 'Updating...' : 'Registering...'}</span>
              ) : (
                <span>{isEditMode ? 'Update Masterpiece' : 'Register Masterpiece'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
