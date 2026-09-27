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

    const responseDtos = products.map((p) => ({
      id: Number(p.id),
      name: p.name,
      slug: p.slug,
      sku: p.sku || '',
      shortDescription: p.shortDescription || '',
      description: p.description || '',
      basePrice: Number(p.basePrice),
      categoryId: Number(p.categoryId),
      categoryName: p.category.name,
      status: p.status,
      featured: p.featured,
      images: p.productImages.map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl,
        altText: img.altText || 'image',
        sortOrder: img.sortOrder,
        primary: img.primaryImage,
        isPrimary: img.primaryImage,
      })),
      variants: p.productVariants.map((v) => ({
        id: Number(v.id),
        sku: v.sku,
        variantName: v.variantName || 'Default',
        price: Number(v.price),
        stockQuantity: v.stockQuantity,
        defaultVariant: v.defaultVariant,
        active: v.active,
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
