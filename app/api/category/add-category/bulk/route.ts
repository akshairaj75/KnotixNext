import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

interface BulkCategoryItem {
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  parentId?: number | string;
  sortOrder?: number | string;
  isActive?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorizedAdmin(request)) {
      return NextResponse.json(
        { message: 'Access denied: Unauthorized access. Admin privileges required.' },
        { status: 401 }
      );
    }

    const items: BulkCategoryItem[] = await request.json();
    if (!Array.isArray(items)) {
      return NextResponse.json({ message: 'Payload must be an array' }, { status: 400 });
    }

    const results = [];

    for (const data of items) {
      const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const parentId = data.parentId ? BigInt(data.parentId) : null;

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
        include: { parent: true },
      });

      results.push({
        id: Number(category.id),
        name: category.name,
        slug: category.slug,
        description: category.description || undefined,
        imageUrl: category.imageUrl || undefined,
        sortOrder: category.sortOrder,
        isActive: category.isActive,
        parentId: category.parentId ? Number(category.parentId) : undefined,
        parentName: category.parent?.name,
      });
    }

    return NextResponse.json(results);
  } catch (error: unknown) {
    console.error('Error in bulk add categories:', error);
    const message = error instanceof Error ? error.message : 'Failed to add categories in bulk';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
