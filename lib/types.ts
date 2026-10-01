export interface Product {
  id: number;
  name: string;
  category: string;
  categoryId?: number;
  sku?: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  stock: number;
  status?: string;
  shortDescription?: string;
}

export interface Category {
  id: number;
  parentId?: number | null;
  parentName?: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
  isActive: boolean;
  subCategories?: Category[];
}

export interface ProductResponseDto {
  id: number;
  name: string;
  slug: string;
  sku?: string;
  shortDescription?: string;
  description?: string;
  basePrice: number;
  categoryId: number;
  categoryName: string;
  status: string;
  featured: boolean;
  images: {
    id: number;
    imageUrl: string;
    altText?: string;
    sortOrder: number;
    primary: boolean;
    isPrimary?: boolean;
  }[];
  variants: {
    id: number;
    sku: string;
    variantName?: string;
    price: number;
    stockQuantity: number;
    defaultVariant: boolean;
    active: boolean;
  }[];
}

export interface CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
  parentId?: number;
  parentName?: string;
  subCategories?: CategoryResponseDto[];
}

export interface BusinessContact {
  brandName: string;
  legalEntity: string;
  owner: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    country: string;
    full: string;
  };
  phone: string;
  phoneRaw: string;
  email: string;
  whatsapp: string;
  whatsappLink: string;
  grievanceEmail: string;
  instagram: string;
  instagramHandle: string;
  supportHours: {
    days: string;
    timings: string;
  };
}
