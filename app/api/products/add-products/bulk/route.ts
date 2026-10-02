import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';
export const ProductStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  ARCHIVED: 'ARCHIVED',
} as const;

export const dynamic = 'force-dynamic';

interface BulkProductItem {
  categoryId: number | string;
  name: string;
  slug?: string;
  sku?: string;
  basePrice: number | string;
  stock?: number | string;
  description?: string;
  status?: string;
  featured?: boolean;
  imageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { message: 'Access denied: Unauthorized access. Admin privileges required.' },
        { status: 401 }
      );
    }

    const items: BulkProductItem[] = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ message: 'Payload must be an array of products' }, { status: 400 });
    }

    const responses = [];

    for (const item of items) {
      const categoryId = BigInt(item.categoryId);
      const slug = item.slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const basePrice = Number(item.basePrice);
      const stock = item.stock !== undefined ? Number(item.stock) : 10;
      const sku = item.sku || `${slug}-default`;

      const now = new Date();
      const created = await prisma.$transaction(async (tx) => {
        const prod = await tx.product.create({
          data: {
            categoryId,
            name: item.name,
            slug,
            sku,
            shortDescription: item.description?.substring(0, 97),
            description: item.description || '',
            basePrice,
            status: (item.status as string) || ProductStatus.ACTIVE,
            featured: Boolean(item.featured),
            createdAt: now,
            updatedAt: now,
          },
        });

        await tx.productVariant.create({
          data: {
            productId: prod.id,
            sku,
            variantName: 'Default',
            price: basePrice,
            stockQuantity: stock,
            defaultVariant: true,
            active: true,
            createdAt: now,
            updatedAt: now,
          },
        });

        if (item.imageUrl) {
          await tx.productImage.create({
            data: {
              productId: prod.id,
              imageUrl: item.imageUrl,
              altText: 'image',
              sortOrder: 0,
              primaryImage: true,
              createdAt: now,
            },
          });
        }

        return tx.product.findUnique({
          where: { id: prod.id },
          include: { category: true, productImages: true, productVariants: true },
        });
      });

      if (created) {
        responses.push({
          id: Number(created.id),
          name: created.name,
          slug: created.slug,
          sku: created.sku || '',
          basePrice: Number(created.basePrice),
          categoryId: Number(created.categoryId),
          categoryName: created.category.name,
          status: created.status,
          featured: created.featured,
          images: created.productImages.map((img) => ({
            id: Number(img.id),
            imageUrl: img.imageUrl,
            primary: img.primaryImage,
            sortOrder: img.sortOrder,
          })),
          variants: created.productVariants.map((v) => ({
            id: Number(v.id),
            sku: v.sku,
            price: Number(v.price),
            stockQuantity: v.stockQuantity,
            defaultVariant: v.defaultVariant,
            active: v.active,
          })),
        });
      }
    }

    return NextResponse.json(responses);
  } catch (error: unknown) {
    console.error('Error in bulk add products:', error);
    const message = error instanceof Error ? error.message : 'Failed to add products in bulk';
    return NextResponse.json({ message }, { status: 500 });
  }
}
