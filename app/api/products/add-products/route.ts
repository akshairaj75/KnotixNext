import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';
import { storeFile } from '@/lib/storage';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';
export const ProductStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  ARCHIVED: 'ARCHIVED',
} as const;

export const dynamic = 'force-dynamic';

interface ProductCreatePayload {
  name?: string;
  categoryId?: number | string;
  basePrice?: number | string;
  slug?: string;
  description?: string;
  stock?: number | string;
  sku?: string;
  status?: string;
  featured?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { message: 'Access denied: Unauthorized access. Admin privileges required.' },
        { status: 401 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let productData: ProductCreatePayload = {};
    let imageFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const productPart = formData.get('product');

      if (typeof productPart === 'string') {
        productData = JSON.parse(productPart) as ProductCreatePayload;
      } else if (productPart instanceof Blob) {
        const text = await productPart.text();
        productData = JSON.parse(text) as ProductCreatePayload;
      }

      const filePart = formData.get('image');
      if (filePart instanceof File && filePart.size > 0) {
        imageFile = filePart;
      }
    } else {
      productData = (await request.json()) as ProductCreatePayload;
    }

    if (!productData.name || !productData.categoryId || productData.basePrice === undefined) {
      return NextResponse.json(
        { message: 'Product name, category, and price are required.' },
        { status: 400 }
      );
    }

    const categoryId = BigInt(productData.categoryId);
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Selected category does not exist.' },
        { status: 400 }
      );
    }

    const slug = productData.slug
      ? productData.slug
      : productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const shortDescription =
      productData.description && productData.description.length > 100
        ? productData.description.substring(0, 97) + '...'
        : productData.description;

    const basePrice = Number(productData.basePrice);
    const stock = productData.stock !== undefined ? Number(productData.stock) : 10;
    const sku = productData.sku || `${slug}-default`;

    // Store image if provided
    let imageUrl = '';
    if (imageFile) {
      imageUrl = await storeFile(imageFile, 'products');
    }

    // Database transaction to create product, variant, and image
    const now = new Date();
    const result = await prisma.$transaction(async (tx) => {
      const newProduct = await tx.product.create({
        data: {
          categoryId,
          name: productData.name as string,
          slug,
          sku,
          shortDescription,
          description: productData.description || '',
          basePrice,
          status: (productData.status as string) || ProductStatus.ACTIVE,
          featured: Boolean(productData.featured),
          createdAt: now,
          updatedAt: now,
        },
      });

      // Default variant
      await tx.productVariant.create({
        data: {
          productId: newProduct.id,
          sku: sku,
          variantName: 'Default',
          price: basePrice,
          stockQuantity: stock,
          defaultVariant: true,
          active: true,
          createdAt: now,
          updatedAt: now,
        },
      });

      // Primary image
      if (imageUrl) {
        await tx.productImage.create({
          data: {
            productId: newProduct.id,
            imageUrl,
            altText: 'image',
            sortOrder: 0,
            primaryImage: true,
            createdAt: now,
          },
        });
      }

      return tx.product.findUnique({
        where: { id: newProduct.id },
        include: {
          category: true,
          productImages: true,
          productVariants: true,
        },
      });
    });

    if (!result) {
      throw new Error('Failed to create product');
    }

    const responseDto = {
      id: Number(result.id),
      name: result.name,
      slug: result.slug,
      sku: result.sku || '',
      shortDescription: result.shortDescription || '',
      description: result.description || '',
      basePrice: Number(result.basePrice),
      categoryId: Number(result.categoryId),
      categoryName: result.category.name,
      status: result.status,
      featured: result.featured,
      images: result.productImages.map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl,
        altText: img.altText || 'image',
        sortOrder: img.sortOrder,
        primary: img.primaryImage,
        isPrimary: img.primaryImage,
      })),
      variants: result.productVariants.map((v) => ({
        id: Number(v.id),
        sku: v.sku,
        variantName: v.variantName || 'Default',
        price: Number(v.price),
        stockQuantity: v.stockQuantity,
        defaultVariant: v.defaultVariant,
        active: v.active,
      })),
    };

    return NextResponse.json(responseDto, { status: 200 });
  } catch (error: unknown) {
    console.error('Error creating product:', error);
    const message = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
