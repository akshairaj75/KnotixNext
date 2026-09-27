import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        productImages: {
          orderBy: { sortOrder: 'asc' },
        },
        productVariants: {
          where: { active: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const responseDtos = (products || []).map((p) => ({
      id: Number(p.id),
      name: p.name || 'Untitled Product',
      slug: p.slug || '',
      sku: p.sku || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      basePrice: p.basePrice !== null && p.basePrice !== undefined ? Number(p.basePrice) : 0,
      categoryId: p.categoryId !== null && p.categoryId !== undefined ? Number(p.categoryId) : 0,
      categoryName: p.category?.name || 'Jewelry',
      status: p.status || 'ACTIVE',
      featured: Boolean(p.featured),
      images: (p.productImages || []).map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl || '',
        altText: img.altText || 'image',
        sortOrder: img.sortOrder || 0,
        primary: Boolean(img.primaryImage),
        isPrimary: Boolean(img.primaryImage),
      })),
      variants: (p.productVariants || []).map((v) => ({
        id: Number(v.id),
        sku: v.sku || '',
        variantName: v.variantName || 'Default',
        price: v.price !== null && v.price !== undefined ? Number(v.price) : (p.basePrice !== null ? Number(p.basePrice) : 0),
        stockQuantity: v.stockQuantity || 0,
        defaultVariant: Boolean(v.defaultVariant),
        active: Boolean(v.active),
      })),
    }));

    return NextResponse.json(responseDtos);
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    const message = error instanceof Error ? error.message : 'Failed to fetch products';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
