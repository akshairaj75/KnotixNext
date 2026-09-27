import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        subCategories: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    const responseDtos = categories.map((c) => ({
      id: Number(c.id),
      name: c.name,
      slug: c.slug,
      description: c.description || undefined,
      imageUrl: c.imageUrl || undefined,
      sortOrder: c.sortOrder,
      isActive: c.isActive,
      parentId: c.parentId ? Number(c.parentId) : undefined,
      parentName: c.parent ? c.parent.name : undefined,
      subCategories: c.subCategories.map((sub) => ({
        id: Number(sub.id),
        name: sub.name,
        slug: sub.slug,
        description: sub.description || undefined,
        imageUrl: sub.imageUrl || undefined,
        sortOrder: sub.sortOrder,
        isActive: sub.isActive,
        parentId: Number(c.id),
        parentName: c.name,
      })),
    }));

    return NextResponse.json(responseDtos);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories';
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
