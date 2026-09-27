'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '@/lib/types';
import { apiService } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

export default function CategoryRegisterPage() {
  const router = useRouter();
  const { isAdmin, isLoading: authLoading } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, authLoading, router]);

  const loadCategories = React.useCallback(async () => {
    try {
      const data = await apiService.getCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error('Error loading categories', err);
      setErrorMessage('Failed to load categories.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    apiService
      .getCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch((err: unknown) => {
        console.error('Error loading categories', err);
        if (isMounted) setErrorMessage('Failed to load categories.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const parentCategories = useMemo(() => {
    return categories.filter((c) => !c.parentId);
  }, [categories]);

  const resetForm = () => {
    setIsEditMode(false);
    setEditingCategoryId(null);
    setName('');
    setSlug('');
    setDescription('');
    setParentId('');
    setSortOrder('0');
    setIsActive(true);
    setErrors({});
  };

  const handleEdit = (cat: Category) => {
    setIsEditMode(true);
    setEditingCategoryId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setParentId(cat.parentId ? cat.parentId.toString() : '');
    setSortOrder((cat.sortOrder || 0).toString());
    setIsActive(cat.isActive !== undefined ? cat.isActive : true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this category? Subcategories will be unlinked.')) {
      setIsLoading(true);
      try {
        await apiService.deleteCategory(id);
        await loadCategories();
        if (isEditMode && editingCategoryId === id) {
          resetForm();
        }
      } catch (err: unknown) {
        console.error('Error deleting category', err);
        const msg = err instanceof Error ? err.message : 'Failed to delete category.';
        setErrorMessage(msg);
        setIsLoading(false);
      }
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Category name must be at least 2 characters.';
    }
    const orderNum = parseInt(sortOrder, 10);
    if (isNaN(orderNum) || orderNum < 0) {
      errs.sortOrder = 'Sort order cannot be negative.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrorMessage(null);

    const payload: Partial<Category> = {
      name: name.trim(),
      slug: slug.trim() || undefined,
      description: description.trim() || undefined,
      parentId: parentId ? Number(parentId) : undefined,
      sortOrder: parseInt(sortOrder, 10),
      isActive,
    };

    try {
      if (isEditMode && editingCategoryId !== null) {
        await apiService.updateCategory(editingCategoryId, payload);
      } else {
        await apiService.createCategory(payload);
      }

      setIsLoading(false);
      setSubmitSuccess(true);
      resetForm();
      await loadCategories();
      setTimeout(() => setSubmitSuccess(false), 2000);
    } catch (err: unknown) {
      console.error('Error saving category', err);
      const msg = err instanceof Error ? err.message : 'Failed to save category.';
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
    <div className="register-page-container" style={{ maxWidth: 1200 }}>
      {/* Success Notification */}
      {submitSuccess && (
        <div className="toast success-toast">
          <span className="toast-icon">✨</span>
          <div className="toast-details">
            <h4>
              {isEditMode ? 'Category Updated Successfully' : 'Category Registered Successfully'}
            </h4>
            <p>
              {isEditMode
                ? 'Your category has been updated.'
                : 'Your category has been added to the catalog.'}
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="toast error-toast">
          <span className="toast-icon">⚠️</span>
          <div className="toast-details">
            <h4>Error</h4>
            <p>{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="crud-layout">
        {/* Left Column: Form */}
        <div className="form-card">
          <div className="card-header">
            <h1 className="form-title">
              {isEditMode ? 'Edit Category' : 'Register New Category'}
            </h1>
            <p className="form-subtitle">
              Manage catalog category structure, hierarchy and organization.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Category Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Rings, Necklaces"
                />
                {errors.name && <span className="error-feedback">{errors.name}</span>}
              </div>

              {/* Slug */}
              <div className="form-group">
                <label htmlFor="slug">Slug (Optional)</label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g., rings (auto-generated if empty)"
                />
              </div>

              {/* Parent Category */}
              <div className="form-group">
                <label htmlFor="parentId">Parent Category (Optional)</label>
                <select
                  id="parentId"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">None (Make it a Main Category)</option>
                  {parentCategories.map((cat) => {
                    if (isEditMode && cat.id === editingCategoryId) return null;
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Sort Order */}
              <div className="form-group">
                <label htmlFor="sortOrder">Sort Order</label>
                <input
                  type="number"
                  id="sortOrder"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  placeholder="0"
                />
                {errors.sortOrder && (
                  <span className="error-feedback">{errors.sortOrder}</span>
                )}
              </div>

              {/* Description */}
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Enter category description..."
                />
              </div>

              {/* Is Active Checkbox */}
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label htmlFor="isActive" style={{ margin: 0, cursor: 'pointer' }}>
                  Is Active Category
                </label>
              </div>
            </div>

            {/* Action Panel */}
            <div className="action-panel">
              {isEditMode && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-cancel"
                  disabled={isLoading}
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="btn btn-submit"
                disabled={isLoading || submitSuccess}
              >
                {isLoading ? (
                  <span>{isEditMode ? 'Updating...' : 'Registering...'}</span>
                ) : (
                  <span>{isEditMode ? 'Update Category' : 'Register Category'}</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="list-card">
          <div className="card-header">
            <h2 className="form-title">Existing Categories</h2>
            <p className="form-subtitle">View and manage all registered categories.</p>
          </div>

          <div className="table-container">
            {categories.length === 0 ? (
              <div className="empty-state">
                <p>No categories registered yet.</p>
              </div>
            ) : (
              <>
                {/* Desktop View */}
                <div className="desktop-table-view">
                  <table className="category-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Parent</th>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((cat) => (
                        <tr key={cat.id}>
                          <td style={{ fontWeight: 600 }}>{cat.name}</td>
                          <td>
                            <code>{cat.slug}</code>
                          </td>
                          <td>
                            {cat.parentName ? (
                              <span className="badge badge-parent">{cat.parentName}</span>
                            ) : (
                              <span className="badge badge-main">Main Category</span>
                            )}
                          </td>
                          <td>{cat.sortOrder || 0}</td>
                          <td>
                            <span
                              className={
                                cat.isActive ? 'status-active' : 'status-inactive'
                              }
                            >
                              {cat.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="row-actions">
                              <button
                                onClick={() => handleEdit(cat)}
                                className="btn-icon"
                                title="Edit"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDelete(cat.id)}
                                className="btn-icon"
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="mobile-category-cards">
                  {categories.map((cat) => (
                    <div key={cat.id} className="category-mobile-card">
                      <div className="mobile-card-top">
                        <div>
                          <span className="mobile-cat-name">{cat.name}</span>
                          <code>{cat.slug}</code>
                        </div>
                        <div className="row-actions">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="btn-icon"
                            title="Edit"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="btn-icon"
                            title="Delete"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                      <div className="mobile-card-meta">
                        <div>
                          {cat.parentName ? (
                            <span className="badge badge-parent">{cat.parentName}</span>
                          ) : (
                            <span className="badge badge-main">Main</span>
                          )}
                        </div>
                        <div>
                          <span
                            className={
                              cat.isActive ? 'status-active' : 'status-inactive'
                            }
                          >
                            {cat.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div>Order: #{cat.sortOrder || 0}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
