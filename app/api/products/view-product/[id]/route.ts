import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = BigInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        productImages: {
          orderBy: { sortOrder: 'asc' },
        },
        productVariants: {
          where: { active: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: `Product with ID ${id} not found` },
        { status: 404 }
      );
    }

    const responseDto = {
      id: Number(product.id),
      name: product.name || 'Untitled Product',
      slug: product.slug || '',
      sku: product.sku || '',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      basePrice: product.basePrice !== null && product.basePrice !== undefined ? Number(product.basePrice) : 0,
      categoryId: product.categoryId !== null && product.categoryId !== undefined ? Number(product.categoryId) : 0,
      categoryName: product.category?.name || 'Jewelry',
      status: product.status || 'ACTIVE',
      featured: Boolean(product.featured),
      images: (product.productImages || []).map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl || '',
        altText: img.altText || 'image',
        sortOrder: img.sortOrder || 0,
        primary: Boolean(img.primaryImage),
        isPrimary: Boolean(img.primaryImage),
      })),
      variants: (product.productVariants || []).map((v) => ({
        id: Number(v.id),
        sku: v.sku || '',
        variantName: v.variantName || 'Default',
        price: v.price !== null && v.price !== undefined ? Number(v.price) : (product.basePrice !== null ? Number(product.basePrice) : 0),
        stockQuantity: v.stockQuantity || 0,
        defaultVariant: Boolean(v.defaultVariant),
        active: Boolean(v.active),
      })),
    };

    return NextResponse.json(responseDto);
  } catch (error: unknown) {
    console.error('Error viewing product:', error);
    const message = error instanceof Error ? error.message : 'Failed to view product';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
