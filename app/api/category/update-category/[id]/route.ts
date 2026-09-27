import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';

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
    const categoryId = BigInt(id);

    const existing = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existing) {
      return NextResponse.json(
        { message: `Category with ID ${id} not found.` },
        { status: 404 }
      );
    }

    const data = await request.json();

    let parentId: bigint | null = null;
    if (data.parentId) {
      const pId = BigInt(data.parentId);
      if (pId === categoryId) {
        return NextResponse.json(
          { message: 'A category cannot be its own parent.' },
          { status: 400 }
        );
      }
      const parent = await prisma.category.findUnique({
        where: { id: pId },
      });
      if (!parent) {
        return NextResponse.json(
          { message: 'Parent category not found.' },
          { status: 400 }
        );
      }
      parentId = pId;
    }

    const slug =
      data.slug && data.slug.trim().length > 0
        ? data.slug.trim()
        : data.name
        ? data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        : existing.slug;

    const updated = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: data.name !== undefined ? data.name.trim() : existing.name,
        slug,
        description: data.description !== undefined ? data.description : existing.description,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : existing.imageUrl,
        parentId,
        sortOrder: data.sortOrder !== undefined ? Number(data.sortOrder) : existing.sortOrder,
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : existing.isActive,
      },
      include: {
        parent: true,
      },
    });

    const responseDto = {
      id: Number(updated.id),
      name: updated.name,
      slug: updated.slug,
      description: updated.description || undefined,
      imageUrl: updated.imageUrl || undefined,
      sortOrder: updated.sortOrder,
      isActive: updated.isActive,
      parentId: updated.parentId ? Number(updated.parentId) : undefined,
      parentName: updated.parent ? updated.parent.name : undefined,
    };

    return NextResponse.json(responseDto);
  } catch (error: unknown) {
    console.error('Error updating category:', error);
    const message = error instanceof Error ? error.message : 'Failed to update category';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
