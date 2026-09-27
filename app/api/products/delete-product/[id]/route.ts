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
    const productId = BigInt(id);

    // Delete product (cascade will delete images & variants)
    await prisma.product.delete({
      where: { id: productId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete product';
    return NextResponse.json(
      { message },
      { status: 500 }
    );
  }
}
