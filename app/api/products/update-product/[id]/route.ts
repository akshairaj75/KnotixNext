import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';
import { storeFile } from '@/lib/storage';
import { ProductStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { message: 'Access denied: Unauthorized access. Admin privileges required.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const productId = BigInt(id);

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        productImages: true,
        productVariants: true,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: `Product with ID ${id} not found.` },
        { status: 404 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let productData: Record<string, unknown> = {};
    let imageFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const productPart = formData.get('product');

      if (typeof productPart === 'string') {
        productData = JSON.parse(productPart);
      } else if (productPart instanceof Blob) {
        const text = await productPart.text();
        productData = JSON.parse(text);
      }

      const filePart = formData.get('image');
      if (filePart instanceof File && filePart.size > 0) {
        imageFile = filePart;
      }
    } else {
      productData = await request.json();
    }

    const categoryId = productData.categoryId
      ? BigInt(productData.categoryId as string | number)
      : existingProduct.categoryId;

    const slug = productData.slug
      ? (productData.slug as string)
      : productData.name
      ? (productData.name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : existingProduct.slug;

    const rawDesc = productData.description as string | undefined;
    const shortDescription =
      rawDesc && rawDesc.length > 100
        ? rawDesc.substring(0, 97) + '...'
        : rawDesc !== undefined
        ? rawDesc
        : existingProduct.shortDescription;

    const basePrice =
      productData.basePrice !== undefined
        ? Number(productData.basePrice)
        : Number(existingProduct.basePrice);

    const stock = productData.stock !== undefined ? Number(productData.stock) : undefined;
    const sku = (productData.sku as string) || existingProduct.sku;

    // Handle Image upload
    let newImageUrl: string | null = null;
    if (imageFile) {
      newImageUrl = await storeFile(imageFile, 'products');
    }

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update product
      await tx.product.update({
        where: { id: productId },
        data: {
          categoryId,
          name: (productData.name as string) || existingProduct.name,
          slug,
          sku,
          shortDescription,
          description:
            rawDesc !== undefined
              ? rawDesc
              : existingProduct.description,
          basePrice,
          status: (productData.status as ProductStatus) || existingProduct.status,
          featured:
            productData.featured !== undefined
              ? Boolean(productData.featured)
              : existingProduct.featured,
        },
      });

      // 2. Update or create default variant
      const defaultVariant = await tx.productVariant.findFirst({
        where: { productId, defaultVariant: true },
      });

      if (defaultVariant) {
        await tx.productVariant.update({
          where: { id: defaultVariant.id },
          data: {
            sku: sku || defaultVariant.sku,
            price: basePrice,
            stockQuantity: stock !== undefined ? stock : defaultVariant.stockQuantity,
          },
        });
      } else {
        await tx.productVariant.create({
          data: {
            productId,
            sku: sku || `${slug}-default`,
            variantName: 'Default',
            price: basePrice,
            stockQuantity: stock !== undefined ? stock : 10,
            defaultVariant: true,
            active: true,
          },
        });
      }

      // 3. Update primary image if new file was uploaded
      if (newImageUrl) {
        const primaryImage = await tx.productImage.findFirst({
          where: { productId, primaryImage: true },
        });

        if (primaryImage) {
          await tx.productImage.update({
            where: { id: primaryImage.id },
            data: { imageUrl: newImageUrl },
          });
        } else {
          await tx.productImage.create({
            data: {
              productId,
              imageUrl: newImageUrl,
              altText: 'image',
              sortOrder: 0,
              primaryImage: true,
            },
          });
        }
      }

      return tx.product.findUnique({
        where: { id: productId },
        include: {
          category: true,
          productImages: true,
          productVariants: true,
        },
      });
    });

    if (!updated) {
      throw new Error('Failed to update product');
    }

    const responseDto = {
      id: Number(updated.id),
      name: updated.name,
      slug: updated.slug,
      sku: updated.sku || '',
      shortDescription: updated.shortDescription || '',
      description: updated.description || '',
      basePrice: Number(updated.basePrice),
      categoryId: Number(updated.categoryId),
      categoryName: updated.category.name,
      status: updated.status,
      featured: updated.featured,
      images: updated.productImages.map((img) => ({
        id: Number(img.id),
        imageUrl: img.imageUrl,
        altText: img.altText || 'image',
        sortOrder: img.sortOrder,
        primary: img.primaryImage,
        isPrimary: img.primaryImage,
      })),
      variants: updated.productVariants.map((v) => ({
        id: Number(v.id),
        sku: v.sku,
        variantName: v.variantName || 'Default',
        price: Number(v.price),
        stockQuantity: v.stockQuantity,
        defaultVariant: v.defaultVariant,
        active: v.active,
      })),
    };

    return NextResponse.json(responseDto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to update product';
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
