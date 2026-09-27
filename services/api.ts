import { Product, Category, ProductResponseDto } from '@/lib/types';

function getAuthHeaders(): HeadersInit {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
}

function mapToProduct(dto: ProductResponseDto): Product {
  let imageUrl = '';
  if (dto.images && dto.images.length > 0) {
    const primary = dto.images.find((img) => img.primary || img.isPrimary);
    imageUrl = primary ? primary.imageUrl : dto.images[0].imageUrl;
  }

  if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http') && !imageUrl.startsWith('data:')) {
    imageUrl = `/${imageUrl}`;
  }

  return {
    id: dto.id,
    name: dto.name,
    category: dto.categoryName || 'Unknown',
    categoryId: dto.categoryId,
    sku: dto.sku || '',
    price: dto.basePrice !== undefined ? Number(dto.basePrice) : 0,
    description: dto.description || dto.shortDescription || '',
    image: imageUrl,
    rating: 4.5,
    stock:
      dto.variants && dto.variants.length > 0
        ? dto.variants.reduce((sum: number, v) => sum + (v.stockQuantity || 0), 0)
        : 0,
  };
}

export const apiService = {
  // Products
  async getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products/get-products', {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const dtos: ProductResponseDto[] = await res.json();
    return dtos.map(mapToProduct);
  },

  async getProductById(id: number): Promise<Product | null> {
    const res = await fetch(`/api/products/view-product/${id}`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    const dto: ProductResponseDto = await res.json();
    return mapToProduct(dto);
  },

  async createProduct(productData: {
    name: string;
    category?: number;
    categoryId?: number;
    sku?: string;
    price?: number;
    basePrice?: number;
    description?: string;
    stock?: number;
  }, imageFile?: File): Promise<Product> {
    const formData = new FormData();
    const payload = {
      name: productData.name,
      categoryId: Number(productData.category || productData.categoryId),
      sku: productData.sku,
      basePrice: Number(productData.price || productData.basePrice),
      description: productData.description,
      stock: Number(productData.stock || 0),
      status: 'ACTIVE',
    };

    formData.append('product', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await fetch('/api/products/add-products', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create product');
    }

    const dto: ProductResponseDto = await res.json();
    return mapToProduct(dto);
  },

  async updateProduct(
    productId: number,
    productData: {
      name: string;
      category?: number;
      categoryId?: number;
      sku?: string;
      price?: number;
      basePrice?: number;
      description?: string;
      stock?: number;
    },
    imageFile?: File
  ): Promise<Product> {
    const formData = new FormData();
    const payload = {
      name: productData.name,
      categoryId: Number(productData.category || productData.categoryId),
      sku: productData.sku,
      basePrice: Number(productData.price || productData.basePrice),
      description: productData.description,
      stock: Number(productData.stock || 0),
      status: 'ACTIVE',
    };

    formData.append('product', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const res = await fetch(`/api/products/update-product/${productId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update product');
    }

    const dto: ProductResponseDto = await res.json();
    return mapToProduct(dto);
  },

  async deleteProduct(id: number): Promise<void> {
    const res = await fetch(`/api/products/delete-product/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete product');
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch('/api/category/get-categories', {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async getCategoryById(id: number): Promise<Category> {
    const res = await fetch(`/api/category/view-category/${id}`, {
      headers: getAuthHeaders(),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch category');
    return res.json();
  },

  async createCategory(category: Partial<Category>): Promise<Category> {
    const res = await fetch('/api/category/add-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(category),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to create category');
    }
    return res.json();
  },

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    const res = await fetch(`/api/category/update-category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(category),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to update category');
    }
    return res.json();
  },

  async deleteCategory(id: number): Promise<void> {
    const res = await fetch(`/api/category/delete-category/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete category');
    }
  },
};
