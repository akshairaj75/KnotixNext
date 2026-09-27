import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { message: 'Access denied: Unauthorized access. Admin privileges required.' },
        { status: 401 }
      );
    }

    const data = await request.json();

    if (!data.name || data.name.trim().length === 0) {
      return NextResponse.json(
        { message: 'Category name is required.' },
        { status: 400 }
      );
    }

    const slug = data.slug && data.slug.trim().length > 0
      ? data.slug.trim()
      : data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    let parentId: bigint | null = null;
    let parentName: string | undefined = undefined;

    if (data.parentId) {
      parentId = BigInt(data.parentId);
      const parent = await prisma.category.findUnique({
        where: { id: parentId },
      });
      if (!parent) {
        return NextResponse.json(
          { message: 'Parent category not found.' },
          { status: 400 }
        );
      }
      parentName = parent.name;
    }

    const category = await prisma.category.create({
      data: {
        name: data.name.trim(),
        slug,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        parentId,
        sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : 0,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
      include: {
        parent: true,
      },
    });

    const responseDto = {
      id: Number(category.id),
      name: category.name,
      slug: category.slug,
      description: category.description || undefined,
      imageUrl: category.imageUrl || undefined,
      sortOrder: category.sortOrder,
      isActive: category.isActive,
      parentId: category.parentId ? Number(category.parentId) : undefined,
      parentName: category.parent ? category.parent.name : parentName,
    };

    return NextResponse.json(responseDto, { status: 200 });
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    const message = error instanceof Error ? error.message : 'Failed to create category';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
