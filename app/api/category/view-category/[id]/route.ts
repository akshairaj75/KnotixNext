import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const categoryId = BigInt(id);

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        parent: true,
        subCategories: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { message: `Category with ID ${id} not found.` },
        { status: 404 }
      );
    }

    const responseDto = {
      id: Number(category.id),
      name: category.name,
      slug: category.slug,
      description: category.description || undefined,
      imageUrl: category.imageUrl || undefined,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
      parentId: category.parentId ? Number(category.parentId) : undefined,
      parentName: category.parent ? category.parent.name : undefined,
      subCategories: category.subCategories.map((sub) => ({
        id: Number(sub.id),
        name: sub.name,
        slug: sub.slug,
        description: sub.description || undefined,
        imageUrl: sub.imageUrl || undefined,
        sortOrder: sub.sortOrder,
        isActive: sub.isActive,
        parentId: Number(category.id),
        parentName: category.name,
      })),
    };

    return NextResponse.json(responseDto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to view category';
    console.error('Error viewing category:', error);
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
