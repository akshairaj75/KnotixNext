import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorizedAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function DELETE(
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

    // Decouple subcategories before deleting parent matching Spring Boot CategoryServiceImpl.deleteCategory
    await prisma.category.updateMany({
      where: { parentId: categoryId },
      data: { parentId: null },
    });

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error('Error deleting category:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete category';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
